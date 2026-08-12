'use client'

import { Button } from '@/components/ui/button'
import { cn, docs_url } from '@/lib/utils'
import { formatReleaseDate, formatVersion, getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github'
import AppleIcon from '@/public/svgs/brands/apple.svg'
import DockerIcon from '@/public/svgs/brands/docker.svg'
import KubernetesIcon from '@/public/svgs/brands/kubernetes.svg'
import LinuxIcon from '@/public/svgs/brands/linux.svg'
import WindowsIcon from '@/public/svgs/brands/windows.svg'
import Link from 'next/link'
import {
    ArrowLeftIcon,
    ArrowUpRightIcon,
    BookOpenIcon,
    DownloadIcon,
    LayersIcon,
    MessageCircleIcon,
    MonitorIcon,
    ServerIcon,
    TerminalIcon,
} from 'lucide-react'
import { useState, type ComponentType, type KeyboardEvent, type ReactNode } from 'react'
import CodeBlock from './code-block'
import InstallationTopology from './installation-topology'

interface ServerDownloadPageProps {
  release: GitHubRelease | null;
}

function findReleaseAsset(
  release: GitHubRelease | null,
  patterns: RegExp[],
  fallbackName: string,
) {
  const asset = release?.assets.find((candidate) =>
    patterns.some((pattern) => pattern.test(candidate.name))
  );

  return {
    url: asset?.browser_download_url ?? release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest',
    filename: asset?.name ?? fallbackName,
    isDirect: Boolean(asset),
  };
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="mb-8 max-w-4xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProductDownloadLink({
  href,
  eyebrow,
  title,
  description,
  methods,
  Icon,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  methods: string[];
  Icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="motion-card group flex min-h-80 flex-col border border-border bg-card px-6 py-8 transition-colors hover:bg-muted/20 sm:px-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
        </div>
        <span className="motion-icon-tile flex size-11 shrink-0 items-center justify-center text-brand">
          <Icon className="size-6" />
        </span>
      </div>

      <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
        {methods.map((method) => (
          <span key={method} className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {method}
          </span>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold text-brand">
        选择安装方式
        <ArrowUpRightIcon className="motion-arrow size-4" />
      </span>
    </Link>
  );
}

function ReleasePanel({ release }: { release: GitHubRelease | null }) {
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';
  const publishedAt = release?.published_at ? formatReleaseDate(release.published_at, 'zh-CN') : 'GitHub 最新版本';
  const version = release?.tag_name ? formatVersion(release.tag_name) : '最新版';

  return (
    <a
      href={releaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="motion-card group relative block overflow-hidden border border-border bg-card/90 transition-colors hover:border-foreground/40"
      aria-label="在 GitHub 打开当前 RustFS 服务端版本"
    >
      <div className="relative p-5 sm:p-6">
        <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-brand">当前版本</span>
          <span className="h-px bg-border" />
          <span>{publishedAt}</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-4xl font-semibold leading-none text-foreground sm:text-5xl">
              {version}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              服务端二进制、Docker 镜像与源码包。
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            打开版本页面
            <ArrowUpRightIcon className="motion-arrow size-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

function ArtifactButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="h-11 w-full justify-between border-border bg-card px-4 text-sm font-semibold text-foreground dark:border-border dark:bg-card"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center gap-2">
          {icon}
          {label}
        </span>
        <DownloadIcon data-icon="inline-end" className="size-4" />
      </a>
    </Button>
  );
}

type ServerInstallPath = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bestFor: string;
  Icon: ComponentType<{ className?: string }>;
  commandTitle: string;
  command: string[];
  commands?: InstallCommand[];
  chips: string[];
  actions?: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

type InstallCommand = {
  id: string;
  label: string;
  title: string;
  command: string[];
};

function InstallCommandTabs({
  commands,
}: {
  commands: InstallCommand[];
}) {
  const [activeCommandId, setActiveCommandId] = useState(commands[0].id);
  const activeCommand =
    commands.find((command) => command.id === activeCommandId) ?? commands[0];

  return (
    <div>
      <div className="mb-3 flex border-b border-border" role="tablist" aria-label="Linux 安装方式">
        {commands.map((command) => {
          const isActive = command.id === activeCommand.id;

          return (
            <button
              key={command.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCommandId(command.id)}
              className={cn(
                "border-b-2 border-b-transparent px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground",
                isActive && "border-b-brand text-brand"
              )}
            >
              {command.label}
            </button>
          );
        })}
      </div>
      <CodeBlock
        title={activeCommand.title}
        code={activeCommand.command}
        className="border-brand/60 shadow-[0_0_0_1px_rgba(39,112,246,0.18),0_18px_60px_rgba(39,112,246,0.12)]"
      />
    </div>
  );
}

function KubernetesInstallCommands() {
  const methods = [
    {
      id: 'helm-chart',
      label: 'Helm Chart',
      title: '安装 Helm Chart',
      command: [
        'helm repo add rustfs https://charts.rustfs.com',
        'helm repo update',
        'helm install rustfs rustfs/rustfs --namespace rustfs --create-namespace',
      ],
    },
    {
      id: 'operator',
      label: 'Operator',
      title: '安装 Operator',
      command: [
        'helm repo add operator https://operator.rustfs.com',
        'helm repo update',
        'helm install operator operator/rustfs-operator --namespace rustfs-system --create-namespace',
      ],
    },
  ];
  const [activeMethodId, setActiveMethodId] = useState(methods[0].id);
  const activeMethod = methods.find((method) => method.id === activeMethodId) ?? methods[0];

  return (
    <div>
      <div className="mb-3 flex border-b border-border" role="tablist" aria-label="Kubernetes 安装方式">
        {methods.map((method) => {
          const isActive = method.id === activeMethod.id;

          return (
            <button
              key={method.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveMethodId(method.id)}
              className={cn(
                "border-b-2 border-b-transparent px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground",
                isActive && "border-b-brand text-brand"
              )}
            >
              {method.label}
            </button>
          );
        })}
      </div>
      <CodeBlock
        title={activeMethod.title}
        code={activeMethod.command}
        className="border-brand/60 shadow-[0_0_0_1px_rgba(39,112,246,0.18),0_18px_60px_rgba(39,112,246,0.12)]"
      />
    </div>
  );
}

function ServerInstallTabs({ release }: { release: GitHubRelease | null }) {
  const x86Musl = findReleaseAsset(release, [/rustfs-linux-x86_64-musl.*\.zip/i], 'rustfs-linux-x86_64-musl-latest.zip');
  const x86Gnu = findReleaseAsset(release, [/rustfs-linux-x86_64-gnu.*\.zip/i], 'rustfs-linux-x86_64-gnu-latest.zip');
  const armMusl = findReleaseAsset(release, [/rustfs-linux-aarch64-musl.*\.zip/i], 'rustfs-linux-aarch64-musl-latest.zip');
  const armGnu = findReleaseAsset(release, [/rustfs-linux-aarch64-gnu.*\.zip/i], 'rustfs-linux-aarch64-gnu-latest.zip');

  const packageBaseUrl = 'https://dl.rustfs.com/artifacts/rustfs/packages/release';
  const tagName = release?.tag_name ?? '';
  const debVersion = tagName.replace('-', '~');
  const rpmVersion = tagName.replace('-', '_');
  const debAmd64Url = tagName ? `${packageBaseUrl}/rustfs_${debVersion}_amd64.deb` : '';
  const debArm64Url = tagName ? `${packageBaseUrl}/rustfs_${debVersion}_arm64.deb` : '';
  const rpmX86Url = tagName ? `${packageBaseUrl}/rustfs-${rpmVersion}-1.x86_64.rpm` : '';
  const rpmArm64Url = tagName ? `${packageBaseUrl}/rustfs-${rpmVersion}-1.aarch64.rpm` : '';
  const debAmd64Filename = debAmd64Url.split('/').pop() ?? '';
  const rpmX86Filename = rpmX86Url.split('/').pop() ?? '';
  const macArmUrl = release
    ? getDownloadUrlForPlatform(release, 'macos', 'aarch64')
    : null;
  const macX86Url = release
    ? getDownloadUrlForPlatform(release, 'macos', 'x86_64')
    : null;
  const windowsUrl = release
    ? getDownloadUrlForPlatform(release, 'windows', 'x86_64')
    : null;
  const fallbackUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';
  const paths: ServerInstallPath[] = [
    {
      id: 'linux',
      label: 'Linux 二进制',
      title: '直接安装到服务器',
      summary: '适合以轻量原生服务运行 RustFS，并明确控制磁盘与 systemd。',
      bestFor: '适用于生产主机、裸金属与虚拟机',
      Icon: LinuxIcon,
      commandTitle: '快速验证',
      command: [
        'curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh',
      ],
      commands: [
        {
          id: 'script',
          label: '脚本',
          title: '快速验证',
          command: [
            'curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh',
          ],
        },
        ...(debAmd64Url
          ? [
              {
                id: 'deb',
                label: 'DEB',
                title: 'Debian / Ubuntu 软件包',
                command: [
                  `curl -O ${debAmd64Url}`,
                  `sudo dpkg -i ${debAmd64Filename}`,
                  'rustfs --version',
                ],
              },
            ]
          : []),
        ...(rpmX86Url
          ? [
              {
                id: 'rpm',
                label: 'RPM',
                title: 'RHEL / Fedora 软件包',
                command: [
                  `curl -O ${rpmX86Url}`,
                  `sudo rpm -ivh ${rpmX86Filename}`,
                  'rustfs --version',
                ],
              },
            ]
          : []),
      ],
      chips: ['MUSL / GNU', 'DEB / RPM', 'x86_64 / ARM64', '系统服务'],
      actions: [
        { href: x86Musl.url, label: 'x86_64 MUSL', icon: <LinuxIcon className="size-4" /> },
        { href: x86Gnu.url, label: 'x86_64 GNU', icon: <LinuxIcon className="size-4" /> },
        { href: armMusl.url, label: 'ARM64 MUSL', icon: <LinuxIcon className="size-4" /> },
        { href: armGnu.url, label: 'ARM64 GNU', icon: <LinuxIcon className="size-4" /> },
        ...(debAmd64Url ? [{ href: debAmd64Url, label: 'DEB amd64', icon: <LinuxIcon className="size-4" /> }] : []),
        ...(debArm64Url ? [{ href: debArm64Url, label: 'DEB arm64', icon: <LinuxIcon className="size-4" /> }] : []),
        ...(rpmX86Url ? [{ href: rpmX86Url, label: 'RPM x86_64', icon: <LinuxIcon className="size-4" /> }] : []),
        ...(rpmArm64Url ? [{ href: rpmArm64Url, label: 'RPM aarch64', icon: <LinuxIcon className="size-4" /> }] : []),
      ],
    },
    {
      id: 'docker',
      label: 'Docker',
      title: '运行持久化容器',
      summary: '使用 Docker 完成本地验证、S3 客户端测试，并获得干净、可随时重建的运行环境。',
      bestFor: '适用于本地开发、演示与冒烟测试',
      Icon: DockerIcon,
      commandTitle: '单节点容器',
      command: [
        'docker volume create rustfs-data',
        'docker run -d --name rustfs -p 9000:9000 -p 9001:9001 -v rustfs-data:/data rustfs/rustfs:latest /data',
        'docker logs -f rustfs',
      ],
      chips: ['9000 S3 API', '9001 控制台', '/data 数据卷'],
    },
    {
      id: 'compose',
      label: 'Compose',
      title: '维护可重复的实验环境',
      summary: '当配置需要纳入版本控制并供团队成员重复使用时，选择 Compose。',
      bestFor: '适用于团队实验与可复现本地环境',
      Icon: LayersIcon,
      commandTitle: 'Compose 环境',
      command: [
        'mkdir rustfs-compose && cd rustfs-compose',
        'curl -O https://rustfs.com/docker-compose.yml',
        'docker compose up -d',
      ],
      chips: ['compose.yml', '命名数据卷', '固定端口'],
    },
    {
      id: 'kubernetes',
      label: 'Kubernetes',
      title: '使用 Helm 安装',
      summary: '使用 Helm 完成云原生部署、GitOps 评审与可重复集群配置。',
      bestFor: '适用于 Kubernetes、GitOps 与集群发布',
      Icon: KubernetesIcon,
      commandTitle: 'Helm 安装',
      command: [
        'helm repo add rustfs https://charts.rustfs.com',
        'helm repo update',
        'helm install rustfs rustfs/rustfs --namespace rustfs --create-namespace',
      ],
      chips: ['StatefulSet', 'PVC 持久化', '支持 Ingress'],
    },
    {
      id: 'workstation',
      label: 'macOS / Windows',
      title: '在工作站上验证',
      summary: '使用工作站二进制进行客户端测试、演示，以及 Linux 服务器之外的兼容性检查。',
      bestFor: '适用于客户端验证与隔离测试',
      Icon: MonitorIcon,
      commandTitle: 'macOS Homebrew',
      command: [
        'brew tap rustfs/homebrew-tap',
        'brew install rustfs',
        'rustfs --version',
      ],
      chips: ['macOS', 'Windows', 'Apple Silicon'],
      actions: [
        { href: macArmUrl ?? fallbackUrl, label: 'Apple Silicon', icon: <AppleIcon className="size-4" /> },
        { href: macX86Url ?? fallbackUrl, label: 'macOS Intel', icon: <AppleIcon className="size-4" /> },
        { href: windowsUrl ?? fallbackUrl, label: 'Windows x86_64', icon: <WindowsIcon className="size-4" /> },
      ],
    },
  ];
  const [activePathId, setActivePathId] = useState(paths[0].id);
  const activePath = paths.find((path) => path.id === activePathId) ?? paths[0];
  const ActiveIcon = activePath.Icon;

  const handlePathKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % paths.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + paths.length) % paths.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = paths.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActivePathId(paths[nextIndex].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="overflow-x-auto border-b border-border bg-background/40">
        <div className="flex min-w-max" role="tablist" aria-label="服务端安装路径">
          {paths.map((path, index) => {
            const Icon = path.Icon;
            const isActive = path.id === activePath.id;

            return (
              <button
                key={path.id}
                type="button"
                role="tab"
                id={`install-path-tab-${path.id}`}
                aria-selected={isActive}
                aria-controls={`install-path-${path.id}`}
                onClick={() => setActivePathId(path.id)}
                onKeyDown={(event) => handlePathKeyDown(event, index)}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "group flex min-h-14 items-center gap-2 border-b-2 border-b-transparent px-5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground",
                  isActive && "border-b-brand bg-brand/10 text-brand"
                )}
              >
                <Icon className="size-4" />
                {path.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`install-path-${activePath.id}`}
        role="tabpanel"
        aria-labelledby={`install-path-tab-${activePath.id}`}
        className="min-w-0"
      >
        <div className="grid gap-6 border-b border-border p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="motion-icon-tile flex size-5 items-center justify-center text-brand">
                <ActiveIcon className="size-4" />
              </span>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{activePath.label}</p>
            </div>
            <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{activePath.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{activePath.summary}</p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{activePath.bestFor}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 lg:max-w-72 lg:justify-end">
            {activePath.chips.map((chip) => (
              <span key={chip} className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-6">
          {activePath.commands ? (
            <InstallCommandTabs commands={activePath.commands} />
          ) : activePath.id === 'kubernetes' ? (
            <KubernetesInstallCommands />
          ) : (
            <CodeBlock
              title={activePath.commandTitle}
              code={activePath.command}
              className="border-brand/60 shadow-[0_0_0_1px_rgba(39,112,246,0.18),0_18px_60px_rgba(39,112,246,0.12)]"
            />
          )}

          {activePath.actions ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {activePath.actions.map((action) => (
                <ArtifactButton
                  key={action.label}
                  href={action.href}
                  label={action.label}
                  icon={action.icon}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function HelpPanel() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="支持入口"
          title="需要生产部署方案？"
          description="通过文档、社区帮助或直接规划支持，从本地验证走向生产环境。"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="https://docs.rustfs.com/zh/"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-72 flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30 sm:p-7"
          >
            <BookOpenIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">阅读文档</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">查看配置、部署、S3 客户端与运维指南。</p>
            <ArrowUpRightIcon className="motion-arrow mt-auto size-5 text-brand" />
          </a>
          <a
            href="https://github.com/rustfs/rustfs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-72 flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30 sm:p-7"
          >
            <MessageCircleIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">报告问题</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">反馈兼容性、安装问题或运维疑问。</p>
            <ArrowUpRightIcon className="motion-arrow mt-auto size-5 text-brand" />
          </a>
          <a
            href="https://discord.gg/NcKBCEJp6P"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-72 flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30 sm:p-7"
          >
            <ServerIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">加入 Discord</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">与 RustFS 社区讨论安装、运维与迁移问题。</p>
            <ArrowUpRightIcon className="motion-arrow mt-auto size-5 text-brand" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function DownloadPageClient() {
  return (
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="w-full font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              下载 RustFS
            </h1>
            <p className="mt-5 w-full text-sm leading-7 text-muted-foreground">
              先选择产品，再根据运行环境选择合适的安装路径。
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <ProductDownloadLink
              href="/download/server"
              eyebrow="数据服务"
              title="RustFS 服务端"
              description="服务端二进制、Docker 镜像与源码包。"
              methods={['Linux', 'DEB / RPM', 'Docker', 'Compose', 'Kubernetes', 'macOS', 'Windows']}
              Icon={ServerIcon}
            />
            <ProductDownloadLink
              href="/download/cli"
              eyebrow="管理 CLI"
              title="RustFS CLI 客户端（rc）"
              description="使用 rc 管理存储桶、对象、集群、身份与运维工作流。"
              methods={['Homebrew', 'Scoop', 'Linux', 'macOS', 'Windows', 'Docker', 'Source']}
              Icon={TerminalIcon}
            />
          </div>

          <p className="mt-8 text-center text-sm font-semibold text-muted-foreground">
            需要帮助？{' '}
            <Link href="/contact" className="text-brand transition-colors hover:text-foreground">
              联系我们的团队 →
            </Link>
          </p>
        </div>
      </section>

      <HelpPanel />
    </main>
  );
}

export function ServerDownloadPage({ release }: ServerDownloadPageProps) {
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';

  return (
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            全部下载
          </Link>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              RustFS 服务端
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
              从小规模开始，沿用同一套运维模式扩展。
            </p>
          </div>

          <div className="mt-12">
            <ReleasePanel release={release} />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServerInstallTabs release={release} />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">想浏览全部版本产物？</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">需要旧版本、校验和或非默认软件包时，请前往 GitHub。</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" size="lg" className="h-11 px-4 text-sm font-semibold">
                <a href={releaseUrl} target="_blank" rel="noopener noreferrer">
                  版本页面
                  <ArrowUpRightIcon data-icon="inline-end" className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 px-4 text-sm font-semibold">
                <a href={docs_url('/installation/')} target="_blank" rel="noopener noreferrer">
                  文档
                  <BookOpenIcon data-icon="inline-end" className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <aside className="mt-8 border border-border bg-muted/30 p-5 sm:p-6" aria-labelledby="server-install-notes">
            <h2 id="server-install-notes" className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              注意事项
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>
                请立即修改 <code className="text-foreground">RUSTFS_ACCESS_KEY</code> 和{' '}
                <code className="text-foreground">RUSTFS_SECRET_KEY</code>。禁止使用默认值{' '}
                <code className="text-foreground">rustfsadmin</code>。
              </li>
              <li>
                详细安装步骤请参阅{' '}
                <a
                  href={docs_url('/installation/')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:text-foreground"
                >
                  安装文档
                </a>
                .
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <InstallationTopology />
    </main>
  );
}
