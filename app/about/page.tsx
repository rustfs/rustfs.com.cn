import ContactUsButton from "@/components/business/buttons/contact-us"
import { cn } from "@/lib/utils"
import RustFSLogo from "@/public/rustfs.logo.svg"
import { CpuIcon, DatabaseIcon, GitBranchIcon, ShieldCheckIcon } from "lucide-react"
import type { Metadata } from "next"
import type { ComponentType } from "react"

export const metadata: Metadata = {
  title: "关于 RustFS | 面向 AI 的新一代分布式对象存储",
  description: "了解使用 Rust 构建、采用 Apache 2.0 许可证的开源分布式对象存储系统 RustFS，以及面向 AI 数据中心的原生 RDMA 与 DPU 加速方向。",
  keywords: "关于 RustFS, RustFS 项目, 开源对象存储, 分布式对象存储, Rust 基础设施, NVIDIA Inception, RDMA 存储, DPU 硬件加速",
};

const milestones = [
  {
    date: "2024.06.23",
    title: "首次提交",
    description: "存储内核以 Rust 优先的系统设计起步。",
  },
  {
    date: "2025.07.02",
    title: "正式开源",
    description: "RustFS 以 Apache 2.0 许可证面向全球社区发布。",
  },
  {
    date: "2025.10.27",
    title: "GitHub Stars 达到 10,000",
    description: "开源存储团队开始规模化采用 RustFS。",
  },
  {
    date: "2026.01.20",
    title: "GitHub Stars 达到 20,000",
    description: "存储与 AI 工作负载领域的社区影响力持续增长。",
  },
  {
    date: "2026.04.09",
    title: "NVIDIA Inception",
    description: "RustFS 加入 NVIDIA Inception Program，加速 AI 基础设施创新。",
  },
  {
    date: "2026.04.26",
    title: "Beta 版本发布",
    description: "项目进入面向生产环境的 S3 兼容存储验证阶段。",
  },
  {
    date: "2026.07.20",
    title: "GitHub Stars 超过 30,000",
    description: "全球开源社区推动 RustFS 的 GitHub Stars 突破 30,000。",
  },
];

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <article className="border border-border bg-card p-6">
      <Icon className="size-5 text-brand" />
      <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  );
}

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            为 <span className="whitespace-nowrap">Rust 原生</span>基础设施打造的对象存储
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            RustFS 是使用 Rust 构建、采用 Apache 2.0 许可证的新一代分布式对象存储系统。它已获得超过 30,000 GitHub Stars、700 万次 Docker Hub 拉取，并在全球运行 150 万个实例，服务 S3 兼容与 AI 数据中心工作负载。
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="border border-border bg-card p-6 lg:p-8">
            <span className="flex h-14 w-48 items-center">
              <RustFSLogo className="h-auto w-full" />
            </span>
            <h2 className="mt-10 max-w-xl text-3xl font-semibold leading-tight text-foreground">
              开放、自托管且可编程的存储基础
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              RustFS 管理对象、存储桶、IAM、生命周期与集群工作流，同时保持 100% 原生 S3 兼容，让现有工具和应用稳定运行。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ValueCard
              icon={ShieldCheckIcon}
              title="Apache 2.0 开源基础"
              description="开放许可证让采用、再分发与商业部署更直接。"
            />
            <ValueCard
              icon={DatabaseIcon}
              title="S3 兼容接口"
              description="应用继续使用相同的对象存储协议，由 RustFS 承载存储层。"
            />
            <ValueCard
              icon={CpuIcon}
              title="AI 基础设施方向"
              description="原生 RDMA、DPU 加速与硬件加密是未来数据中心工作负载的核心方向。"
            />
            <ValueCard
              icon={GitBranchIcon}
              title="运维优先控制"
              description="控制台、rc CLI 与遥测工作流专为自主管理存储的团队设计。"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              项目时间线
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              RustFS 在产品研发、开源成长与 AI 基础设施方向上的关键节点。
            </p>
          </div>

          <ol className="overflow-hidden border border-border bg-card">
            {[...milestones].reverse().map((item, index) => (
              <li
                key={`${item.date}-${item.title}`}
                className={cn(
                  "grid border-b border-border last:border-b-0 sm:grid-cols-[12.5rem_1fr]",
                  index === 0 && "bg-muted/20"
                )}
              >
                <div className="flex items-center gap-3 border-b border-border px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] sm:border-b-0 sm:border-r">
                  <time className="text-muted-foreground">{item.date}</time>
                </div>
                <div className="px-5 py-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 border border-border bg-card p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">RustFS</p>
              <h2 className="mt-4 text-3xl font-semibold text-foreground">联系我们</h2>
              <address className="mt-5 text-base not-italic leading-8 text-muted-foreground">
                北京市海淀区西小口路 66 号中关村东升科技园北领地 C 区<br />
                400-033-5363
              </address>
            </div>
            <ContactUsButton className="!h-12 !px-5 !py-0 leading-none" />
          </div>
        </div>
      </section>
    </main>
  );
}
