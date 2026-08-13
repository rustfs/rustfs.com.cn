import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import RustfsConfigGenerator from "@/components/business/rustfs-config-generator";

export const metadata: Metadata = seoMetadata({
  path: "/rustfs-config-generator/",
  title: "RustFS 配置生成器 | 在线生成 /etc/default/rustfs",
  description:
    "在线生成可直接使用的 RustFS /etc/default/rustfs 配置文件，配置 S3 API 与控制台端口、存储卷、访问密钥、日志级别与 OpenTelemetry。",
  keywords: [
    "RustFS 配置生成器",
    "/etc/default/rustfs",
    "RUSTFS_ADDRESS",
    "RUSTFS_CONSOLE_ADDRESS",
    "RUSTFS_VOLUMES",
    "RUSTFS_ACCESS_KEY",
    "RUSTFS_SECRET_KEY",
    "RUSTFS_OBS_LOGGER_LEVEL",
    "RUSTFS_OBS_LOG_DIRECTORY",
    "RUSTFS_OBS_ENDPOINT",
    "RustFS 配置文件",
  ],
});

export default function RustfsConfigGeneratorPage() {
  return (
    <main className="flex-1">
      <RustfsConfigGenerator />
    </main>
  );
}
