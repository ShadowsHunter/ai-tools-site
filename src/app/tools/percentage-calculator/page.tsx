"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Percent } from "lucide-react";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<"what" | "change" | "of">("what");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const numA = parseFloat(a) || 0;
  const numB = parseFloat(b) || 0;

  const results = {
    what: numB > 0 ? ((numA / numB) * 100).toFixed(2) + "%" : "—",
    change: numA > 0 ? (((numB - numA) / numA) * 100).toFixed(2) + "%" : "—",
    of: ((numA * numB) / 100).toFixed(2),
  };

  const labels: Record<typeof mode, { a: string; b: string; result: string }> = {
    what: { a: "is what % of", b: "?", result: "Result" },
    change: { a: "changed from", b: "to (new value)", result: "Percentage Change" },
    of: { a: "% of", b: "?", result: "Result" },
  };

  return (
    <ToolLayout title="Percentage Calculator" description="Calculate percentages, percentage change, and more. Free online percentage calculator.">
      <div className="space-y-6">
        <div className="flex gap-2">
          {(["what", "change", "of"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "border border-[var(--border)]"}`}>
              {m === "what" ? "X is what % of Y" : m === "change" ? "% Change" : "X% of Y"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium block mb-1">{labels[mode].a.split(" ")[0]}</label>
            <input type="number" className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1">{labels[mode].b.replace("?", "").trim()}</label>
            <input type="number" className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-8 text-center">
          <div className="text-sm text-[var(--muted-foreground)] mb-2">{labels[mode].result}</div>
          <div className="text-4xl font-bold">{results[mode]}</div>
        </div>
      </div>
    </ToolLayout>
  );
}
