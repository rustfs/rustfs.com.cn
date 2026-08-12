import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import { docs_url } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  path: "/product/operational-observability/",
  title: "RustFS 集群运维与 OTEL 可观测性 | 企业级管理",
  description: "通过直观控制台、丰富的 rc CLI 与全栈 OTEL 可观测性简化 RustFS 管理，一键部署 Prometheus、Grafana 和 Loki，实时洞察集群状态。",
  keywords: [
    "RustFS",
    "cluster observability",
    "OpenTelemetry",
    "Prometheus",
    "Grafana",
    "Loki",
    "rc CLI",
    "storage console",
    "IAM security",
    "real-time cluster monitoring",
  ],
});

const sections: FeaturePageSection[] = [
  {
    id: "multi-tenant-management",
    title: "多租户管理",
    description: (
      <>
        <Link
          href={docs_url("/installation/cloud-native/operator")}
          target="_blank"
          rel="noreferrer"
          className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
        >
          RustFS Operator
        </Link>{" "}
        自动化多租户存储运维，从弹性扩容到即时创建 MNMD 集群，并提供严格的资源隔离。
      </>
    ),
    items: [
      {
        title: "弹性存储自动扩缩容",
        description: "由 Operator 自动编排，按需扩展 RustFS 容量和磁盘池，全程零停机。",
      },
      {
        title: "MNMD 集群部署",
        description: "即时创建多节点多磁盘 RustFS 集群，并支持高并发工作负载所需的多写者并发访问。",
      },
      {
        title: "租户级资源隔离",
        description: "在动态管理的 RustFS 存储池之间实施严格的容量配额、IOPS 限制和独立访问凭证。",
      },
    ],
  },
  {
    title: "控制台运维",
    items: [
      {
        title: "直观的数据管理",
        description: "简化存储桶与对象的全生命周期操作。",
      },
      {
        title: "精细化安全管理",
        description: "强化 IAM、审计日志与数据加密。",
      },
      {
        title: "集中式集群编排",
        description: "简化存储池扩容、再平衡与退役。",
      },
    ],
  },
  {
    title: "OTEL 支持",
    description: "通过兼容 OpenTelemetry 的运维工作流路由日志、指标与监控信号。",
    items: [
      {
        title: "全栈可观测性",
        description: "在 OpenTelemetry 下统一集成日志、监控与指标。",
      },
      {
        title: "一键容器化部署",
        description: "快速启动 Prometheus、Grafana 与 Loki 实例。",
      },
      {
        title: "灵活的环境配置",
        description: "根据企业定制需求调整功能开关。",
      },
    ],
  },
  {
    title: "集群洞察",
    description: "让运维人员清晰掌握节点健康、磁盘状态、容量、存储桶与对象数量。",
    items: [
      {
        title: "集群状态监控",
        description: "快速查看集群节点、磁盘状态与运行时间。",
      },
      {
        title: "容量统计",
        description: "实时跟踪总容量与当前使用量。",
      },
      {
        title: "实时对象数量展示",
        description: "在运维视图中直接查看存储桶与对象数量。",
      },
    ],
  },
  {
    title: "RustFS 客户端 CLI",
    description: "通过 rc 在本地终端、自动化流程与运维手册中执行可重复的存储管理。",
    items: [
      {
        title: "丰富的命令生态",
        description: "通过命令行完成对象、存储桶、集群与安全操作。",
      },
      {
        title: "多平台部署",
        description: "在 Linux、macOS 与 Windows 上通过二进制文件或 Docker 轻松部署。",
      },
      {
        title: "持续迭代",
        description: "持续扩展命令能力，增强基于 CLI 的实例管理。",
      },
    ],
  },
];

export default function OperationalObservabilityPage() {
  return (
    <FeaturePage
      title="运维 & 可观测性"
      description="RustFS 通过控制台工作流、OpenTelemetry 支持、集群洞察与 rc CLI 自动化，让运维人员切实掌控存储操作。"
      sections={sections}
      variant="ops"
      highlightsTitle="企业洞察"
      highlights={[
        {
          title: "实时监控",
          description: "实时查看节点健康、磁盘状态、容量指标以及对象与存储桶数量。",
        },
        {
          title: "高效运维",
          description: "支持源码、二进制、Docker 与 Kubernetes 等方式，轻松部署到多种操作系统。",
        },
        {
          title: "简化管理",
          description: "通过完整控制台与 CLI 能力管理存储桶全生命周期和精细化 IAM 安全。",
        },
      ]}
      links={[
        { label: "下载", href: "/download" },
        { label: "阅读文档", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
