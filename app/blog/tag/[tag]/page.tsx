import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogIndex from "../../blog-index";
import { getBlogTagLabel } from "@/lib/blog-localization";
import { getBlogPosts } from "@/lib/mdx-blog";
import { seoMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return tags
    .filter((tag) => tag !== "Integration")
    .map((tag) => ({ tag: toTagSlug(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const label = await findTag(tag);
  const path = `/blog/tag/${tag}/`;

  return seoMetadata({
    path,
    title: label ? `${getBlogTagLabel(label)} | RustFS 博客` : "RustFS 博客",
    description: label
      ? `浏览 RustFS 博客“${getBlogTagLabel(label)}”分类的文章。`
      : "浏览 RustFS 博客文章。",
  });
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const label = await findTag(tag);

  if (!label) notFound();
  return <BlogIndex requestedTag={label} />;
}

async function findTag(slug: string) {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).find((tag) => toTagSlug(tag) === slug);
}

function toTagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
