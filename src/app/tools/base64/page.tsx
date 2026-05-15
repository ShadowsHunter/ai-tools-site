"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { ArrowDownUp, Copy, Check } from "lucide-react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch (e) {
      setError(`Invalid input for ${mode}: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input, mode]);

  const swap = useCallback(() => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput("");
  }, [output]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode and decode Base64 strings instantly in your browser. Supports Unicode text."
    >
      {/* Mode toggle */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setMode("encode")}
          className={mode === "encode" ? "btn-primary" : "btn-secondary"}
        >
          Encode
        </button>
        <button onClick={swap} className="btn-secondary p-2" title="Swap">
          <ArrowDownUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => setMode("decode")}
          className={mode === "decode" ? "btn-primary" : "btn-secondary"}
        >
          Decode
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">
          Input ({mode === "encode" ? "plain text" : "Base64 string"})
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Enter text to encode..."
              : "Enter Base64 to decode..."
          }
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      {/* Process button */}
      <button onClick={process} className="btn-primary mb-4">
        {mode === "encode" ? "Encode →" : "Decode →"}
      </button>

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
            <label className="text-sm font-medium">Output</label>
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
          <pre className="rounded-lg bg-[var(--muted)] p-4 overflow-auto max-h-[300px] text-sm font-mono whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      )}

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div>
          <h3 className="font-semibold">What is Base64 encoding?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Base64 is a binary-to-text encoding scheme that represents binary
            data as ASCII characters. It&apos;s commonly used in email, URLs,
            and data embedding.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Base64 Encoder & Decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
