"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Check, RefreshCw } from "lucide-react";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "semper", "risus",
  "viverra", "maecenas", "accumsan", "lacus", "vel", "facilisis", "volutpat",
];

function generateParagraph(): string {
  const len = 30 + Math.floor(Math.random() * 40);
  const words = Array.from(
    { length: len },
    () => WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">(
    "paragraphs"
  );
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let result = "";
    if (unit === "paragraphs") {
      result = Array.from({ length: count }, generateParagraph).join("\n\n");
    } else if (unit === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        const words = Array.from(
          { length: 10 + Math.floor(Math.random() * 15) },
          () => WORDS[Math.floor(Math.random() * WORDS.length)]
        );
        words[0] = words[0][0].toUpperCase() + words[0].slice(1);
        sentences.push(words.join(" ") + ".");
      }
      result = sentences.join(" ");
    } else {
      const words = Array.from(
        { length: count },
        () => WORDS[Math.floor(Math.random() * WORDS.length)]
      );
      result = words.join(" ");
    }
    setOutput(result);
  }, [count, unit]);

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs, mockups, and layouts."
    >
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Count</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Unit</label>
          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value as "paragraphs" | "sentences" | "words")
            }
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button
          onClick={generate}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Generate
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Generated Text</label>
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
          <div className="rounded-lg bg-[var(--muted)] p-4 text-sm leading-relaxed whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Lorem Ipsum Generator",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
