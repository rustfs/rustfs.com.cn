'use client'

import { cn } from "@/lib/utils";
import { type PlatformInfoData } from "./platform-info";

interface WindowsDownloadSectionProps {
  platform: PlatformInfoData;
  className?: string;
}

export default function WindowsDownloadSection({ platform, className }: WindowsDownloadSectionProps) {
  
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
        <div className="opacity-50">{platform.icon}</div>
      </div>
      <h2 className="text-2xl font-bold text-muted-foreground mb-2">{platform.name}</h2>
      <p className="text-muted-foreground mb-4">{'即将推出'}</p>
      <div className="max-w-md mx-auto p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
        <p className="text-sm text-muted-foreground">
          {'我们正在为您准备这个平台'}
        </p>
      </div>
    </div>
  );
}
