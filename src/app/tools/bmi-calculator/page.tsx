"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Heart } from "lucide-react";

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  let bmi = 0;
  if (w > 0 && h > 0) {
    if (unit === "metric") bmi = w / ((h / 100) ** 2);
    else bmi = (w / (h ** 2)) * 703;
  }

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (b < 25) return { label: "Normal weight", color: "text-green-500", bg: "bg-green-500/10" };
    if (b < 30) return { label: "Overweight", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const cat = bmi > 0 ? getCategory(bmi) : null;

  return (
    <ToolLayout title="BMI Calculator" description="Calculate your Body Mass Index (BMI) with our free online calculator. Supports metric and imperial units.">
      <div className="space-y-6">
        <div className="flex gap-2">
          <button onClick={() => setUnit("metric")} className={`px-4 py-2 rounded-lg text-sm font-medium ${unit === "metric" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "border border-[var(--border)]"}`}>Metric (kg/cm)</button>
          <button onClick={() => setUnit("imperial")} className={`px-4 py-2 rounded-lg text-sm font-medium ${unit === "imperial" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "border border-[var(--border)]"}`}>Imperial (lbs/in)</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium block mb-1">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
            <input type="number" className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1">{unit === "metric" ? "Height (cm)" : "Height (in)"}</label>
            <input type="number" className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === "metric" ? "175" : "69"} />
          </div>
        </div>
        {bmi > 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-8 text-center">
            <div className="text-5xl font-bold mb-2">{bmi.toFixed(1)}</div>
            <div className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${cat?.bg} ${cat?.color}`}>{cat?.label}</div>
            <div className="mt-6 grid grid-cols-4 gap-2 text-xs">
              {[{ r: "< 18.5", l: "Underweight", c: "bg-blue-500" }, { r: "18.5–24.9", l: "Normal", c: "bg-green-500" }, { r: "25–29.9", l: "Overweight", c: "bg-yellow-500" }, { r: "30+", l: "Obese", c: "bg-red-500" }].map((i) => (
                <div key={i.l} className="text-center"><div className={`h-2 rounded-full ${i.c} mb-1`} /><div>{i.r}</div><div className="text-[var(--muted-foreground)]">{i.l}</div></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
