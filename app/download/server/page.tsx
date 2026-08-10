import { ServerDownloadPage } from '../components/download-page-client';
import { getLatestRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '下载 RustFS 服务端 | Linux、Docker 与 Kubernetes',
  description: '通过 Linux 二进制、Docker、Compose、Kubernetes、macOS 或 Windows 安装 RustFS 服务端。',
};

export default async function DownloadServerPage() {
  const release = await getLatestRelease();

  return <ServerDownloadPage release={release} />;
}
