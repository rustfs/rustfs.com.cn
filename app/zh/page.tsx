'use client'

import { RedirectPanel } from "@/components/business/redirect-panel";
import { useEffect } from "react";

export default function ZhRedirectPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <RedirectPanel
      actionLabel="打开中文站"
      description="正在跳转到 RustFS 中文站。"
      eyebrow="RustFS"
      href="/"
      label="首页"
      title="正在打开 RustFS 首页。"
    />
  );
}
