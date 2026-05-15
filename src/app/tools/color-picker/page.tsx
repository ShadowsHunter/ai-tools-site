"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorPickerPage() {
  const [color, setColor] = useState("#6366f1");
  const [copiedField, setCopiedField] = useState("");

  const rgb = useMemo(() => hexToRgb(color), [color]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  const copyValue = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <ToolLayout
      title="Free Online Color Picker"
      description="Pick any color and get HEX, RGB, and HSL values instantly. Click to copy."
    >
      {/* Color input */}
      <div className="flex items-center gap-6 mb-6">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-24 w-24 rounded-xl cursor-pointer border-0"
        />
        <div>
          <div
            className="h-24 w-48 rounded-xl border border-[var(--border)]"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* Manual hex input */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">HEX Value</label>
        <input
          type="text"
          value={color}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColor(v);
          }}
          className="font-mono"
          maxLength={7}
        />
      </div>

      {/* Color values */}
      <div className="space-y-3">
        {formats.map((f) => (
          <div
            key={f.label}
            className="flex items-center justify-between rounded-lg bg-[var(--muted)] px-4 py-3"
          >
            <div>
              <span className="text-xs font-medium text-[var(--muted-foreground)] mr-3">
                {f.label}
              </span>
              <span className="font-mono text-sm">{f.value}</span>
            </div>
            <button
              onClick={() => copyValue(f.label, f.value)}
              className="btn-secondary py-1 px-2 text-xs flex items-center gap-1"
            >
              {copiedField === f.label ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Preset colors */}
      <div className="mt-8">
        <h3 className="font-semibold text-sm mb-3">Popular Colors</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#DDA0DD",
            "#FF8C00",
            "#6366f1",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
          ].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="h-8 w-8 rounded-lg border border-[var(--border)] hover:scale-110 transition-transform"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Free Online Color Picker",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
