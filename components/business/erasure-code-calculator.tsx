'use client'

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  DatabaseIcon,
  DownloadIcon,
  HardDriveIcon,
  LinkIcon,
  LifeBuoyIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const niceBytes = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    return `0 ${units[4]}`;
  }

  let unitIndex = 0;
  let number = value;

  while (number >= 1024 && unitIndex < units.length - 1) {
    number /= 1024;
    unitIndex += 1;
  }

  const precision = number < 10 && unitIndex > 0 ? 1 : 0;
  return `${number.toFixed(precision)} ${units[unitIndex]}`;
};

const getBytes = (value: number, unit: string) => {
  const index = units.findIndex((item) => item === unit);
  if (index === -1) {
    return 0;
  }
  return value * Math.pow(1024, index);
};

const calculateStripeSizes = (servers: number, drivesPerServer: number) => {
  let numServersPerShard = servers;
  let numShards = 1;

  for (let index = 1; index <= 16; index += 1) {
    if (servers % index === 0) {
      numServersPerShard = index;
      numShards = servers / index;
    }
  }

  if (numServersPerShard <= 3) {
    return {
      stripeSizes: [] as number[],
      numServersPerShard,
      numShards,
      error: "高可用场景建议至少使用 4 台服务器。",
    };
  }

  let stripeSizes: number[] = [];

  if (numShards === 1) {
    let multiplier = 1;
    let stripeSize = numServersPerShard * multiplier;

    while (stripeSize <= 16) {
      if ((numServersPerShard * drivesPerServer) % stripeSize === 0) {
        stripeSizes.push(stripeSize);
      }
      multiplier += 1;
      stripeSize = numServersPerShard * multiplier;
    }
  } else {
    stripeSizes = [numServersPerShard];
  }

  if (stripeSizes.length > 1) {
    stripeSizes = stripeSizes.sort((a, b) => b - a);
  }

  return {
    stripeSizes,
    numServersPerShard,
    numShards,
    error: null as string | null,
  };
};

const calculateParityOptions = (stripeSize: number) => {
  const options: number[] = [];
  let size = stripeSize;

  while (size >= 4) {
    if (size % 2 === 0) {
      options.push(size / 2);
    }
    size -= 1;
  }

  return options;
};

const formatIntegerInput = (raw: string): string => {
  if (raw === "") return "";
  const n = Number(raw);
  if (!Number.isFinite(n)) return "";
  return String(Math.floor(n));
};

export default function ErasureCodeCalculator() {
  const [servers, setServers] = useState(8);
  const [serversInput, setServersInput] = useState<string | null>(null);
  const [drivesPerServer, setDrivesPerServer] = useState(16);
  const [drivesPerServerInput, setDrivesPerServerInput] = useState<string | null>(null);
  const [driveCapacity, setDriveCapacity] = useState(8);
  const [driveCapacityInput, setDriveCapacityInput] = useState<string | null>(null);
  const [stripeSize, setStripeSize] = useState(16);
  const [parity, setParity] = useState(4);
  const [shareCopied, setShareCopied] = useState(false);
  const [exportBusy, setExportBusy] = useState(false);
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  const totalDrives = servers * drivesPerServer;

  const stripeInfo = useMemo(() => {
    if (!Number.isFinite(drivesPerServer) || drivesPerServer < 1 || drivesPerServer > 256) {
      return {
        stripeSizes: [] as number[],
        numServersPerShard: 0,
        numShards: 0,
        error: "每台服务器的磁盘数必须在 1 到 256 之间。",
      };
    }

    if (!Number.isFinite(driveCapacity) || driveCapacity < 1) {
      return {
        stripeSizes: [] as number[],
        numServersPerShard: 0,
        numShards: 0,
        error: "单盘容量必须至少为 1 TiB。",
      };
    }

    return calculateStripeSizes(servers, drivesPerServer);
  }, [servers, drivesPerServer, driveCapacity]);

  const parityOptions = useMemo(() => {
    if (stripeInfo.error || stripeSize <= 0) {
      return [] as number[];
    }

    if (totalDrives < 4) {
      return [] as number[];
    }

    return calculateParityOptions(stripeSize);
  }, [stripeInfo.error, stripeSize, totalDrives]);

  const validationError = useMemo(() => {
    if (stripeInfo.error) {
      return stripeInfo.error;
    }

    if (totalDrives < 4) {
      return "请指定总磁盘数不少于 4 的配置。";
    }

    if (stripeSize > 0 && parityOptions.length === 0) {
      return "配置无效，请尝试其他组合。";
    }

    return null as string | null;
  }, [stripeInfo.error, totalDrives, stripeSize, parityOptions.length]);

  const recommendedConfig = useMemo(() => {
    const stripeSizesSource =
      stripeInfo.stripeSizes.length > 0
        ? stripeInfo
        : (() => {
            const serversCorrected = Math.max(4, servers);
            const drivesCorrected = Math.min(256, Math.max(1, drivesPerServer));
            return calculateStripeSizes(serversCorrected, drivesCorrected);
          })();

    if (stripeSizesSource.stripeSizes.length === 0) {
      return null;
    }

    const recommendedStripe = Math.max(...stripeSizesSource.stripeSizes);
    const recommendedParityOptions = calculateParityOptions(recommendedStripe);
    const recommendedParity =
      recommendedParityOptions.includes(4)
        ? 4
        : recommendedParityOptions[0] ?? 0;

    if (stripeInfo.stripeSizes.length > 0) {
      return { stripe: recommendedStripe, parity: recommendedParity };
    }

    const serversCorrected = Math.max(4, servers);
    const drivesCorrected = Math.min(256, Math.max(1, drivesPerServer));
    return {
      stripe: recommendedStripe,
      parity: recommendedParity,
      serversCorrected,
      drivesCorrected,
    };
  }, [stripeInfo, servers, drivesPerServer]);

  useEffect(() => {
    let nextStripeSize: number | null = null;

    if (stripeInfo.stripeSizes.length === 0) {
      nextStripeSize = 0;
    } else if (!stripeInfo.stripeSizes.includes(stripeSize)) {
      nextStripeSize = stripeInfo.stripeSizes[0];
    }

    if (nextStripeSize === null) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setStripeSize(nextStripeSize);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [stripeInfo.stripeSizes, stripeSize]);

  useEffect(() => {
    let nextParity: number | null = null;

    if (parityOptions.length === 0) {
      nextParity = 0;
    } else if (!parityOptions.includes(parity)) {
      nextParity = totalDrives >= 16 && parityOptions.includes(4) ? 4 : parityOptions[0];
    }

    if (nextParity === null) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setParity(nextParity);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [parityOptions, parity, totalDrives]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.has("number_of_servers") &&
      params.has("drives_per_server") &&
      params.has("drive_capacity") &&
      params.has("stripe_size") &&
      params.has("parity_count")
    ) {
      const nextServers = Number(params.get("number_of_servers"));
      const nextDrives = Number(params.get("drives_per_server"));
      const nextCapacity = Number(params.get("drive_capacity"));
      const nextStripe = Number(params.get("stripe_size"));
      const nextParity = Number(params.get("parity_count"));

      if (
        Number.isFinite(nextServers) &&
        Number.isFinite(nextDrives) &&
        Number.isFinite(nextCapacity) &&
        Number.isFinite(nextStripe) &&
        Number.isFinite(nextParity)
      ) {
        const frame = window.requestAnimationFrame(() => {
          setServers(nextServers);
          setDrivesPerServer(nextDrives);
          setDriveCapacity(nextCapacity);
          setStripeSize(nextStripe);
          setParity(nextParity);
        });

        return () => window.cancelAnimationFrame(frame);
      }
    }
  }, []);

  const results = useMemo(() => {
    if (validationError || stripeSize === 0 || parity === 0) {
      return {
        rawBytes: 0,
        usableBytes: 0,
        efficiency: 0,
        driveFailures: 0,
        driveFailuresTotal: 0,
        serverFailuresPerShard: 0,
        serverFailuresTotal: 0,
      };
    }

    const rawBytes = totalDrives * getBytes(driveCapacity, "TiB");
    const efficiency = (stripeSize - parity) / stripeSize;
    const usableBytes = rawBytes * efficiency;

    let driveFailures = parity;
    if (driveFailures === stripeSize / 2) {
      driveFailures -= 1;
    }

    const driveFailuresTotal = Math.floor((driveFailures / stripeSize) * totalDrives);
    const serverFailuresPerShard = Math.floor(
      (driveFailures * stripeInfo.numServersPerShard) / stripeSize
    );
    const serverFailuresTotal = Math.floor(
      (driveFailures * stripeInfo.numServersPerShard * stripeInfo.numShards) / stripeSize
    );

    return {
      rawBytes,
      usableBytes,
      efficiency,
      driveFailures,
      driveFailuresTotal,
      serverFailuresPerShard,
      serverFailuresTotal,
    };
  }, [
    validationError,
    stripeSize,
    parity,
    totalDrives,
    driveCapacity,
    stripeInfo.numServersPerShard,
    stripeInfo.numShards,
  ]);

  const usablePercent =
    validationError || results.efficiency <= 0
      ? 0
      : Math.min(100, Math.max(0, Math.round(results.efficiency * 100)));
  const parityPercent = usablePercent > 0 ? 100 - usablePercent : 0;

  const handleCopyShareLink = async () => {
    setShareCopied(false);
    const params = new URLSearchParams({
      number_of_servers: String(servers),
      drives_per_server: String(drivesPerServer),
      drive_capacity: String(driveCapacity),
      stripe_size: String(stripeSize),
      parity_count: String(parity),
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
    } catch {
      setShareCopied(false);
    }
  };

  const buildSummary = () => {
    return {
      "服务器数量": servers,
      "每台服务器磁盘数": drivesPerServer,
      "单盘容量（TiB）": driveCapacity,
      "条带大小（K + M）": stripeSize,
      "校验块（M）": parity,
      "原始容量": niceBytes(results.rawBytes),
      "可用容量": niceBytes(results.usableBytes),
      "存储效率": `${Math.floor(results.efficiency * 100)}%`,
      "磁盘故障容忍": `集群可容忍 ${results.driveFailuresTotal} 块磁盘故障`,
      "每条带磁盘容忍": `${stripeSize} 块中可容忍 ${results.driveFailures} 块`,
      "服务器故障容忍": `集群可容忍 ${results.serverFailuresTotal} 台服务器故障`,
      "每分片服务器容忍": `${stripeInfo.numServersPerShard} 台中可容忍 ${results.serverFailuresPerShard} 台`,
    };
  };

  const handleExportCsv = () => {
    if (validationError) {
      return;
    }
    const summary = buildSummary();
    const rows = Object.entries(summary).map(
      ([key, value]) => `${key},${value}`
    );
    const csvContent = ["指标,数值", ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rustfs-erasure-code-results.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportSvg = () => {
    if (validationError) {
      return;
    }

    setExportBusy(true);
    const summary = buildSummary();
    const entries = Object.entries(summary);
    const lineHeight = 22;
    const padding = 32;
    const width = 720;
    const height = padding * 2 + lineHeight * (entries.length + 2);

    const lines = entries
      .map(([key, value], index) => {
        const y = padding + lineHeight * (index + 2);
        return `<text x="${padding}" y="${y}" fill="#0f172a" font-size="14" font-family="Inter, Arial, sans-serif">${key}: ${value}</text>`;
      })
      .join("");

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#ffffff" />
  <text x="${padding}" y="${padding}" fill="#0f172a" font-size="20" font-family="Inter, Arial, sans-serif" font-weight="600">RustFS 纠删码计算结果</text>
  ${lines}
</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rustfs-erasure-code-results.svg";
    link.click();
    window.URL.revokeObjectURL(url);
    setExportBusy(false);
  };

  return (
    <div className="relative z-10 py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            在部署前规划 RustFS 纠删码组
          </h1>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">
            根据计划使用的硬件配置，计算原始容量、可用容量、条带布局与故障容忍能力。
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-card px-5 py-6">
            <ServerIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              服务器
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">{servers}</div>
          </div>
          <div className="border border-border bg-card px-5 py-6">
            <HardDriveIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              磁盘总数
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">{totalDrives}</div>
          </div>
          <div className="border border-border bg-card px-5 py-6">
            <DatabaseIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              原始容量
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">
              {validationError ? "--" : niceBytes(results.rawBytes)}
            </div>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,0.6fr)_0.4fr]">
          <section className="flex flex-col border border-border bg-card">
            <div className="border-b border-border px-6 py-6">
              <h2 className="text-lg font-semibold text-foreground">集群参数</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                先确定硬件，再选择纠删码布局。
              </p>
            </div>

            {validationError ? (
              <div className="border-b border-destructive/40 bg-destructive/10 px-6 py-4 text-sm text-destructive">
                {validationError}
              </div>
            ) : null}

            <div className="grid gap-5 border-b border-border px-6 py-6 md:grid-cols-3">
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  服务器
                </span>
                <Input
                  type="number"
                  min={1}
                  value={serversInput !== null ? serversInput : servers}
                  onFocus={() => setServersInput(String(servers))}
                  onChange={(event) => {
                    const formatted = formatIntegerInput(event.target.value);
                    setServersInput(formatted);
                    if (formatted !== "") setServers(Number(formatted));
                  }}
                  onBlur={() => {
                    if (serversInput === "" || Number(serversInput) < 1) setServers(1);
                    setServersInput(null);
                  }}
                  className="mt-3 h-11 bg-background font-mono text-base"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  每台服务器磁盘数
                </span>
                <Input
                  type="number"
                  min={1}
                  max={256}
                  value={drivesPerServerInput !== null ? drivesPerServerInput : drivesPerServer}
                  onFocus={() => setDrivesPerServerInput(String(drivesPerServer))}
                  onChange={(event) => {
                    const formatted = formatIntegerInput(event.target.value);
                    setDrivesPerServerInput(formatted);
                    if (formatted !== "") setDrivesPerServer(Number(formatted));
                  }}
                  onBlur={() => {
                    if (drivesPerServerInput === "" || Number(drivesPerServerInput) < 1) {
                      setDrivesPerServer(1);
                    } else if (Number(drivesPerServerInput) > 256) {
                      setDrivesPerServer(256);
                    }
                    setDrivesPerServerInput(null);
                  }}
                  className="mt-3 h-11 bg-background font-mono text-base"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  单盘容量（TiB）
                </span>
                <Input
                  type="number"
                  min={1}
                  value={driveCapacityInput !== null ? driveCapacityInput : driveCapacity}
                  onFocus={() => setDriveCapacityInput(String(driveCapacity))}
                  onChange={(event) => {
                    const formatted = formatIntegerInput(event.target.value);
                    setDriveCapacityInput(formatted);
                    if (formatted !== "") setDriveCapacity(Number(formatted));
                  }}
                  onBlur={() => {
                    if (driveCapacityInput === "" || Number(driveCapacityInput) < 1) {
                      setDriveCapacity(1);
                    }
                    setDriveCapacityInput(null);
                  }}
                  className="mt-3 h-11 bg-background font-mono text-base"
                />
              </label>
            </div>

            <div className="grid gap-5 border-b border-border px-6 py-6 md:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  条带大小（K + M）
                </span>
                <Select
                  value={stripeSize ? String(stripeSize) : undefined}
                  onValueChange={(value) => setStripeSize(Number(value))}
                  disabled={stripeInfo.stripeSizes.length === 0}
                >
                  <SelectTrigger className="mt-3 h-11 w-full bg-background font-mono text-base">
                    <SelectValue placeholder="不可用" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {stripeInfo.stripeSizes.map((value) => (
                        <SelectItem key={value} value={String(value)}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  每个纠删码组的磁盘数。硬件条件允许时，更大的条带可提高效率。
                </p>
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  校验块（M）
                </span>
                <Select
                  value={parity ? String(parity) : undefined}
                  onValueChange={(value) => setParity(Number(value))}
                  disabled={parityOptions.length === 0}
                >
                  <SelectTrigger className="mt-3 h-11 w-full bg-background font-mono text-base">
                    <SelectValue placeholder="不可用" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {parityOptions.map((value) => (
                        <SelectItem key={value} value={String(value)}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  更多校验块可提高容错能力，但会减少可用容量。
                </p>
              </label>
            </div>

            <div className="grid gap-5 border-b border-border px-6 py-5 sm:grid-cols-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  数据块
                </div>
                <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                  {validationError ? "--" : stripeSize - parity}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  校验块
                </div>
                <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                  {validationError ? "--" : parity}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  纠删码组
                </div>
                <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                  {validationError ? "--" : `${stripeSize} 块磁盘`}
                </div>
              </div>
            </div>

            {recommendedConfig ? (
              <div className="flex flex-1 border-b border-border px-6 py-6 text-sm">
                <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <div className="font-medium text-foreground">推荐布局</div>
                    <div className="mt-1 leading-6 text-muted-foreground">
                      {recommendedConfig.serversCorrected != null ? (
                        <>
                          至少使用 4 台服务器，每台 {recommendedConfig.drivesCorrected} 块磁盘，
                          条带 {recommendedConfig.stripe}，校验块 {recommendedConfig.parity}。
                        </>
                      ) : (
                        <>
                          条带 {recommendedConfig.stripe}，校验块 {recommendedConfig.parity}。
                          在可用性与效率之间取得平衡。
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        recommendedConfig.serversCorrected != null &&
                        recommendedConfig.drivesCorrected != null
                      ) {
                        setServers(recommendedConfig.serversCorrected);
                        setDrivesPerServer(recommendedConfig.drivesCorrected);
                        setServersInput(null);
                        setDrivesPerServerInput(null);
                        queueMicrotask(() => {
                          setStripeSize(recommendedConfig.stripe);
                          setParity(recommendedConfig.parity);
                        });
                      } else {
                        setStripeSize(recommendedConfig.stripe);
                        setParity(recommendedConfig.parity);
                      }
                      setAppliedFeedback(true);
                      setTimeout(() => setAppliedFeedback(false), 1500);
                    }}
                  >
                    {appliedFeedback ? <CheckIcon className="size-4" /> : <ShieldCheckIcon className="size-4" />}
                    {appliedFeedback ? "已应用" : "应用"}
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="mt-auto grid gap-8 px-6 py-6 md:grid-cols-[1fr_0.92fr]">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  生产检查
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border pb-3">
                    <span className="text-muted-foreground">故障域</span>
                    <span className="font-medium text-foreground">机架 / 节点</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border pb-3">
                    <span className="text-muted-foreground">重建余量</span>
                    <span className="font-medium text-foreground">容量 + I/O</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <span className="text-muted-foreground">运维基线</span>
                    <span className="font-medium text-foreground">告警 + 备件</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-l border-border pl-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LifeBuoyIcon className="size-4 text-brand" />
                  需要容量规划评审？
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  采购硬件前，请将节点数、磁盘型号、预期增长与故障域目标提供给 RustFS 团队。
                </p>
                <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                  <a href="/contact">
                    联系我们
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section className="border border-border bg-card">
            <div className="border-b border-border px-6 py-6">
              <h2 className="text-lg font-semibold text-foreground">容量结果</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                扣除校验空间后的可用数据容量。
              </p>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                可用容量
              </div>
              <div className="mt-3 font-mono text-5xl font-semibold tracking-tight text-foreground">
                {validationError ? "--" : niceBytes(results.usableBytes)}
              </div>

              <div className="mt-8 border border-border bg-background">
                <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="px-3 py-2">容量分配</span>
                  <span className="border-l border-border px-3 py-2">
                    {validationError ? "--" : `${usablePercent}% 可用`}
                  </span>
                </div>
                <div className="flex h-4 bg-muted">
                  <div
                    className="bg-brand"
                    style={{ width: `${usablePercent}%` }}
                    aria-hidden="true"
                  />
                  <div
                    className="bg-foreground/20"
                    style={{ width: `${parityPercent}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 border-y border-border py-5 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    原始容量
                  </div>
                  <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                    {validationError ? "--" : niceBytes(results.rawBytes)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    效率
                  </div>
                  <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                    {validationError ? "--" : `${Math.floor(results.efficiency * 100)}%`}
                  </div>
                </div>
              </div>

              <div className="mt-6 divide-y divide-border border-y border-border">
                <div className="py-5">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <HardDriveIcon className="size-4 text-brand" />
                    磁盘故障容忍
                  </div>
                  <div className="mt-2 text-sm leading-6 text-muted-foreground">
                    {validationError
                      ? "--"
                      : `集群可容忍 ${results.driveFailuresTotal} 块磁盘故障`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {validationError
                      ? ""
                      : `每条带 ${stripeSize} 块中可容忍 ${results.driveFailures} 块`}
                  </div>
                </div>

                <div className="py-5">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <ServerIcon className="size-4 text-brand" />
                    服务器故障容忍
                  </div>
                  <div className="mt-2 text-sm leading-6 text-muted-foreground">
                    {validationError
                      ? "--"
                      : `集群可容忍 ${results.serverFailuresTotal} 台服务器故障`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {validationError
                      ? ""
                      : `每分片 ${stripeInfo.numServersPerShard} 台中可容忍 ${results.serverFailuresPerShard} 台`}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                结果按满足仲裁安全的下限取整，仅应作为生产容量规划前的估算参考。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportCsv}
                  disabled={!!validationError}
                  className="min-w-28"
                >
                  <DownloadIcon className="size-4" />
                  CSV
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportSvg}
                  disabled={!!validationError || exportBusy}
                  className="min-w-28"
                >
                  <DownloadIcon className="size-4" />
                  {exportBusy ? "导出中" : "SVG"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyShareLink}
                  className="min-w-32"
                >
                  {shareCopied ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <LinkIcon className="size-4" />
                  )}
                  {shareCopied ? "已复制" : "复制链接"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
