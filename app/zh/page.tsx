import { RedirectPanel } from "@/components/business/redirect-panel";
import { AutoRedirect } from "@/components/business/auto-redirect";
import { seoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seoMetadata({
  path: "/zh/",
  title: "RustFS 中文站",
  description: "RustFS 中文站：面向 AI 与云原生的高性能 S3 对象存储。",
  robots: { index: false, follow: false },
});

export default function ZhRedirectPage() {
  return (
    <>
      <AutoRedirect href="/" />
      <RedirectPanel
        actionLabel="打开中文站"
        description="正在跳转到 RustFS 中文站。"
        eyebrow="RustFS"
        href="/"
        label="首页"
        title="正在打开 RustFS 首页。"
      />
    </>
  );
}
