import GetStartedToday from "@/components/business/get-started-today";
import HomeDifferents from "@/components/business/home-differents";
import HomeFeatures from "@/components/business/home-features";
import HomeHero from "@/components/business/home-hero";
import HomeMultiClouds from "@/components/business/home-multi-clouds";
import HomeStats from "@/components/business/home-stats";
import SoftwareLogos from "@/components/business/software-logos";
import Subscribe from "@/components/business/subscribe";
import { getDockerPulls } from "@/lib/docker";
import { getGitHubMetrics } from "@/lib/github";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RustFS | MinIO 国产化替代方案",
  description: "RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。",
  keywords: "RustFS, 分布式存储, 云存储, S3 兼容, 高性能, 开源, MinIO 替代方案",
  authors: [{ name: "RustFS Team" }],
  openGraph: {
    title: "RustFS | MinIO 国产化替代方案",
    description: "RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。",
    type: "website",
    locale: 'zh_CN',
  },
  twitter: {
    card: "summary_large_image",
    title: "RustFS | MinIO 国产化替代方案",
    description: "RustFS 用热门安全的 Rust 语言开发，兼容 S3 协议。适用于 AI/ML 及海量数据存储、大数据、互联网、工业和保密存储等全部场景。近乎免费使用。遵循 Apache 2 协议，支持国产保密设备和系统。",
  },
};

export default async function HomePage() {
  const [dockerPulls, metrics] = await Promise.all([
    getDockerPulls(),
    getGitHubMetrics(),
  ]);

  console.log('Docker Pulls:', dockerPulls);
  console.log('GitHub Metrics:', metrics);

  return (
    <main className="flex-1 relative">
      <div className="relative z-10">
        <HomeHero dockerPulls={dockerPulls} metrics={metrics} />
        <SoftwareLogos />
        <HomeFeatures />
        <HomeStats />
        <HomeDifferents />
        <HomeMultiClouds />
        {/* <HomeReviews /> */}
        <GetStartedToday />
        {/* <HomeBlog /> */}
        <Subscribe />
      </div>
    </main>
  );
}
