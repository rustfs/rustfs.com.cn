'use client'

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FileCogIcon,
  HardDriveIcon,
  KeyRoundIcon,
  LifeBuoyIcon,
  LinkIcon,
  LockKeyholeIcon,
  NetworkIcon,
  RotateCcwIcon,
  ScrollTextIcon,
  Settings2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Note from "@/app/download/components/common/note";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

const KMS_BACKENDS = ["local", "vault"] as const;
type KmsBackend = (typeof KMS_BACKENDS)[number];

interface ConfigState {
  s3Port: string;
  consolePort: string;
  volumes: string;
  accessKey: string;
  secretKey: string;
  consoleEnabled: boolean;
  logLevel: LogLevel;
  logDirectory: string;
  otelEnabled: boolean;
  otelEndpoint: string;
  virtualHostEnabled: boolean;
  serverDomains: string;
  storageClassStandard: string;
  kmsEnabled: boolean;
  kmsBackend: KmsBackend;
  kmsKeyDir: string;
  kmsLocalMasterKey: string;
  kmsVaultAddress: string;
  kmsVaultToken: string;
  kmsVaultMountPath: string;
}

const DEFAULT_CONFIG: ConfigState = {
  s3Port: "9000",
  consolePort: "9001",
  volumes: "/data",
  accessKey: "<your access key>",
  secretKey: "<your secret key>",
  consoleEnabled: true,
  logLevel: "error",
  logDirectory: "/var/log/rustfs",
  otelEnabled: true,
  otelEndpoint: "http://localhost:4318",
  virtualHostEnabled: false,
  serverDomains: "",
  storageClassStandard: "",
  kmsEnabled: false,
  kmsBackend: "local",
  kmsKeyDir: "<your kms key dir>",
  kmsLocalMasterKey: "<your kms local master key>",
  kmsVaultAddress: "http://localhost:8200",
  kmsVaultToken: "<your-vault-token>",
  kmsVaultMountPath: "transit",
};

const QUERY_KEYS: Record<keyof ConfigState, string> = {
  s3Port: "s3_port",
  consolePort: "console_port",
  volumes: "volumes",
  accessKey: "access_key",
  secretKey: "secret_key",
  consoleEnabled: "console_enabled",
  logLevel: "log_level",
  logDirectory: "log_directory",
  otelEnabled: "otel_enabled",
  otelEndpoint: "otel_endpoint",
  virtualHostEnabled: "virtual_host_enabled",
  serverDomains: "server_domains",
  storageClassStandard: "storage_class",
  kmsEnabled: "kms_enabled",
  kmsBackend: "kms_backend",
  kmsKeyDir: "kms_key_dir",
  kmsLocalMasterKey: "kms_local_master_key",
  kmsVaultAddress: "kms_vault_address",
  kmsVaultToken: "kms_vault_token",
  kmsVaultMountPath: "kms_vault_mount_path",
};

const isPort = (value: string) =>
  /^\d{1,5}$/.test(value) && Number(value) >= 1 && Number(value) <= 65535;

// Quote values containing shell-sensitive characters so the file stays valid in systemd.
const formatEnvValue = (value: string) => {
  if (/[\s"'$`\\=]/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
};

export default function RustfsConfigGenerator() {
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const update = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const frame = window.requestAnimationFrame(() => {
      setConfig((current) => ({
        ...current,
        s3Port: params.get(QUERY_KEYS.s3Port) ?? current.s3Port,
        consolePort: params.get(QUERY_KEYS.consolePort) ?? current.consolePort,
        volumes: params.get(QUERY_KEYS.volumes) ?? current.volumes,
        accessKey: params.get(QUERY_KEYS.accessKey) ?? current.accessKey,
        secretKey: params.get(QUERY_KEYS.secretKey) ?? current.secretKey,
        consoleEnabled:
          params.get(QUERY_KEYS.consoleEnabled) === null
            ? current.consoleEnabled
            : params.get(QUERY_KEYS.consoleEnabled) === "true",
        logLevel:
          (params.get(QUERY_KEYS.logLevel) as LogLevel | null) ?? current.logLevel,
        logDirectory: params.get(QUERY_KEYS.logDirectory) ?? current.logDirectory,
        otelEnabled:
          params.get(QUERY_KEYS.otelEnabled) === null
            ? current.otelEnabled
            : params.get(QUERY_KEYS.otelEnabled) === "true",
        otelEndpoint: params.get(QUERY_KEYS.otelEndpoint) ?? current.otelEndpoint,
        virtualHostEnabled:
          params.get(QUERY_KEYS.virtualHostEnabled) === null
            ? current.virtualHostEnabled
            : params.get(QUERY_KEYS.virtualHostEnabled) === "true",
        serverDomains: params.get(QUERY_KEYS.serverDomains) ?? current.serverDomains,
        storageClassStandard:
          params.get(QUERY_KEYS.storageClassStandard) ?? current.storageClassStandard,
        kmsEnabled:
          params.get(QUERY_KEYS.kmsEnabled) === null
            ? current.kmsEnabled
            : params.get(QUERY_KEYS.kmsEnabled) === "true",
        kmsBackend:
          (params.get(QUERY_KEYS.kmsBackend) as KmsBackend | null) ?? current.kmsBackend,
        kmsKeyDir: params.get(QUERY_KEYS.kmsKeyDir) ?? current.kmsKeyDir,
        kmsLocalMasterKey:
          params.get(QUERY_KEYS.kmsLocalMasterKey) ?? current.kmsLocalMasterKey,
        kmsVaultAddress:
          params.get(QUERY_KEYS.kmsVaultAddress) ?? current.kmsVaultAddress,
        kmsVaultToken: params.get(QUERY_KEYS.kmsVaultToken) ?? current.kmsVaultToken,
        kmsVaultMountPath:
          params.get(QUERY_KEYS.kmsVaultMountPath) ?? current.kmsVaultMountPath,
      }));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const validationError = useMemo(() => {
    if (!isPort(config.s3Port)) {
      return "S3 API 端口必须是 1 到 65535 之间的数字。";
    }
    if (!isPort(config.consolePort)) {
      return "控制台端口必须是 1 到 65535 之间的数字。";
    }
    if (!config.volumes.trim()) {
      return "存储卷路径必填（例如 /data）。";
    }
    if (!config.accessKey.trim()) {
      return "访问密钥必填。";
    }
    if (!config.secretKey.trim()) {
      return "私有密钥必填。";
    }
    if (!config.logDirectory.trim()) {
      return "日志目录必填。";
    }
    if (config.otelEnabled && !config.otelEndpoint.trim()) {
      return "启用 OTEL 时需要填写端点地址。";
    }
    if (config.virtualHostEnabled && !config.serverDomains.trim()) {
      return "启用虚拟主机模式时需要填写服务器域名。";
    }
    if (config.kmsEnabled) {
      if (config.kmsBackend === "local") {
        if (!config.kmsKeyDir.trim()) {
          return "KMS 密钥目录必填。";
        }
        if (!config.kmsLocalMasterKey.trim()) {
          return "KMS 本地主密钥必填。";
        }
      } else {
        if (!config.kmsVaultAddress.trim()) {
          return "KMS Vault 地址必填。";
        }
        if (!config.kmsVaultToken.trim()) {
          return "KMS Vault 令牌必填。";
        }
        if (!config.kmsVaultMountPath.trim()) {
          return "KMS Vault 挂载路径必填。";
        }
      }
    }
    return null;
  }, [config]);

  const configFile = useMemo(() => {
    const lines = [
      "# RustFS configuration file",
      "# Generated by https://rustfs.com.cn/rustfs-config-generator",
      `RUSTFS_ADDRESS=":${config.s3Port.trim()}"`,
      `RUSTFS_CONSOLE_ADDRESS=":${config.consolePort.trim()}"`,
    ];

    if (config.virtualHostEnabled) {
      lines.push(`RUSTFS_SERVER_DOMAINS=${formatEnvValue(config.serverDomains.trim())}`);
    }

    lines.push(
      `RUSTFS_VOLUMES=${formatEnvValue(config.volumes.trim())}`,
      `RUSTFS_ACCESS_KEY=${formatEnvValue(config.accessKey.trim())}`,
      `RUSTFS_SECRET_KEY=${formatEnvValue(config.secretKey.trim())}`
    );

    if (config.storageClassStandard.trim()) {
      lines.push(
        `RUSTFS_STORAGE_CLASS_STANDARD=${formatEnvValue(config.storageClassStandard.trim())}`
      );
    }

    if (config.kmsEnabled) {
      lines.push("RUSTFS_KMS_ENABLE=true");
      if (config.kmsBackend === "local") {
        lines.push(
          "RUSTFS_KMS_BACKEND=local",
          `RUSTFS_KMS_KEY_DIR=${formatEnvValue(config.kmsKeyDir.trim())}`,
          `RUSTFS_KMS_LOCAL_MASTER_KEY=${formatEnvValue(config.kmsLocalMasterKey.trim())}`
        );
      } else {
        lines.push(
          "RUSTFS_KMS_BACKEND=vault",
          `RUSTFS_KMS_VAULT_ADDRESS=${formatEnvValue(config.kmsVaultAddress.trim())}`,
          `RUSTFS_KMS_VAULT_TOKEN=${formatEnvValue(config.kmsVaultToken.trim())}`,
          `RUSTFS_KMS_VAULT_MOUNT_PATH=${formatEnvValue(config.kmsVaultMountPath.trim())}`
        );
      }
    }

    lines.push(
      `RUSTFS_CONSOLE_ENABLE=${config.consoleEnabled}`,
      `RUSTFS_OBS_LOGGER_LEVEL=${config.logLevel}`,
      `RUSTFS_OBS_LOG_DIRECTORY=${formatEnvValue(config.logDirectory.trim())}`
    );

    if (config.otelEnabled) {
      lines.push(
        `RUSTFS_OBS_ENDPOINT=${formatEnvValue(config.otelEndpoint.trim())}`
      );
    }

    return lines.join("\n");
  }, [config]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configFile);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([configFile], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rustfs.conf";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setCopied(false);
    setLinkCopied(false);
  };

  const handleCopyShareLink = async () => {
    setLinkCopied(false);
    const params = new URLSearchParams({
      [QUERY_KEYS.s3Port]: config.s3Port,
      [QUERY_KEYS.consolePort]: config.consolePort,
      [QUERY_KEYS.volumes]: config.volumes,
      [QUERY_KEYS.accessKey]: config.accessKey,
      [QUERY_KEYS.secretKey]: config.secretKey,
      [QUERY_KEYS.consoleEnabled]: String(config.consoleEnabled),
      [QUERY_KEYS.logLevel]: config.logLevel,
      [QUERY_KEYS.logDirectory]: config.logDirectory,
      [QUERY_KEYS.otelEnabled]: String(config.otelEnabled),
      [QUERY_KEYS.otelEndpoint]: config.otelEndpoint,
      [QUERY_KEYS.virtualHostEnabled]: String(config.virtualHostEnabled),
      [QUERY_KEYS.serverDomains]: config.serverDomains,
      [QUERY_KEYS.storageClassStandard]: config.storageClassStandard,
      [QUERY_KEYS.kmsEnabled]: String(config.kmsEnabled),
      [QUERY_KEYS.kmsBackend]: config.kmsBackend,
      [QUERY_KEYS.kmsKeyDir]: config.kmsKeyDir,
      [QUERY_KEYS.kmsLocalMasterKey]: config.kmsLocalMasterKey,
      [QUERY_KEYS.kmsVaultAddress]: config.kmsVaultAddress,
      [QUERY_KEYS.kmsVaultToken]: config.kmsVaultToken,
      [QUERY_KEYS.kmsVaultMountPath]: config.kmsVaultMountPath,
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
    } catch {
      setLinkCopied(false);
    }
  };

  const fieldClass = "mt-3 h-11 bg-background font-mono text-base";

  return (
    <div className="relative z-10 py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            在部署前生成 RustFS 配置文件
          </h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">
            回答几个问题，即可生成可直接使用的{" "}
            <code className="rounded-none border border-border bg-background px-1.5 py-0.5 font-mono text-xs text-foreground">
              /etc/default/rustfs
            </code>{" "}
            文件——端口、存储卷、凭据、日志与 OpenTelemetry 一应俱全。
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-card px-5 py-6">
            <NetworkIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              S3 API 端口
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">
              {isPort(config.s3Port) ? `:${config.s3Port}` : "--"}
            </div>
          </div>
          <div className="border border-border bg-card px-5 py-6">
            <Settings2Icon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              控制台端口
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">
              {isPort(config.consolePort) ? `:${config.consolePort}` : "--"}
            </div>
          </div>
          <div className="border border-border bg-card px-5 py-6">
            <ScrollTextIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              日志级别
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">
              {config.logLevel}
            </div>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)]">
          <section className="flex flex-col border border-border bg-card">
            <div className="border-b border-border px-6 py-6">
              <h2 className="text-lg font-semibold text-foreground">
                配置输入
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                所有值直接映射到 RustFS 读取的环境变量。
              </p>
            </div>

            {validationError ? (
              <div className="border-b border-destructive/40 bg-destructive/10 px-6 py-4 text-sm text-destructive">
                {validationError}
              </div>
            ) : null}

            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <NetworkIcon className="size-4 text-brand" />
                网络
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    S3 API 端口
                  </span>
                  <Input
                    type="number"
                    min={1}
                    max={65535}
                    value={config.s3Port}
                    onChange={(event) => update("s3Port", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_ADDRESS
                  </span>
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    控制台端口
                  </span>
                  <Input
                    type="number"
                    min={1}
                    max={65535}
                    value={config.consolePort}
                    onChange={(event) => update("consolePort", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_CONSOLE_ADDRESS
                  </span>
                </label>
              </div>
              <div className="mt-5 grid gap-5">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.virtualHostEnabled}
                    onChange={(event) => update("virtualHostEnabled", event.target.checked)}
                    className="size-4 accent-brand"
                  />
                  <span className="text-sm font-medium text-foreground">
                    启用虚拟主机模式
                  </span>
                </label>
                {config.virtualHostEnabled ? (
                  <label className="block">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      服务器域名
                    </span>
                    <Input
                      value={config.serverDomains}
                      placeholder="rustfs.example.com"
                      onChange={(event) => update("serverDomains", event.target.value)}
                      className={fieldClass}
                    />
                    <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                      RUSTFS_SERVER_DOMAINS
                    </span>
                  </label>
                ) : null}
              </div>
            </div>

            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <HardDriveIcon className="size-4 text-brand" />
                存储
              </div>
              <div className="mt-5 grid gap-4">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    存储卷
                  </span>
                  <Input
                    value={config.volumes}
                    onChange={(event) => update("volumes", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_VOLUMES
                  </span>
                </label>
                <Note type="info">
                  <p>
                    VOLUMES 的值取决于您的安装拓扑，请参阅我们的{" "}
                    <span className="whitespace-nowrap">
                      <Link
                        href="/download#topology"
                        className="font-semibold text-brand underline underline-offset-4 transition-colors hover:text-foreground"
                      >
                        安装拓扑选择
                      </Link>
                    </span>
                  </p>
                </Note>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    纠删码 (EC)
                  </span>
                  <Input
                    value={config.storageClassStandard}
                    placeholder="EC:2"
                    onChange={(event) => update("storageClassStandard", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_STORAGE_CLASS_STANDARD
                  </span>
                </label>
                <Note type="tip">
                  <p>
                    最佳 EC 配置？查看我们的{" "}
                    <Link
                      href="/erasure-code-calculator"
                      className="font-semibold text-brand underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                      纠删码计算器
                    </Link>
                    .
                  </p>
                </Note>
              </div>
            </div>

            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <KeyRoundIcon className="size-4 text-brand" />
                凭据
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    访问密钥
                  </span>
                  <Input
                    value={config.accessKey}
                    onChange={(event) => update("accessKey", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_ACCESS_KEY
                  </span>
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    私有密钥
                  </span>
                  <Input
                    value={config.secretKey}
                    onChange={(event) => update("secretKey", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_SECRET_KEY
                  </span>
                </label>
              </div>
              <Note type="warning" className="mt-5">
                请勿使用 rustfsadmin。启动服务器前，请设置强且唯一的访问密钥与私有密钥。
              </Note>
            </div>

            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <LockKeyholeIcon className="size-4 text-brand" />
                密钥管理 (KMS)
              </div>
              <div className="mt-5 grid gap-5">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.kmsEnabled}
                    onChange={(event) => update("kmsEnabled", event.target.checked)}
                    className="size-4 accent-brand"
                  />
                  <span className="text-sm font-medium text-foreground">
                    启用 KMS
                  </span>
                </label>
                {config.kmsEnabled ? (
                  <>
                    <label className="block">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        KMS 后端
                      </span>
                      <Select
                        value={config.kmsBackend}
                        onValueChange={(value) => update("kmsBackend", value as KmsBackend)}
                      >
                        <SelectTrigger className="mt-3 h-11 w-full bg-background font-mono text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {KMS_BACKENDS.map((backend) => (
                              <SelectItem key={backend} value={backend}>
                                {backend}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                        RUSTFS_KMS_BACKEND
                      </span>
                    </label>
                    {config.kmsBackend === "local" ? (
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            KMS 密钥目录
                          </span>
                          <Input
                            value={config.kmsKeyDir}
                            onChange={(event) => update("kmsKeyDir", event.target.value)}
                            className={fieldClass}
                          />
                          <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                            RUSTFS_KMS_KEY_DIR
                          </span>
                        </label>
                        <label className="block">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            本地主密钥
                          </span>
                          <Input
                            value={config.kmsLocalMasterKey}
                            onChange={(event) => update("kmsLocalMasterKey", event.target.value)}
                            className={fieldClass}
                          />
                          <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                            RUSTFS_KMS_LOCAL_MASTER_KEY
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="grid gap-5">
                        <label className="block">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Vault 地址
                          </span>
                          <Input
                            value={config.kmsVaultAddress}
                            onChange={(event) => update("kmsVaultAddress", event.target.value)}
                            className={fieldClass}
                          />
                          <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                            RUSTFS_KMS_VAULT_ADDRESS
                          </span>
                        </label>
                        <label className="block">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Vault 令牌
                          </span>
                          <Input
                            value={config.kmsVaultToken}
                            onChange={(event) => update("kmsVaultToken", event.target.value)}
                            className={fieldClass}
                          />
                          <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                            RUSTFS_KMS_VAULT_TOKEN
                          </span>
                        </label>
                        <label className="block">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Vault 挂载路径
                          </span>
                          <Input
                            value={config.kmsVaultMountPath}
                            onChange={(event) => update("kmsVaultMountPath", event.target.value)}
                            className={fieldClass}
                          />
                          <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                            RUSTFS_KMS_VAULT_MOUNT_PATH
                          </span>
                        </label>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>

            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Settings2Icon className="size-4 text-brand" />
                运行时
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.consoleEnabled}
                    onChange={(event) => update("consoleEnabled", event.target.checked)}
                    className="size-4 accent-brand"
                  />
                  <span className="text-sm font-medium text-foreground">
                    启用控制台
                  </span>
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    日志级别
                  </span>
                  <Select
                    value={config.logLevel}
                    onValueChange={(value) => update("logLevel", value as LogLevel)}
                  >
                    <SelectTrigger className="mt-3 h-11 w-full bg-background font-mono text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {LOG_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_OBS_LOGGER_LEVEL
                  </span>
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    日志目录
                  </span>
                  <Input
                    value={config.logDirectory}
                    onChange={(event) => update("logDirectory", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_OBS_LOG_DIRECTORY
                  </span>
                </label>
              </div>
            </div>

            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <ScrollTextIcon className="size-4 text-brand" />
                可观测性
              </div>
              <div className="mt-5 grid gap-5">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.otelEnabled}
                    onChange={(event) => update("otelEnabled", event.target.checked)}
                    className="size-4 accent-brand"
                  />
                  <span className="text-sm font-medium text-foreground">
                    配置 OpenTelemetry
                  </span>
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    OTEL 端点
                  </span>
                  <Input
                    value={config.otelEndpoint}
                    disabled={!config.otelEnabled}
                    onChange={(event) => update("otelEndpoint", event.target.value)}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-mono text-[10px] text-muted-foreground">
                    RUSTFS_OBS_ENDPOINT
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-auto grid gap-8 px-6 py-6 md:grid-cols-[1fr_0.92fr]">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  部署说明
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border pb-3">
                    <span className="text-muted-foreground">配置文件路径</span>
                    <span className="font-mono text-xs font-medium text-foreground">
                      /etc/default/rustfs
                    </span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border pb-3">
                    <span className="text-muted-foreground">凭据</span>
                    <span className="font-medium text-foreground">必须唯一</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <span className="text-muted-foreground">文件权限</span>
                    <span className="font-mono text-xs font-medium text-foreground">
                      chmod 600
                    </span>
                  </div>
                </div>
                <Note type="info" className="mt-4">
                  <p>
                    For detailed usage of each configuration, refer to the{" "}
                    <Link
                      href="https://docs.rustfs.com/zh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                      official documentation
                    </Link>
                    .
                  </p>
                </Note>
              </div>
              <div className="flex flex-col border-l border-border pl-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LifeBuoyIcon className="size-4 text-brand" />
                  需要部署评审？
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  在生产环境部署前，与 RustFS 团队分享您的拓扑、存储卷布局与可观测性目标。
                </p>
                <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                  <a href="/contact-us">
                    联系我们
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section className="border border-border bg-card lg:sticky lg:top-24">
            <div className="border-b border-border px-6 py-6">
              <div className="flex items-center gap-2">
                <FileCogIcon className="size-5 text-brand" />
                <h2 className="text-lg font-semibold text-foreground">
                  配置输出
                </h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                复制此文件到 /etc/default/rustfs 并重启服务。
              </p>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                /etc/default/rustfs
              </div>
              <pre className="mt-3 max-h-96 overflow-auto border border-border bg-background p-4 font-mono text-xs leading-6 text-foreground">
                {configFile}
              </pre>

              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                默认值遵循 RustFS 官方安装模板。启动服务器前，请将访问密钥与私有密钥占位符替换为强且唯一的凭据。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" onClick={handleCopy} className="min-w-28">
                  {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                  {copied ? "已复制" : "复制配置"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownload}
                  className="min-w-28"
                >
                  <DownloadIcon className="size-4" />
                  下载
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="min-w-28"
                >
                  <RotateCcwIcon className="size-4" />
                  重置
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyShareLink}
                  className="min-w-32"
                >
                  {linkCopied ? <CheckIcon className="size-4" /> : <LinkIcon className="size-4" />}
                  {linkCopied ? "已复制" : "复制链接"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
