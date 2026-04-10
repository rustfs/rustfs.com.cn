import DownloadPageClient from './components/download-page-client';
import { getLatestRelease, getLatestLauncherRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '下载 | RustFS - 高性能分布式存储系统',
  description: '下载 RustFS，支持 Docker、Linux、macOS、Windows 等多平台，快速部署您的分布式存储系统。',
  openGraph: {
    title: '下载 | RustFS - 高性能分布式存储系统',
    description: '下载 RustFS，支持 Docker、Linux、macOS、Windows 等多平台，快速部署您的分布式存储系统。',
    type: "website",
    locale: 'zh_CN',
  },
};

export default async function DownloadPage() {
  const [release, launcherRelease] = await Promise.all([
    getLatestRelease(),
    getLatestLauncherRelease()
  ]);
  return <DownloadPageClient release={release} launcherRelease={launcherRelease} />;
}
