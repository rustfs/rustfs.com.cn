import ContactUsButton from "@/components/business/buttons/contact-us";
import DownloadLink from "@/components/business/buttons/download-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, BadgeCheckIcon, Building2Icon, Code2Icon, LifeBuoyIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "价格 | RustFS",
  description: "RustFS 是采用 Apache 2.0 许可证的开源对象存储。联系 RustFS 团队获取企业支持、迁移与部署规划服务。",
};

function PricingCard({
  label,
  title,
  description,
  points,
  chips,
  action,
  emphasized,
}: {
  label: string;
  title: string;
  description: string;
  points: string[];
  chips: string[];
  action: { label: string; href: string };
  emphasized?: boolean;
}) {
  const isEmphasized = Boolean(emphasized);

  return (
    <article
      className={cn(
        "flex h-full flex-col border border-border bg-card",
        isEmphasized && "border-brand"
      )}
    >
      <div className="relative flex flex-1 flex-col border-b border-border p-6">
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{label}</p>
        <h2 className="relative mt-4 font-display text-3xl font-semibold text-foreground">{title}</h2>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge
              key={chip}
              variant="outline"
              className={cn(
                "h-7 bg-background/45 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
                isEmphasized && "border-brand/40 bg-brand/5 text-brand"
              )}
            >
              {chip}
            </Badge>
          ))}
        </div>
        <p className="relative mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
        <div className="relative mt-auto pt-6">
          <Button asChild variant={isEmphasized ? "default" : "outline"} size="lg" className="h-11 px-4 text-sm font-semibold">
            <Link href={action.href}>
              {action.label}
              <ArrowRightIcon data-icon="inline-end" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <ul>
        {points.map((point) => (
          <li
            key={point}
            className={cn(
              "flex gap-3 border-b border-border px-6 py-4 last:border-b-0"
            )}
          >
            <BadgeCheckIcon className="motion-icon-tile mt-0.5 size-4 shrink-0 text-brand" />
            <span className="text-sm leading-6 text-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">价格</p>
          <h1 className="mt-5 w-full font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
            开始使用 RustFS
          </h1>
          <div className="mt-6 flex flex-col items-start gap-6">
            <p className="w-full text-base leading-8 text-muted-foreground">
              从本地测试到 PB 级生产集群，只需几分钟即可运行快速、内存安全且兼容 S3 的对象存储。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <DownloadLink className="!h-12 !px-5 !py-0 leading-none" />
              <ContactUsButton className="!h-12 !px-5 !py-0 leading-none bg-background text-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:bg-muted hover:text-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-2">
          <PricingCard
            label="个人与社区"
            title="免费"
            description="基于 Apache 2.0 许可证使用 RustFS，自主管理开发、测试与生产部署。"
            chips={["Apache 2.0", "自托管"]}
            action={{ label: "下载", href: "/download" }}
            points={[
              "Apache 2.0 许可证",
              "S3 兼容对象存储",
              "服务端二进制、Docker 与 Kubernetes 部署路径",
              "通过 GitHub 跟踪社区问题",
            ]}
          />
          <PricingCard
            label="生产环境"
            title="企业版"
            description="面向从评估走向生产、需要拓扑、迁移与运维规划的团队。"
            emphasized
            chips={["规划", "迁移"]}
            action={{ label: "咨询专家", href: "/contact-us" }}
            points={[
              "迁移规划",
              "容量与拓扑评审",
              "运维就绪指导",
              "企业需求梳理",
            ]}
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden border border-border bg-card lg:grid-cols-2">
            <div className="relative border-b border-border bg-background p-6 sm:p-8 lg:border-r lg:border-b-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]"
              />
              <div className="relative">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">支持路径</p>
                <h2 className="mt-4 w-full text-2xl font-semibold leading-tight text-foreground">
                  从开源开始，在需要时获得专业支持。
                </h2>
                <p className="mt-4 w-full text-sm leading-7 text-muted-foreground">
                  先自由验证，当拓扑、迁移或运维需要评审时再联系我们。
                </p>
              </div>
            </div>
            <div className="grid divide-y divide-border">
              {[
                ["评估", "无需销售流程即可运行 RustFS。"],
                ["规划", "评审拓扑与迁移压力。"],
                ["运维", "为生产环境获得专业支持。"],
              ].map(([title, detail]) => (
                <div key={title} className="flex flex-col justify-center px-6 py-5 sm:px-8">
                  <span className="block text-sm font-semibold text-foreground">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              [Code2Icon, "无门槛评估", "在开始商务沟通前，可先下载服务端、运行 Docker 或通过 Kubernetes 安装。"],
              [Building2Icon, "围绕环境规划", "不同组织与工作负载对存储拓扑、合规、网络和可观测性的需求各不相同。"],
              [LifeBuoyIcon, "在需要时获得支持", "通过企业支持增强生产迁移、运维与长期部署信心。"],
            ].map(([Icon, title, description]) => (
              <article
                key={title as string}
                className="flex min-h-64 flex-col border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center border border-border bg-background text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    就绪
                  </span>
                </div>
                <div className="mt-auto pt-8">
                  <h2 className="text-lg font-semibold text-foreground">{title as string}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{description as string}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
