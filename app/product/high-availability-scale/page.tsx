import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  path: "/product/high-availability-scale/",
  title: "RustFS 高可用与扩展性 | 企业级分布式存储",
  description:
    "了解 RustFS 企业级分布式架构。通过分布式纠删码、自动自愈与可靠数据保护，实现从 PB 到 EB 级的线性扩容。",
  keywords: [
    "RustFS",
    "distributed object storage",
    "high availability",
    "infinite scaling",
    "erasure coding",
    "self-healing",
    "S3-compatible",
    "enterprise storage solution",
    "data reliability",
  ],
});

const sections: FeaturePageSection[] = [
  {
    title: "分布式部署",
    items: [
      {
        title: "企业级分布式架构",
        description:
          "满足海量数据的高可用要求。",
      },
      {
        title: "灵活的多节点多磁盘拓扑",
        description:
          "满足企业定制化存储策略。",
      },
      {
        title: "可靠的节点级与磁盘级容错",
        description:
          "保障服务连续性与数据可用性。",
      },
    ],
  },
  {
    title: "纠删码配置",
    items: [
      {
        title: "分布式纠删码",
        description:
          "提升 RustFS 集群韧性与灾难恢复能力。",
      },
      {
        title: "优化纠删码配置",
        description:
          "平衡存储效率与数据可靠性。",
      },
      {
        title: "纠删码计算器",
        description:
          "快速为工作负载匹配最佳实践配置。",
      },
    ],
  },
  {
    title: "线性扩容",
    items: [
      {
        title: "横纵向扩容",
        description:
          "支持从 PB 到 EB 级的数据管理。",
      },
      {
        title: "自动数据再平衡",
        description:
          "实现均衡的磁盘利用率。",
      },
      {
        title: "零停机扩容",
        description:
          "尽量降低扩容对运行中工作负载的性能影响。",
      },
    ],
  },
  {
    title: "节点修复",
    items: [
      {
        title: "自动数据自愈",
        description:
          "提供企业级数据可靠性。",
      },
      {
        title: "数据完整性校验",
        description:
          "保障集群数据一致性。",
      },
      {
        title: "实时进度跟踪",
        description:
          "深入了解集群健康状态。",
      },
    ],
  },
  {
    title: "站点复制",
    items: [
      {
        title: "多站点复制",
        description:
          "提升可靠性并提供强大的灾难恢复能力。",
      },
      {
        title: "双向同步",
        description:
          "保持分布式站点间的数据一致。",
      },
      {
        title: "位置感知路由",
        description:
          "实现低延迟访问并改善用户体验。",
      },
    ],
  },
];

export default function HighAvailabilityScalePage() {
  return (
    <FeaturePage
      title="高可用 & 扩展性"
      description="RustFS 通过企业级分布式架构、分布式纠删码与可靠容错，在线性扩容与数据一致性之间取得平衡，为企业从 PB 到 EB 级乃至更大规模的存储提供可靠、高效的数据管理。"
      sections={sections}
      variant="scale"
      highlightsTitle="高效可靠"
      highlights={[
        {
          title: "企业架构",
          description: "满足企业海量存储对高可用与严格可靠性的双重要求。",
        },
        {
          title: "降低成本",
          description: "兼顾成本效率，降低企业硬件存储成本与运维工作量。",
        },
        {
          title: "高度灵活",
          description: "灵活适配多种业务场景与任意数据规模下的高效数据管理。",
        },
      ]}
      links={[
        { label: "下载", href: "/download" },
        { label: "规划扩展", href: "/contact", variant: "outline" },
      ]}
    />
  );
}
