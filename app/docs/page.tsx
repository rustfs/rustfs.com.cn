'use client'

import { useEffect } from 'react';
import { RedirectPanel } from '@/components/business/redirect-panel';

export default function DocsPage() {
  useEffect(() => {
    window.location.replace('https://docs.rustfs.com.cn');
  }, []);

  return (
    <RedirectPanel
      actionLabel="打开文档"
      description="正在跳转到 RustFS 中文文档站。"
      eyebrow="文档"
      href="https://docs.rustfs.com.cn"
      label="跳转"
      title="正在打开 RustFS 文档。"
    />
  );
}
