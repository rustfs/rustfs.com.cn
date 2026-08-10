'use client'

import { CheckIcon, XIcon } from "lucide-react";
import HomeSectionHeader from "./home-section-header";

const comparisonRows = [
  {
    other: "内存安全依赖运行时与实现规范",
    rustfs: "使用 Rust 构建，保障内存安全",
  },
  {
    other: "遥测和日志可能离开本地控制边界",
    rustfs: "自托管控制，不向外部发送日志",
  },
  {
    other: "许可证条款可能限制商业分发",
    rustfs: "采用商业友好的 Apache 2.0 许可证",
  },
  {
    other: "不同产品和网关的 S3 行为可能不一致",
    rustfs: "完整支持 S3，兼容现有云生态",
  },
  {
    other: "平台覆盖通常依赖不同版本",
    rustfs: "广泛支持多种硬件架构",
  },
  {
    other: "存储规模增长后价格和支持成本难以预测",
    rustfs: "开源基础与支持路径清晰可预测",
  },
];

export default function HomeDifferents() {
  return (
    <section className="relative border-t border-border bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="竞争力对比"
          title="RustFS 与传统对象存储"
          description="当内存安全、S3 兼容、开放许可和可预测运维比厂商锁定更重要时，RustFS 是更合适的选择。"
        />

        <div className="border border-border bg-card/40">
          <div className="grid border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:grid-cols-2">
            <div className="border-b border-border px-5 py-3 lg:border-b-0 lg:border-r">
              其他对象存储
            </div>
            <div className="px-5 py-3 text-brand">
              RustFS
            </div>
          </div>

          <div className="divide-y divide-border">
            {comparisonRows.map((row) => (
              <div key={row.rustfs} className="grid lg:grid-cols-2">
                <div className="grid grid-cols-[3rem_1fr] border-b border-border text-muted-foreground lg:border-b-0 lg:border-r">
                  <span className="flex items-center justify-center border-r border-border">
                    <XIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="px-5 py-4 text-sm leading-6">{row.other}</span>
                </div>
                <div className="grid grid-cols-[3rem_1fr] text-foreground">
                  <span className="flex items-center justify-center border-r border-border text-brand">
                    <CheckIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="px-5 py-4 text-sm font-medium leading-6">
                    {row.rustfs}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
