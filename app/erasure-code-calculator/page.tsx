import type { Metadata } from "next";
import ErasureCodeCalculator from "@/components/business/erasure-code-calculator";

export const metadata: Metadata = {
  title: "RustFS 纠删码计算器",
  description: "计算纠删码配置下的原始容量、可用容量与容错能力。",
};

export default function ErasureCodeCalculatorPage() {
  return (
    <main className="flex-1">
      <ErasureCodeCalculator />
    </main>
  );
}
