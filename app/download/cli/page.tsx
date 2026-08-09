import RcDownloadSection from '../components/rc-download-section';
import { getLatestCliRelease } from '@/lib/github';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '下载 RustFS CLI 客户端（rc）| 多平台安装',
  description: '通过包管理器、原生二进制、Docker 或源码构建安装 RustFS rc 命令行客户端。',
};

export default async function DownloadCliPage() {
  const cliRelease = await getLatestCliRelease();

  return <RcDownloadSection cliRelease={cliRelease} />;
}
