"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { FileCode } from "lucide-react";

export default function CssMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minify = () => {
    let result = input;
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");
    result = result.replace(/\s+/g, " ");
    result = result.replace(/\s*([{}:;,>~+])\s*/g, "$1");
    result = result.replace(/;}/g, "}");
    result = result.replace(/^ +| +$/gm, "");
    setOutput(result.trim());
  };

  const savings = input && output ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <ToolLayout title="CSS Minifier" description="Minify CSS code to reduce file size. Remove comments, whitespace, and unnecessary characters.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input CSS</label>
          <textarea className="w-full h-80 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Paste your CSS here..." value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Minified CSS</label>
          <textarea className="w-full h-80 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-sm font-mono resize-y focus:outline-none" value={output} readOnly placeholder="Minified output..." />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button onClick={minify} className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">Minify CSS</button>
        {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-[var(--primary)] hover:underline">Copy output</button>}
        {savings > 0 && <span className="text-sm text-green-600">Reduced by {savings}%</span>}
      </div>
    </ToolLayout>
  );
}
