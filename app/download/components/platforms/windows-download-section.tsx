'use client'

import { formatVersion, type GitHubRelease } from '@/lib/github';
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  launcherRelease: GitHubRelease | null;
  className?: string;
}

export default function WindowsDownloadSection({ platform, launcherRelease, className }: WindowsDownloadSectionProps) {
  const releaseUrl = launcherRelease?.html_url || 'https://github.com/rustfs/launcher/releases/latest';
  const version = launcherRelease ? formatVersion(launcherRelease.tag_name) : 'latest';
  const versionTag = launcherRelease?.tag_name || 'latest';
  const versionWithoutV = versionTag.startsWith('v') ? versionTag.slice(1) : versionTag;
  const versionWithV = versionTag.startsWith('v') ? versionTag : `v${versionTag}`;
  const installerFilename = `rustfs-launcher-windows-x86_64-v${versionWithoutV}-setup.exe`;
  const directDownloadUrl = launcherRelease
    ? `https://dl.rustfs.com/artifacts/rustfs-launcher/release/rustfs-launcher-windows-x86_64-${versionWithV}-setup.exe`
    : 'https://dl.rustfs.com/artifacts/rustfs-launcher/release/rustfs-launcher-windows-x86_64-latest-setup.exe';

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Installer Download */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">从 GitHub 下载</h3>

        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">最新版本</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {launcherRelease ? `当前最新版本：${version}` : '正在获取最新版本信息...'}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">下载步骤：</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      访问
                      <a
                        href={releaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-primary hover:underline"
                      >
                        <span>GitHub 发布页</span>
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      在 Assets 中找到并下载
                      <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono text-foreground">
                        {installerFilename}
                      </code>
                    </li>
                    <li>下载完成后双击安装程序，按向导完成安装</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <a
                    href={releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <span>前往发布页</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">提示：</strong>
              Launcher 安装程序已包含 RustFS 二进制文件，安装完成后即可直接使用。
            </p>
          </div>
        </div>
      </div>

      {/* Direct Download */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">从下载站直链下载</h3>

        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">最新版本</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {launcherRelease ? `当前最新版本：${version}` : '正在获取最新版本信息...'}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">下载步骤：</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>点击下方下载按钮或直链获取安装程序</li>
                    <li>下载完成后双击安装程序，按向导完成安装</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <a
                    href={directDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>下载 Windows x86_64 安装程序</span>
                  </a>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    下载链接：
                    <a
                      href={directDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-primary hover:underline break-all"
                    >
                      {directDownloadUrl}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">提示：</strong>
              Launcher 安装程序已包含 RustFS 二进制文件，安装完成后即可直接使用。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
