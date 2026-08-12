"use client";

import { useEffect } from "react";

export function AutoRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return null;
}
