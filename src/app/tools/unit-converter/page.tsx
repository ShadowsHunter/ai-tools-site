"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";

const categories: Record<string, { units: string[]; convert: (v: number, from: string, to: string) => number }> = {
  Length: {
    units: ["Meters", "Kilometers", "Miles", "Feet", "Inches", "Centimeters", "Millimeters", "Yards"],
    convert: (v, from, to) => {
      const toMeters: Record<string, number> = {
        Meters: 1, Kilometers: 1000, Miles: 1609.344, Feet: 0.3048,
        Inches: 0.0254, Centimeters: 0.01, Millimeters: 0.001, Yards: 0.9144,
      };
      return (v * toMeters[from]) / toMeters[to];
    },
  },
  Weight: {
    units: ["Kilograms", "Grams", "Pounds", "Ounces", "Tons", "Milligrams"],
    convert: (v, from, to) => {
      const toKg: Record<string, number> = {
        Kilograms: 1, Grams: 0.001, Pounds: 0.453592, Ounces: 0.0283495,
        Tons: 1000, Milligrams: 0.000001,
      };
      return (v * toKg[from]) / toKg[to];
    },
  },
  Temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (v, from, to) => {
      let celsius = v;
      if (from === "Fahrenheit") celsius = (v - 32) * (5 / 9);
      if (from === "Kelvin") celsius = v - 273.15;
      if (to === "Celsius") return celsius;
      if (to === "Fahrenheit") return celsius * (9 / 5) + 32;
      return celsius + 273.15;
    },
  },
  Speed: {
    units: ["km/h", "mph", "m/s", "knots"],
    convert: (v, from, to) => {
      const toMs: Record<string, number> = {
        "km/h": 1 / 3.6, mph: 0.44704, "m/s": 1, knots: 0.514444,
      };
      return (v * toMs[from]) / toMs[to];
    },
  },
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Kilometers");
  const [value, setValue] = useState("1");

  const cat = categories[category];

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    const r = cat.convert(num, fromUnit, toUnit);
    return r < 0.001 && r > 0
      ? r.toExponential(4)
      : r % 1 === 0
        ? r.toString()
        : r.toFixed(6).replace(/\.?0+$/, "");
  }, [value, fromUnit, toUnit, cat]);

  const handleCategoryChange = (c: string) => {
    setCategory(c);
    setFromUnit(categories[c].units[0]);
    setToUnit(categories[c].units[1]);
  };

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between length, weight, temperature, and speed units instantly."
    >
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(categories).map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryChange(c)}
            className={c === category ? "btn-primary" : "btn-secondary"}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        {/* Value */}
        <div>
          <label className="text-sm font-medium mb-1 block">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        {/* From */}
        <div>
          <label className="text-sm font-medium mb-1 block">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          >
            {cat.units.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>
        {/* To */}
        <div>
          <label className="text-sm font-medium mb-1 block">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          >
            {cat.units.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-lg bg-[var(--muted)] p-6 text-center">
          <div className="text-sm text-[var(--muted-foreground)]">
            {value} {fromUnit} =
          </div>
          <div className="text-3xl font-bold text-[var(--primary)] mt-1">
            {result}
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">{toUnit}</div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Unit Converter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
