export interface IntegrationProject {
  name: string;
  description: string;
  docsUrl: string;
}

export interface IntegrationCategory {
  id: string;
  label: string;
  description: string;
  projects: IntegrationProject[];
}

export const integrationCategories: IntegrationCategory[] = [
  {
    id: "ai",
    label: "AI",
    description: "依赖对象存储数据集的模型训练与 MLOps 技术栈。",
    projects: [
      {
        name: "Milvus",
        description: "在 S3 兼容对象存储上构建向量数据库工作流。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/developer/integration/big-data/milvus",
      },
      {
        name: "Nawāt",
        description: "以 RustFS 作为 Unsloth 训练工作流可靠的 S3 兼容后端，管理 AI 微调存储。",
        docsUrl: "/blog/nawat-ai-training-storage-with-rustfs",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    description: "CI/CD 工作流、平台工程与发布自动化。",
    projects: [
      {
        name: "GitLab",
        description: "为流水线与制品使用 OIDC 单点登录和 S3 兼容对象存储。",
        docsUrl: "https://docs.gitlab.com/administration/object_storage/",
      },
    ],
  },
  {
    id: "backup-restore",
    label: "备份与恢复",
    description: "面向快照、恢复与保留的数据保护工作流。",
    projects: [
      {
        name: "Restic",
        description: "将加密仓库快照存储到 S3 兼容后端。",
        docsUrl: "https://restic.readthedocs.io/en/stable/",
      },
    ],
  },
  {
    id: "security",
    label: "安全",
    description: "围绕数据访问的身份、密钥与运行时安全控制。",
    projects: [
      {
        name: "Keycloak",
        description: "使用 OIDC 单点登录实现安全、集中的访问控制。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/security-compliance/oidc/keycloak",
      },
      {
        name: "GitLab",
        description: "将 GitLab 配置为 OIDC 身份提供方，管理企业登录。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/security-compliance/oidc/keycloak",
      },
    ],
  },
  {
    id: "big-data",
    label: "大数据",
    description: "面向大规模数据流动的分析与事件处理引擎。",
    projects: [
      {
        name: "Iceberg",
        description: "以 RustFS 作为可靠对象存储层使用开放表格式。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/developer/integration/big-data/iceberg",
      },
    ],
  },
  {
    id: "reverse-proxy",
    label: "反向代理",
    description: "位于存储服务前端的入口与流量控制层。",
    projects: [
      {
        name: "Nginx",
        description: "通过成熟的反向代理层暴露 RustFS 端点。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/developer/integration/reverse-proxy",
      },
      {
        name: "Traefik",
        description: "使用云原生网关策略动态路由 RustFS 流量。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/developer/integration/reverse-proxy",
      },
      {
        name: "Caddy",
        description: "使用现代代理和默认 TLS 配置快速发布 RustFS 服务。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/developer/integration/reverse-proxy",
      },
      {
        name: "HAProxy",
        description: "在节点间均衡 S3 流量，实现高可用与扩展。",
        docsUrl: "https://docs.rustfs.com.cn/zh-cn/developer/integration/reverse-proxy",
      },
    ],
  },
];
