'use client'

import { getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github';
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import CodeBlock from "../code-block";
import Note from "../common/note";
import PlatformHeader from "../common/platform-header";
import { type PlatformInfoData } from "./platform-info";

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  release: GitHubRelease | null;
  className?: string;
}

export default function WindowsDownloadSection({ platform, release, className }: WindowsDownloadSectionProps) {
  const releaseUrl = release?.html_url || 'https://github.com/rustfs/rustfs/releases/latest';
  const downloadUrl = release ? getDownloadUrlForPlatform(release, 'windows', 'x86_64') : null;
  const finalDownloadUrl = downloadUrl || releaseUrl;
  const filename = downloadUrl?.match(/([^/]+\.zip)$/)?.[1] || 'rustfs-windows-x86_64-latest.zip';

  return (
    <div className={cn("space-y-8", className)}>
      {/* Platform Header */}
      <PlatformHeader platform={platform} />

      {/* Binary Download */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{'二进制下载'}</h3>

        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{'Windows x86_64'}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {'下载 Windows 软件包，解压后运行 RustFS 二进制。'}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{'下载步骤：'}</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      {'下载来源：'}
                      <a
                        href={finalDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-primary hover:underline"
                      >
                        <span>{downloadUrl ? filename : 'GitHub Release 页面'}</span>
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    </li>
                    <li>{'解压软件包'}</li>
                    <li>{'在解压目录中运行可执行文件'}</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <a
                    href={finalDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>{'下载 Windows x86_64'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={[
              `curl -L -O ${finalDownloadUrl}`,
              `unzip ${filename}`,
              "rustfs.exe --version",
            ]}
            title={'安装命令'}
          />

          <Note type="info">
            {'如需全部版本和架构，请访问 RustFS GitHub Release 页面。'}
          </Note>
        </div>
      </div>
    </div>
  );
}
