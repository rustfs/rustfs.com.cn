import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import BlogIndex from "./blog-index";

export const metadata: Metadata = {
  title: "RustFS 博客 | 对象存储工程文章",
  description:
    "RustFS 团队围绕 S3 兼容对象存储、AI 基础设施与云原生部署发布的工程文章、产品动态和实践指南。",
  alternates: { canonical: `${SITE_CONFIG.primaryDomain}/blog/` },
  openGraph: {
    title: "RustFS 博客",
    description: "关于 RustFS 对象存储的工程文章、产品动态与实践指南。",
    type: "website",
    url: `${SITE_CONFIG.primaryDomain}/blog/`,
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}
