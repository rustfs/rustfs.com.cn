'use client'

import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HomeSectionHeader from "./home-section-header";

const stories = [
  {
    title: "NVIDIA Inception Program",
    token: "rdma+dpu",
    label: "AI 基础设施",
    description:
      "RustFS 已加入 NVIDIA Inception Program。借助 NVIDIA 的前沿平台，RustFS 正在推进原生 RDMA 支持，并将纠删码计算与数据加密卸载到新一代 DPU，为 AI 数据中心存储带来更高性能。",
    href: "/blog/big-news-rustfs-joins-the-nvidia-inception-program",
    linkText: "了解详情",
  },
  {
    title: "无缝替代 MinIO",
    token: "minio swap",
    label: "迁移路径",
    description:
      "无需搬迁数据即可快速迁移。只需替换二进制文件或容器镜像，RustFS 就能从 MinIO 原地无缝迁移，大幅降低迁移负担与工程成本。",
    href: "/blog/binary-replacement-a-simple-way-to-migrate-from-minio-to-rustfs",
    linkText: "阅读迁移指南",
  },
];

export default function HomeMultiClouds() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="实践案例"
          title="面向下一代对象存储而构建"
          description="RustFS 融合 Rust 原生工程能力、Apache 2.0 开源许可与 S3 兼容性，服务 AI 基础设施并支持从 MinIO 直接迁移。"
        />

        <div className="grid border border-border lg:grid-cols-2">
          <Link
            href={stories[0].href}
            className="motion-card group flex min-h-[30rem] flex-col bg-card transition-colors hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={stories[0].linkText}
          >
            <div className="relative flex h-60 shrink-0 items-center justify-center overflow-hidden bg-background p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:34px_34px]"
              />
              <Image
                src="/images/nvidia-inception-program-badge.png"
                alt="NVIDIA Inception Program 成员徽章"
                width={501}
                height={217}
                unoptimized
                className="relative h-auto w-full max-w-sm"
              />
            </div>

            <StoryContent story={stories[0]} className="border-t border-border" />
          </Link>

          <Link
            href={stories[1].href}
            className="motion-card group relative flex min-h-[30rem] flex-col overflow-hidden border-t border-border bg-card transition-colors hover:!border-border hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:border-l lg:border-t-0"
            aria-label={stories[1].linkText}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 transition-[opacity,background-position] duration-500 [background-image:repeating-linear-gradient(135deg,transparent_0_20px,var(--border)_20px_21px,transparent_21px_40px)] group-hover:bg-[position:32px_0] group-hover:opacity-45"
            />
            <div className="relative flex h-60 shrink-0 items-center p-8 sm:p-10">
              <p className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                S3 迁移
              </p>
            </div>

            <StoryContent story={stories[1]} className="border-t border-border" />
          </Link>
        </div>

        <p className="mt-4 text-xs leading-6 text-muted-foreground" role="note">
          MinIO 是 MinIO, Inc. 的注册商标。RustFS 与 MinIO, Inc. 无关联，亦未获得其认可或赞助。其他商标和注册商标均归各自所有者所有。
        </p>
      </div>
    </section>
  );
}

function StoryContent({
  story,
  className = "",
}: {
  story: (typeof stories)[number];
  className?: string;
}) {
  return (
    <div className={`relative flex flex-1 flex-col p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-brand">{story.label}</span>
        <span className="h-px flex-1 bg-border" />
        <code>{story.token}</code>
      </div>
      <h3 className="mt-7 max-w-xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {story.title}
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
        {story.description}
      </p>
      <ArrowUpRightIcon className="motion-arrow mt-auto size-5 self-end text-brand" />
    </div>
  );
}
