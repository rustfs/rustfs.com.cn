export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  items?: string[];
}

export const productNavigation: NavigationItem[] = [
  {
    title: "多协议支持",
    href: "/product/multiple-protocol-access",
    description: "原生支持 S3、WebDAV、Swift、FTP(s) 与 MCP 访问。",
    items: ["S3", "WebDAV", "Swift", "FTP(s)", "MCP"],
  },
  {
    title: "数据管理",
    href: "/product/data-management",
    description: "统一管理存储桶、生命周期、对象锁定、版本控制、分段上传与 S3 Tables。",
    items: ["生命周期", "版本控制", "S3 Tables"],
  },
  {
    title: "高可用 & 扩展性",
    href: "/product/high-availability-scale",
    description: "分布式拓扑、纠删码、存储池编排与自愈能力。",
    items: ["纠删码", "再平衡", "自愈"],
  },
  {
    title: "安全合规",
    href: "/product/security-compliance",
    description: "身份认证、OIDC、mTLS、加密、KMS、审计与事件处理。",
    items: ["IAM", "OIDC", "mTLS", "SSE/KMS"],
  },
  {
    title: "运维 & 可观测性",
    href: "/product/operational-observability",
    description: "集群管理、OpenTelemetry 信号与 rc 运维。",
    items: ["集群管理", "OTEL", "rc"],
  },
];

export const resourceNavigation: NavigationItem[] = [
  {
    title: "纠删码计算器",
    href: "/erasure-code-calculator",
    description: "为数据可靠性与存储效率选择合适的纠删码配置。",
  },
  {
    title: "配置生成器",
    href: "/rustfs-config-generator",
    description: "在线生成可直接使用的 /etc/default/rustfs 配置文件。",
  },
  {
    title: "多租户管理",
    href: "/product/operational-observability#multi-tenant-management",
    description: "通过 Operator 实现弹性扩缩容、MNMD 集群部署与租户资源隔离。",
  },
  {
    title: "文档",
    href: "/docs",
    description: "从快速入门到 API 参考，完成 RustFS 的部署、配置与管理。",
  },
  {
    title: "博客",
    href: "/blog",
    description: "生产实践、技术深度解析与行业洞察。",
  },
];

export const footerNavigation = [
  {
    title: "产品功能",
    links: [
      { title: "S3 兼容", href: "/product/multiple-protocol-access#s3-api-compatibility" },
      { title: "多协议支持", href: "/product/multiple-protocol-access" },
      { title: "数据管理", href: "/product/data-management" },
      { title: "高可用 & 扩展性", href: "/product/high-availability-scale" },
      { title: "运维 & 可观测性", href: "/product/operational-observability" },
      { title: "多租户管理", href: "/product/operational-observability#multi-tenant-management" },
      { title: "安全合规", href: "/product/security-compliance" },
    ],
  },
  {
    title: "资源",
    links: [
      { title: "下载 RustFS", href: "/download" },
      { title: "下载 rc", href: "/download/cli" },
      { title: "博客", href: "/blog" },
      { title: "纠删码计算器", href: "/erasure-code-calculator" },
      { title: "配置生成器", href: "/rustfs-config-generator" },
      { title: "文档", href: "/docs" },
    ],
  },
  {
    title: "公司",
    links: [
      { title: "关于我们", href: "/about" },
      { title: "开源许可", href: "https://github.com/rustfs/rustfs/blob/main/LICENSE" },
      { title: "隐私政策", href: "/privacy-policy" },
      { title: "联系我们", href: "/contact-us" },
    ],
  },
];
