'use client'

import { RedirectPanel } from "@/components/business/redirect-panel";
import { SITE_CONFIG } from "@/app.config";
import { useEffect } from "react";

export default function EnRedirectPage() {
  useEffect(() => {
    window.location.replace(`${SITE_CONFIG.secondaryDomain}/`);
  }, []);

  return (
    <RedirectPanel
      actionLabel="打开英文站"
      description="正在跳转到 RustFS 英文站。"
      eyebrow="RustFS"
      href={`${SITE_CONFIG.secondaryDomain}/`}
      label="英文站"
      title="正在打开 RustFS 英文站。"
    />
  );
}
