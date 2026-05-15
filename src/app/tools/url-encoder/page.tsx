"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { ArrowDownUp, Copy, Check } from "lucide-react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput("Error: Invalid input");
    }
  }, [input, mode]);

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="URL Encoder & Decoder"
      description="Encode or decode URL components safely. Handles special characters, spaces, and Unicode."
    >
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setMode("encode")}
          className={mode === "encode" ? "btn-primary" : "btn-secondary"}
        >
          Encode
        </button>
        <button
          onClick={() => {
            setMode((m) => (m === "encode" ? "decode" : "encode"));
            setInput(output);
            setOutput("");
          }}
          className="btn-secondary p-2"
        >
          <ArrowDownUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => setMode("decode")}
          className={mode === "decode" ? "btn-primary" : "btn-secondary"}
        >
          Decode
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">
          {mode === "encode" ? "Text to encode" : "URL-encoded string"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Enter text or URL..."
              : "Enter encoded string..."
          }
          className="font-mono text-sm"
        />
      </div>

      <button onClick={process} className="btn-primary mb-4">
        {mode === "encode" ? "Encode" : "Decode"}
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Result</label>
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
          <pre className="rounded-lg bg-[var(--muted)] p-4 overflow-auto text-sm font-mono break-all">
            {output}
          </pre>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "URL Encoder & Decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
