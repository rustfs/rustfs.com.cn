import { RedirectPanel } from "@/components/business/redirect-panel";
import { AutoRedirect } from "@/components/business/auto-redirect";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "联系我们 | RustFS",
  robots: { index: false, follow: false },
  alternates: { canonical: "/contact/" },
};

export default function ContactUsPage() {
  return (
    <>
      <AutoRedirect href="/contact/" />
      <RedirectPanel
        actionLabel="打开联系页面"
        description="正在跳转到 RustFS 联系页面。"
        eyebrow="RustFS"
        href="/contact/"
        label="联系我们"
        title="正在打开 RustFS 联系页面。"
      />
    </>
  );
}
