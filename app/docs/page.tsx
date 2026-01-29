'use client'

import { useEffect } from 'react';
import { docs_url } from '@/lib/utils';

export default function DocsPage() {
  useEffect(() => {
    // 重定向到 RustFS 中文文档
    window.location.href = docs_url('/zh/');
  }, []);

  // 显示加载状态
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">正在跳转至 RustFS 文档站点…</p>
      </div>
    </div>
  );
}
