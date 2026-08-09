// Site configuration
export const SITE_CONFIG = {
  primaryDomain: 'https://rustfs.com.cn',
  secondaryDomain: 'https://rustfs.com',
  docsDomain: 'https://docs.rustfs.com.cn',
} as const

// Site meta information
export const SITE_METADATA = {
  title: "RustFS | 面向 AI 与云原生的高性能 S3 对象存储",
  description: 'RustFS 是使用 Rust 构建、采用 Apache 2.0 许可证的开源分布式对象存储系统。',
  keywords: 'RustFS, 对象存储, 分布式存储, 开源, Rust, Amazon S3, MinIO 替代方案, Apache 2.0, 云原生存储, AI 基础设施',
} as const

// Download link configuration
export const DOWNLOAD_CONFIG = {
  GITHUB_REPO: 'rustfs/rustfs',
  GITHUB_API_BASE: 'https://api.github.com/repos/rustfs/rustfs',
  RELEASE_PAGE: 'https://github.com/rustfs/rustfs/releases'
} as const

// System identifier configuration
export const SYSTEM_CONFIG = {
  WINDOWS: 'windows',
  LINUX: 'linux',
  MACOS: 'macos',
  DOCKER: 'docker'
} as const

// Version selection options
export const VERSION_CONFIG = {
  LATEST: 'latest',
  STABLE: 'stable',
  ALPHA: 'alpha',
  NIGHTLY: 'nightly'
} as const

// Download option key type
export type DownloadOptionKey = 'windows' | 'macos' | 'linux' | 'docker' | 'fallback';

// Download option interface
export interface DownloadOption {
  key: DownloadOptionKey;
  label: string;
  description: string;
}

// App configuration
export const appConfig = {
  downloads: {
    windows: 'https://dl.rustfs.com/artifacts/rustfs/rustfs-windows-x86_64-latest.zip',
    macos: 'https://dl.rustfs.com/artifacts/rustfs/rustfs-macos-aarch64-latest.zip',
    linux: 'https://dl.rustfs.com/artifacts/rustfs/rustfs-linux-x86_64-musl-latest.zip',
    docker: 'https://hub.docker.com/r/rustfs/rustfs',
    fallback: 'https://github.com/rustfs/rustfs/releases'
  },
  downloadOptions: [
    {
      key: 'windows' as DownloadOptionKey,
      label: 'Windows',
      description: '适用于 Windows 10/11'
    },
    {
      key: 'macos' as DownloadOptionKey,
      label: 'macOS',
      description: '适用于 macOS 10.15 及以上版本'
    },
    {
      key: 'linux' as DownloadOptionKey,
      label: 'Linux',
      description: '适用于多种 Linux 发行版'
    },
    {
      key: 'docker' as DownloadOptionKey,
      label: 'Docker',
      description: '使用 Docker 容器部署'
    },
    {
      key: 'fallback' as DownloadOptionKey,
      label: '其他平台',
      description: '查看全部可用版本'
    }
  ]
} as const;
