"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Check, Minimize2, Maximize2 } from "lucide-react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, indent]);

  const minify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  return (
    <ToolLayout
      title="Free Online JSON Formatter"
      description="Validate, format, and minify JSON data instantly. Paste your JSON below — works entirely in your browser."
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--muted-foreground)]">
            Indent:
          </label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
        <button onClick={format} className="btn-primary flex items-center gap-2">
          <Maximize2 className="h-4 w-4" /> Format
        </button>
        <button onClick={minify} className="btn-secondary flex items-center gap-2">
          <Minimize2 className="h-4 w-4" /> Minify
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "John", "age": 30, "city": "New York"}'
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          ❌ {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Formatted Output</label>
            <button
              onClick={copyOutput}
              className="btn-secondary flex items-center gap-1.5 text-xs py-1 px-2.5"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="rounded-lg bg-[var(--muted)] p-4 overflow-auto max-h-[400px] text-sm font-mono whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div>
          <h3 className="font-semibold">What is JSON formatting?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            JSON formatting (or &quot;prettifying&quot;) adds indentation and
            line breaks to make JSON data human-readable and easier to debug.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Is my JSON data safe?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Yes. All processing happens in your browser. We never send your data
            to any server.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Free Online JSON Formatter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
