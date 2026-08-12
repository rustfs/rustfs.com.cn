import type { Metadata } from "next";

import { seoMetadata } from "@/lib/seo";
import BlogIndex from "./blog-index";

export const metadata: Metadata = seoMetadata({
  path: "/blog/",
  title: "RustFS 博客 | 对象存储工程文章",
  description:
    "RustFS 团队围绕 S3 兼容对象存储、AI 基础设施与云原生部署发布的工程文章、产品动态和实践指南。",
  openGraph: {
    title: "RustFS 博客",
    description: "关于 RustFS 对象存储的工程文章、产品动态与实践指南。",
  },
});

export default function BlogPage() {
  return <BlogIndex />;
}
