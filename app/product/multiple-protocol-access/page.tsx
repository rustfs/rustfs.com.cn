import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "原生多协议支持 | S3、Swift、WebDAV、FTP(s) 与 MCP | RustFS",
  description: "通过 S3、Swift、FTP(s)、WebDAV 和 MCP 将 RustFS 原生连接到任意工作负载，无需修改代码或使用传统代理，实现多协议数据共存。",
  keywords: [
    "RustFS",
    "multi-protocol access",
    "S3 API",
    "OpenStack Swift",
    "WebDAV",
    "FTP",
    "FTPS",
    "Model Context Protocol",
    "MCP AI",
    "data silos",
    "legacy modernization",
    "MinIO",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "S3 API 兼容",
    description: "面向高效管理和现有 S3 兼容生态的主要对象存储 API。",
    items: [
      {
        title: "完整的 S3 API 能力",
        description: "使用纯 Rust 实现对象操作、存储桶策略、版本控制和生命周期管理等 S3 能力。",
      },
      {
        title: "开箱即用的 S3 支持",
        description: "无缝集成各种 S3 兼容基础设施与应用生态。",
      },
      {
        title: "无缝替代 MinIO",
        description: "无需重做配置或改写 API，降低迁移阻力。",
      },
      {
        title: "原生虚拟主机模式",
        description: "支持企业级存储桶寻址、域名级隔离与完整 URL 兼容。",
      },
    ],
  },
  {
    title: "WebDAV",
    description: "为需要操作系统原生工作流的团队提供面向文件的访问，同时保留对象存储能力。",
    items: [
      {
        title: "原生操作系统集成",
        description: "在 Windows、macOS 和 Linux 上将远程对象存储作为本地目录使用，不受客户端绑定。",
      },
      {
        title: "快速便捷配置",
        description: "开箱即用，无需额外配置或复杂的第三方集成。",
      },
      {
        title: "安全文件操作",
        description: "完整支持 TLS/HTTPS，为数据传输提供企业级加密。",
      },
    ],
  },
  {
    title: "Swift API",
    description: "将私有云与 OpenStack 兼容工作负载统一到同一存储基础。",
    items: [
      {
        title: "原生支持 OpenStack",
        description: "将 RustFS 轻松集成到 OpenStack 生态。",
      },
      {
        title: "双协议共存",
        description: "打破数据孤岛，加速 S3 与 Swift 客户端之间的数据流动。",
      },
    ],
  },
  {
    title: "FTP(s)",
    description: "为暂时无法改造的文件传输工作负载提供安全桥梁。",
    items: [
      {
        title: "传统系统现代化",
        description: "快速将传统应用与自动批处理工作流连接到现代对象存储。",
      },
      {
        title: "强化企业安全",
        description: "支持基于 TLS 的 FTPS，保障传输中的数据加密。",
      },
    ],
  },
  {
    title: "MCP",
    description: "RustFS 面向智能体原生基础设施设计。MCP 支持让大语言模型智能体与自动化工作流通过受控接口查询、管理和编排存储资源。",
    items: [
      {
        title: "智能体原生访问",
        description: "让 AI 智能体通过受控存储操作调用并参与 RustFS 工作流。",
      },
      {
        title: "自定义工具集",
        description: "按需定制并扩展自己的工具集。",
      },
    ],
  },
];

export default function MultipleProtocolAccessPage() {
  return (
    <FeaturePage
      title="多协议支持"
      description="RustFS 原生支持 S3、Swift、FTP(s)、WebDAV 和 MCP，可自然融入任意环境，无需网关、传统代理或修改代码。在保持单一高性能数据源的同时，快速连接 AI 流水线、大数据框架与传统企业工作负载。"
      sections={sections}
      variant="protocol"
      highlightsTitle="便捷易用"
      highlights={[
        {
          title: "原生支持",
          description: "开箱即用的配置让存储服务可以快速上线。",
        },
        {
          title: "灵活适配",
          description: "从云原生微服务到传统企业基础设施，灵活适配多种场景。",
        },
        {
          title: "无缝集成",
          description: "原生兼容行业标准协议，顺畅连接现有生态。",
        },
      ]}
      links={[
        { label: "下载", href: "/download" },
        { label: "阅读文档", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
