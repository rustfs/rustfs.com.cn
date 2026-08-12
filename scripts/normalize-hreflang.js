#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "out";

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name === "index.html") {
      const html = fs.readFileSync(fullPath, "utf8");

      if (html.includes("hrefLang=")) {
        fs.writeFileSync(fullPath, html.replace(/hrefLang=/g, "hreflang="), "utf8");
        console.log(`Normalized ${fullPath}`);
      }
    }
  }
}

walk(OUT_DIR);
console.log("✅ hreflang attributes normalized to lowercase");
