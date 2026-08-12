import DownloadPageClient from './components/download-page-client';
import type { Metadata } from 'next';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata({
  path: '/download/',
  title: "下载与安装 RustFS | 多系统与云原生部署",
  description: '下载 RustFS 服务端与原生 CLI（rc），通过预编译二进制、Docker 镜像或 Kubernetes 在 Linux、macOS、Windows 和 NixOS 上轻松安装。',
  keywords: '下载 RustFS, 安装 RustFS, RustFS 二进制, RustFS Docker, RustFS Kubernetes, RustFS CLI, RustFS 命令行, NixOS 对象存储, S3 服务端下载, macOS, Linux, Windows, nixos',
  openGraph: {
    title: "下载与安装 RustFS | 多系统与云原生部署",
    description: '下载 RustFS 服务端与原生 CLI（rc），通过预编译二进制、Docker 镜像或 Kubernetes 在多种系统上轻松安装。',
    type: "website",
    locale: 'zh_CN',
  },
});

export default function DownloadPage() {
  return <DownloadPageClient />;
}
