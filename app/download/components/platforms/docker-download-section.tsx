'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";
import { type GitHubRelease } from '@/lib/github';

interface DockerDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function DockerDownloadSection({ platform, release, className }: DockerDownloadSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = release; // Docker uses Docker Hub tags, not GitHub releases
  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Docker Deployment */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">{'Docker 部署'}</h3>
          <a
            href="https://hub.docker.com/r/rustfs/rustfs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80">
            <span>{'查看镜像'}</span>
            <ExternalLinkIcon className="w-3 h-3" />
          </a>
        </div>

        {/* Latest Stable Version */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'最新稳定版'}</h4>
              <p className="text-sm text-muted-foreground">
                {'架构'}：latest
              </p>
            </div>
            <a
              href="https://hub.docker.com/r/rustfs/rustfs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'下载'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "docker pull rustfs/rustfs:latest",
              "docker run -d \\",
              "  --name rustfs \\",
              "  -p 9000:9000 \\",
              "  -p 9001:9001 \\",
              "  -v /data:/data \\",
              "  rustfs/rustfs:latest",
            ]}
            title={'安装命令'}
          />
        </div>

        {/* Docker Compose */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'Docker Compose'}</h4>
              <p className="text-sm text-muted-foreground">
                {'使用 Docker Compose 运行 RustFS'}
              </p>
            </div>
            <a
              href="https://github.com/rustfs/rustfs/blob/main/docker-compose.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <ExternalLinkIcon className="w-4 h-4" />
              <span>{'查看 Compose 文件'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "wget https://raw.githubusercontent.com/rustfs/rustfs/main/docker-compose.yml",
              "docker compose up -d",
            ]}
            title={'安装命令'}
          />
        </div>

        {/* Kubernetes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{'Kubernetes'}</h4>
              <p className="text-sm text-muted-foreground">
                {'使用 Helm Charts 安装'}
              </p>
            </div>
            <a
              href="https://charts.rustfs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <ExternalLinkIcon className="w-4 h-4" />
              <span>{'查看 Charts'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "helm repo add rustfs https://charts.rustfs.com",
              "helm install my-rustfs rustfs/rustfs --version 0.5.0",
            ]}
            title={'安装命令'}
          />
        </div>

        </div>

      {/* Platform Notes */}
      <div className="space-y-2">
        <Note type="tip">
          {'默认账号密码：rustfsadmin / rustfsadmin'}
        </Note>
        <Note type="info">
          <Link href="https://hub.docker.com/r/rustfs/rustfs/tags" target="_blank" className="hover:underline" rel="noopener noreferrer">
            {'在 Docker Hub 查看全部可用版本'}
          </Link>
        </Note>
        <Note type="success">
          <Link href="https://docs.rustfs.com.cn/installation/docker" target="_blank" className="hover:underline" rel="noopener noreferrer">
            {'查看详细 Docker 安装指南'}
          </Link>
        </Note>
      </div>
    </div>
  );
}
