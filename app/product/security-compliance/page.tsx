import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "安全合规 | RustFS",
  description: "RustFS 提供企业级身份认证、授权、日志审计、事件处理、SSE/KMS 加密、OIDC 单点登录与 mTLS 安全控制。",
  keywords: [
    "RustFS",
    "security compliance",
    "IAM",
    "STS",
    "SSE",
    "KMS",
    "OIDC",
    "mTLS",
    "audit logging",
    "Kafka",
    "Pulsar",
  ],
};

const sections: FeaturePageSection[] = [
  {
    title: "身份与访问管理",
    description: "无需依赖长期共享凭据，即可为用户、服务、应用与自动化智能体定义清晰访问边界。",
    items: [
      {
        title: "基于策略的精细访问控制",
        description: "围绕用户、用户组、角色、存储桶与运维工作流落实最小权限。",
      },
      {
        title: "动态 STS 临时凭据",
        description: "签发基于令牌的临时凭据，降低长期密钥暴露风险并简化受控授权。",
      },
    ],
  },
  {
    title: "数据加密",
    description: "保护静态对象数据，并让密钥所有权符合企业安全要求。",
    items: [
      {
        title: "完整 SSE 支持",
        description: "使用 SSE-S3、SSE-KMS 与 SSE-C 等服务端加密模式，按工作负载提供保护。",
      },
      {
        title: "无缝集成 KMS",
        description: "通过企业级密钥管理系统集中管理密钥生命周期、访问控制与审计。",
      },
    ],
  },
  {
    title: "安全审计",
    description: "将存储活动转化为可复核的运维证据，支持事件响应与合规流程。",
    items: [
      {
        title: "深度运维洞察",
        description: "快速发现破坏性操作，保护关键数据资产。",
      },
      {
        title: "日志流转目标",
        description: "将审计轨迹转发到 Kafka 与 Pulsar，开展更深入的安全分析。",
      },
    ],
  },
  {
    title: "身份认证",
    description: "将 RustFS 集成到企业身份系统，无需为登录与运维访问编写定制胶水代码。",
    items: [
      {
        title: "统一 OIDC 单点登录",
        description: "无缝集成企业身份提供方，实现便捷单点登录。",
      },
      {
        title: "可视化控制台集成",
        description: "简化 OIDC 基础设施配置，降低运维复杂度。",
      },
    ],
  },
  {
    title: "mTLS",
    description: "通过双向身份验证与证书自动化保护服务间流量。",
    items: [
      {
        title: "零信任 mTLS",
        description: "强制双向 TLS 验证，在通信双方实现身份认证。",
      },
      {
        title: "自动化证书管理",
        description: "原生支持 cert-manager，自动签发与轮换证书。",
      },
    ],
  },
];

export default function SecurityCompliancePage() {
  return (
    <FeaturePage
      title="安全合规"
      description="完整的企业级安全与合规框架原生覆盖身份认证、授权、日志审计与事件处理，开箱即用地满足严格企业合规要求。"
      sections={sections}
      variant="security"
      highlightsTitle="安全优先"
      highlights={[
        {
          title: "零信任",
          description: "在整个企业范围落实最小权限原则。",
        },
        {
          title: "纵深防御",
          description: "通过多层保护保障整个数据链路的端到端安全。",
        },
        {
          title: "开箱即用",
          description: "无需额外复杂配置即可快速启用可靠保护。",
        },
      ]}
      links={[
        { label: "下载", href: "/download" },
        { label: "阅读文档", href: "/docs", variant: "outline" },
      ]}
    />
  );
}
