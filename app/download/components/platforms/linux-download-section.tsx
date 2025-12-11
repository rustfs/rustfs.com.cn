'use client'

import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface LinuxDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function LinuxDownloadSection({ platform, className }: LinuxDownloadSectionProps) {
  
  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* One-click Installation Script */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{'一键安装脚本'}</h3>
        <CodeBlock
          code={["curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh"]}
          title={'一键安装脚本'}
        />
      </div>

      {/* Binary Downloads */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'二进制下载'}</h3>

        {/* x86_64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">x86_64</h4>
              <p className="text-sm text-muted-foreground">
                {'架构'}: x86_64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'下载'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-x86_64-musl-latest.zip",
              "unzip rustfs-linux-x86_64-musl-latest.zip",
              "./rustfs --version",
            ]}
            title={'安装命令'}
          />

          <Note type="tip">
            {'默认凭据：rustfsadmin / rustfsadmin'}
          </Note>
        </div>

        {/* aarch64 Variant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">aarch64</h4>
              <p className="text-sm text-muted-foreground">
                {'架构'}: aarch64
              </p>
            </div>
            <a
              href="https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              <span>{'下载'}</span>
            </a>
          </div>

          <CodeBlock
            code={[
              "curl -O https://dl.rustfs.com/artifacts/rustfs/release/rustfs-linux-aarch64-musl-latest.zip",
              "unzip rustfs-linux-aarch64-musl-latest.zip",
              "./rustfs --version",
            ]}
            title={'安装命令'}
          />

          <div className="space-y-2">
            <Note type="info">
              {'ARM64 优化，性能更佳'}
            </Note>
            <Note type="tip">
              {'默认凭据：rustfsadmin / rustfsadmin'}
            </Note>
          </div>
        </div>
      </div>
    </div>
  );
}
