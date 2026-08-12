import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";

const EN_DOMAIN = "https://rustfs.com";
const ZH_DOMAIN = "https://rustfs.com.cn";
const DEFAULT_OG_IMAGE = "/og-default.png";

type SeoMetadataOptions = {
  path: string;
  title: string;
  description: string;
  keywords?: string | string[];
  robots?: Metadata["robots"];
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  alternates?: Metadata["alternates"];
};

/**
 * Build per-page metadata with:
 * - self-referencing canonical
 * - paired hreflang (en-US / zh-CN) for the same path on both domains
 * - a single, consistent x-default that always points to the English site
 * - a default og:image fallback for social sharing
 */
export function seoMetadata({
  path,
  title,
  description,
  keywords,
  robots,
  openGraph,
  twitter,
  alternates,
}: SeoMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.primaryDomain}${path}`;

  return {
    title,
    description,
    keywords,
    robots,
    alternates: {
      canonical: url,
      languages: {
        "en-US": `${EN_DOMAIN}${path}`,
        "zh-CN": `${ZH_DOMAIN}${path}`,
        "x-default": `${EN_DOMAIN}${path}`,
      },
      ...alternates,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "RustFS",
      locale: SITE_CONFIG.primaryDomain === ZH_DOMAIN ? "zh_CN" : "en_US",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1484, height: 628, alt: title }],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      ...twitter,
    },
  };
}
