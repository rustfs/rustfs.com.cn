const BLOG_TAG_LABELS: Record<string, string> = {
  "AI": "AI",
  "Ai": "AI",
  "Announcements": "公告",
  "Artifacthub": "Artifact Hub",
  "Best Practices": "最佳实践",
  "Cloud Native": "云原生",
  "Distributed Storage": "分布式存储",
  "General Usage": "使用指南",
  "How to migrate from MinIO to RustFS?": "从 MinIO 迁移到 RustFS",
  "Integration": "集成",
  "Laravel sail": "Laravel Sail",
  "Nvidia": "NVIDIA",
  "Performance": "性能",
  "Release": "发布",
  "S3 Table": "S3 Tables",
  "Security": "安全",
  "Use Case": "应用案例",
  "helm": "Helm",
  "minio": "MinIO",
};

export function getBlogTagLabel(tag: string) {
  return BLOG_TAG_LABELS[tag] ?? tag;
}
