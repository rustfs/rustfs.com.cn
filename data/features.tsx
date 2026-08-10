import {
  BinaryIcon,
  CloudCogIcon,
  Code2Icon,
  DatabaseZapIcon,
  GitBranchIcon,
  NetworkIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from "lucide-react";

const features = [
  {
    "title": "纠删码",
    "plane": "数据平面",
    "token": "RS(EC)",
    "description": "灵活的 Reed-Solomon 纠删码配置兼顾数据可靠性与存储效率。",
    "icon": DatabaseZapIcon,
    "featureDescription": "利用先进的 Reed-Solomon 算法提升存储效率，并针对不同工作负载平衡硬件开销与数据可靠性。",
  },
  {
    "title": "分布式部署",
    "plane": "集群平面",
    "token": "MNMD",
    "description": "跨节点和磁盘运行，提供高可用与可预测的扩展能力。",
    "icon": NetworkIcon,
    "featureDescription": "支持跨多个节点和磁盘部署。RustFS 在集群中智能分布数据与流量，实现高可用、自动故障转移和可预测的性能扩展。",
  },
  {
    "title": "存储池管理",
    "plane": "存储池平面",
    "token": "rebalance()",
    "description": "无需计划停机即可扩容、再平衡和退役存储池。",
    "icon": GitBranchIcon,
    "featureDescription": "通过存储池扩容、自动数据再平衡和老旧硬件安全退役管理完整集群生命周期，无需计划停机。",
  },
  {
    "title": "多协议支持",
    "plane": "访问平面",
    "token": "S3",
    "description": "通过 S3、Swift、FTP(s)、WebDAV 和 MCP 访问同一份存储。",
    "icon": WorkflowIcon,
    "featureDescription": "应用可通过 Amazon S3、OpenStack Swift、FTP(s)、WebDAV 和 MCP 读写、管理同一份存储，消除数据孤岛与协议转换瓶颈。",
  },
  {
    "title": "纵深防御安全体系",
    "plane": "信任平面",
    "token": "IAM/KMS",
    "description": "分层整合 IAM、OIDC、STS、mTLS、KMS 加密与审计控制。",
    "icon": ShieldCheckIcon,
    "featureDescription": "在每一层保护数据基础设施。RustFS 原生集成 IAM、OIDC 和 STS，实现精细访问控制，提供可靠的 mTLS 与 KMS 驱动加密（SSE-S3/KMS/C），并通过完整安全审计满足严格合规要求。",
  },
  {
    "title": "运维和可观测性",
    "plane": "运维平面",
    "token": "otel.trace",
    "description": "在统一控制平面跟踪容量、健康状态、事件与 OTEL 信号。",
    "icon": CloudCogIcon,
    "featureDescription": "通过原生 OpenTelemetry 集成、即时事件通知、容量指标、存储桶与对象可见性以及节点健康监控简化运维。",
  },
  {
    "title": "云原生部署",
    "plane": "运行时平面",
    "token": "helm install",
    "description": "使用 Helm Charts 与 Kubernetes Operator 自动管理生命周期。",
    "icon": BinaryIcon,
    "featureDescription": "通过官方 Helm Charts、Kubernetes Operator 工作流和云原生编排能力部署、扩展与修复 RustFS 集群。",
  },
  {
    "title": "AI 与智能体原生基础设施",
    "plane": "智能体平面",
    "token": "rc + MCP",
    "description": "让智能体和 CI/CD 流水线查询并编排存储资源。",
    "icon": Code2Icon,
    "featureDescription": "RustFS 通过 MCP 支持和强大的 rc CLI 服务智能体工作流，让大语言模型、自动化智能体和 CI/CD 流水线可以查询并编排存储资源。",
  }
];

export default features;
