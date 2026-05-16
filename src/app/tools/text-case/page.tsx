"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Type } from "lucide-react";

export default function TextCasePage() {
  const [input, setInput] = useState("");

  const transforms = [
    { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
    { label: "lowercase", fn: (s: string) => s.toLowerCase() },
    { label: "Title Case", fn: (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase()) },
    { label: "Sentence case", fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
    { label: "tOGGLE cASE", fn: (s: string) => s.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("") },
    { label: "camelCase", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { label: "snake_case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") },
    { label: "kebab-case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
  ];

  return (
    <ToolLayout title="Text Case Converter" description="Convert text between different cases: uppercase, lowercase, title case, camelCase, and more.">
      <textarea className="w-full h-40 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Type or paste your text here..." value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {transforms.map((t) => (
          <div key={t.label} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="text-xs font-medium text-[var(--primary)] mb-2">{t.label}</div>
            <div className="text-sm text-[var(--muted-foreground)] break-all min-h-[2rem]">{input ? t.fn(input) : <span className="italic">Result appears here...</span>}</div>
            {input && <button onClick={() => navigator.clipboard.writeText(t.fn(input))} className="mt-2 text-xs text-[var(--primary)] hover:underline">Copy</button>}
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
