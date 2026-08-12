import type { Metadata } from "next";

import { seoMetadata } from "@/lib/seo";
import BlogIndex from "../blog-index";

export const metadata: Metadata = seoMetadata({
  path: "/blog/integration/",
  title: "RustFS 集成 | RustFS 博客",
  description: "将 RustFS 连接到云原生工具与应用的集成指南和实践记录。",
});

export default function IntegrationBlogPage() {
  return <BlogIndex requestedTag="Integration" />;
}
