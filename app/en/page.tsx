import { RedirectPanel } from "@/components/business/redirect-panel";
import { AutoRedirect } from "@/components/business/auto-redirect";
import { SITE_CONFIG } from "@/app.config";
import { seoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seoMetadata({
  path: "/en/",
  title: "RustFS English Site",
  description: "RustFS 英文站：面向 AI 与云原生的高性能 S3 对象存储。",
  robots: { index: false, follow: false },
});

export default function EnRedirectPage() {
  return (
    <>
      <AutoRedirect href={`${SITE_CONFIG.secondaryDomain}/`} />
      <RedirectPanel
        actionLabel="打开英文站"
        description="正在跳转到 RustFS 英文站。"
        eyebrow="RustFS"
        href={`${SITE_CONFIG.secondaryDomain}/`}
        label="英文站"
        title="正在打开 RustFS 英文站。"
      />
    </>
  );
}
