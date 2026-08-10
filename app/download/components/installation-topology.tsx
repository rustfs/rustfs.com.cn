'use client'

import { DataFlowLine } from '@/components/business/data-flow-motion';
import { NetworkIcon, ServerIcon, SquareStackIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState, type ComponentType, type KeyboardEvent } from 'react';

type Topology = {
  id: string;
  code: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  useCase: string;
  tradeoff: string;
  command: string[];
  notes: string[];
};

const topologies: Topology[] = [
  {
    id: 'single-disk',
    code: 'SNSD',
    name: '单节点单磁盘',
    icon: ServerIcon,
    useCase: '以最少资源用于个人实验、本地开发与非生产测试。',
    tradeoff: '不提供数据冗余，仅适合一次性验证，不适合持久生产数据。',
    command: ['rustfs /data'],
    notes: ['1 个节点', '1 条磁盘路径', '无冗余'],
  },
  {
    id: 'single-node-multi-disk',
    code: 'SNMD',
    name: '单节点多磁盘',
    icon: SquareStackIcon,
    useCase: '适合管理数十 TB 数据、需要跨磁盘本地纠删码的小型组织。',
    tradeoff: '磁盘容错能力有所提升，但服务可用性仍依赖单个节点。',
    command: ['rustfs /disk{1...4}'],
    notes: ['1 个节点', '多块磁盘', '本地纠删码'],
  },
  {
    id: 'multi-node-multi-disk',
    code: 'MNMD',
    name: '多节点多磁盘',
    icon: NetworkIcon,
    useCase: '适合从数百 TB 扩展到 PB 级对象存储的中大型企业。',
    tradeoff: '需要完整规划网络、身份、可观测性、容量、升级与生产运维。',
    command: ['rustfs http://node{1...4}/disk{1...4}'],
    notes: ['多个节点', '多块磁盘', '生产环境'],
  },
];

function ArrivalGlow({ delay = 0 }: { delay?: number }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.span
      className="pointer-events-none absolute inset-0 bg-brand/10"
      animate={{ opacity: [0, 0, 0.75, 0] }}
      transition={{ duration: 2.6, delay, ease: 'easeInOut', repeat: Infinity }}
    />
  );
}

function TopologyDiagram({ id }: { id: string }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  if (id === 'single-disk') {
    return (
      <motion.div {...entrance} className="flex min-h-44 items-center justify-center p-6" aria-hidden="true">
        <div className="grid w-full max-w-72 gap-5">
          <div className="mx-auto flex h-16 w-28 items-center justify-center border border-border bg-card">
            <ServerIcon className="size-6 text-brand" />
          </div>
          <DataFlowLine direction="vertical" className="mx-auto h-8" />
          <div className="relative mx-auto h-12 w-32 overflow-hidden border border-border bg-muted/50">
            <ArrivalGlow delay={1.05} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (id === 'single-node-multi-disk') {
    return (
      <motion.div {...entrance} className="flex min-h-44 items-center justify-center p-6" aria-hidden="true">
        <div className="grid w-full max-w-80 gap-5">
          <div className="mx-auto flex h-16 w-32 items-center justify-center border border-border bg-card">
            <ServerIcon className="size-6 text-brand" />
          </div>
          <DataFlowLine direction="vertical" className="mx-auto h-8" />
          <div className="relative grid grid-cols-4 gap-2 pt-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-border" />
            <DataFlowLine direction="horizontal" className="absolute left-[12.5%] right-[12.5%] top-0 w-auto" delay={0.35} />
            {[1, 2, 3, 4].map((disk) => (
              <div key={disk} className="relative h-12 border border-border bg-muted/50 before:absolute before:-top-4 before:left-1/2 before:h-4 before:w-px before:bg-border">
                <ArrivalGlow delay={0.9 + disk * 0.14} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...entrance} className="flex min-h-44 items-center justify-center p-5" aria-hidden="true">
      <div className="relative grid w-full max-w-96 grid-cols-4 gap-3 pt-5">
        <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-border" />
        <DataFlowLine direction="horizontal" className="absolute left-[12.5%] right-[12.5%] top-0 w-auto" delay={0.2} />
        {[1, 2, 3, 4].map((node) => (
          <div key={node} className="relative border border-border bg-card p-2 before:absolute before:-top-5 before:left-1/2 before:h-5 before:w-px before:bg-border">
            <ArrivalGlow delay={0.75 + node * 0.18} />
            <div className="mb-2 flex h-10 items-center justify-center border border-border bg-muted/35">
              <ServerIcon className="size-4 text-brand" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map((disk) => (
                <div key={disk} className="h-6 border border-border bg-background" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function InstallationTopology() {
  const [activeId, setActiveId] = useState(topologies[0].id);
  const activeTopology = topologies.find((item) => item.id === activeId) ?? topologies[0];

  const handleTopologyKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % topologies.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + topologies.length) % topologies.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = topologies.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveId(topologies[nextIndex].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">部署拓扑</p>
            <h2 className="mt-4 w-full font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              选择正确的安装拓扑方式
            </h2>
            <p className="mt-4 w-full text-sm leading-7 text-muted-foreground">
              RustFS 可以从单机起步，但生产规划必须明确磁盘、节点与恢复目标。
            </p>
          </div>
        </div>

        <div className="border border-border bg-card">
          <div
            role="tablist"
            aria-label="部署拓扑"
            className="grid divide-y divide-border border-b border-border md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {topologies.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.id === activeTopology.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`topology-panel-${item.id}`}
                  id={`topology-tab-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => handleTopologyKeyDown(event, index)}
                  tabIndex={isActive ? 0 : -1}
                  className={[
                    'motion-button flex min-h-24 items-center gap-4 border-l-2 border-l-transparent p-5 text-left transition-colors',
                    isActive ? 'border-l-brand bg-brand/10 text-foreground' : 'text-muted-foreground hover:bg-muted/20 hover:text-foreground',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex size-8 shrink-0 items-center justify-center',
                      isActive ? 'text-brand' : 'text-foreground',
                    ].join(' ')}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{item.code}</span>
                    <span className="mt-1 block text-base font-semibold leading-snug">{item.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`topology-panel-${activeTopology.id}`}
            role="tabpanel"
            aria-labelledby={`topology-tab-${activeTopology.id}`}
            className="grid lg:grid-cols-[0.86fr_1.14fr]"
          >
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="border border-border">
                <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="px-3 py-3">拓扑结构</span>
                  <span className="border-l border-border px-3 py-3 text-brand">{activeTopology.code}</span>
                </div>
                <TopologyDiagram key={activeTopology.id} id={activeTopology.id} />
                <div className="grid border-t border-border text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-3">
                  {activeTopology.notes.map((note) => (
                    <span key={note} className="border-b border-border px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid">
              <div className="grid gap-8 border-b border-border px-6 py-7 sm:px-8 md:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">适用场景</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">{activeTopology.useCase}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">注意</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeTopology.tradeoff}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">配置形式</p>
                <code className="mt-4 block min-w-0 whitespace-pre-wrap break-words border border-border bg-background p-4 font-mono text-sm leading-6 text-foreground">
                  {activeTopology.command.join('\n')}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
