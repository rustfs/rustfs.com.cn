import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "数据管理与 S3 Tables | RustFS 高性能存储",
  description:
    "使用 RustFS 优化数据管理。完整 S3 兼容、自动生命周期管理与 S3 Tables 驱动的原生 Iceberg 支持，可降低总体拥有成本并加速 AI 与大数据工作负载。",
  keywords: [
    "RustFS",
    "data management",
    "object storage",
    "S3 compatibility",
    "S3 Tables",
    "Apache Iceberg",
    "MinIO",
    "bucket quota",
    "multipart upload",
    "lakehouse storage",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "S3",
    items: [
      {
        title: "存储桶与对象",
        description: "让对象存储数据管理更稳定、更高效。",
      },
      {
        title: "生命周期管理",
        description: "优化整体存储成本，降低运维负担。",
      },
      {
        title: "分段上传",
        description: "加速大文件传输，充分利用网络带宽。",
      },
    ],
  },
  {
    title: "S3 Tables（即将推出）",
    items: [
      {
        title: "自动化小文件管理",
        description: "自动执行后端合并与快照，简化运维并降低成本。",
      },
      {
        title: "性能加速",
        description: "优化专用元数据层，大幅降低查询延迟并加速数据分析。",
      },
      {
        title: "原生支持 Iceberg",
        description: "无缝连接主流大数据与 AI 生态。",
      },
    ],
  },
];

export default function DataManagementPage() {
  return (
    <FeaturePage
      title="数据管理"
      description="完整的生命周期管理覆盖存储桶配额、对象锁定与版本控制。原生兼容 S3，可从任意 S3 兼容系统无缝迁移数据到 RustFS。"
      sections={sections}
      variant="data"
      highlightsTitle="安全可靠"
      highlights={[
        {
          title: "S3 兼容",
          description: "原生支持 S3 协议，高效管理对象存储数据。",
        },
        {
          title: "统一管理",
          description: "通过 S3 Tables 统一管理结构化与非结构化数据。",
        },
        {
          title: "高性价比",
          description: "通过精细化数据生命周期管理降低企业存储成本。",
        },
      ]}
      links={[
        { label: "规划数据工作流", href: "/contact-us" },
        { label: "阅读文档", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
