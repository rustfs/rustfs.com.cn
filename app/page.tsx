import GetStartedToday from "@/components/business/get-started-today";
import HomeBlog from "@/components/business/home-blog";
import HomeContactCard from "@/components/business/home-contact-card";
import HomeDifferents from "@/components/business/home-differents";
import HomeFeatures from "@/components/business/home-features";
import HomeHero from "@/components/business/home-hero";
import HomeMultiClouds from "@/components/business/home-multi-clouds";
import HomeStats from "@/components/business/home-stats";
import SoftwareLogos from "@/components/business/software-logos";
import { getDockerPulls } from "@/lib/docker";
import { getGitHubMetrics } from "@/lib/github";
import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  path: "/",
  title: "RustFS | 面向 AI 与云原生的高性能 S3 对象存储",
  description: 'RustFS 是使用 Rust 构建、采用 Apache 2.0 许可证的开源分布式对象存储系统，为 AI 工作负载提供可直接替代 MinIO 和 Amazon S3 的高性能方案。',
  keywords: 'RustFS, 对象存储, 分布式存储, 开源, Rust, Amazon S3, MinIO 替代方案, MinIO 迁移, Apache 2.0, 云原生存储, AI 基础设施',
  openGraph: {
    title: "RustFS | 面向 AI 与云原生的高性能 S3 对象存储",
    description: 'RustFS 是使用 Rust 构建、采用 Apache 2.0 许可证的开源分布式对象存储系统，为 AI 工作负载提供高性能 S3 兼容存储。',
  },
  twitter: {
    title: "RustFS | 面向 AI 与云原生的高性能 S3 对象存储",
    description: 'RustFS 是使用 Rust 构建、采用 Apache 2.0 许可证的开源分布式对象存储系统，为 AI 工作负载提供高性能 S3 兼容存储。',
  },
});

export default async function HomePage() {
  const [dockerPulls, metrics] = await Promise.all([
    getDockerPulls(),
    getGitHubMetrics(),
  ]);

  return (
    <main className="flex-1 relative">
      <div className="relative z-10">
        <HomeHero dockerPulls={dockerPulls} metrics={metrics} />
        <SoftwareLogos />
        <HomeStats />
        <HomeFeatures />
        <HomeDifferents />
        <HomeMultiClouds />
        {/* <HomeReviews /> */}
        <GetStartedToday />
        <HomeBlog />
        <HomeContactCard />
      </div>
    </main>
  );
}
