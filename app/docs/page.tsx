import { RedirectPanel } from '@/components/business/redirect-panel';
import { AutoRedirect } from '@/components/business/auto-redirect';
import { seoMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = seoMetadata({
  path: '/docs/',
  title: 'RustFS 文档',
  description: 'RustFS 中文文档：安装、部署、配置与运维指南。',
  robots: { index: false, follow: false },
});

export default function DocsPage() {
  return (
    <>
      <AutoRedirect href="https://docs.rustfs.com/zh" />
      <RedirectPanel
        actionLabel="打开文档"
        description="正在跳转到 RustFS 中文文档站。"
        eyebrow="文档"
        href="https://docs.rustfs.com/zh"
        label="跳转"
        title="正在打开 RustFS 文档。"
      />
    </>
  );
}
