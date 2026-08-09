import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import BlogIndex from "../blog-index";

export const metadata: Metadata = {
  title: "RustFS 集成 | RustFS 博客",
  description: "将 RustFS 连接到云原生工具与应用的集成指南和实践记录。",
  alternates: {
    canonical: `${SITE_CONFIG.primaryDomain}/blog/integration/`,
  },
};

export default function IntegrationBlogPage() {
  return <BlogIndex requestedTag="Integration" />;
}
