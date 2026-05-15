"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed)
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
      };
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: trimmed.split(/\s+/).filter(Boolean).length,
      sentences: trimmed.split(/[.!?]+/).filter(Boolean).length,
      paragraphs: trimmed.split(/\n\s*\n/).filter(Boolean).length,
      lines: text.split("\n").length,
    };
  }, [text]);

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
  ];

  return (
    <ToolLayout
      title="Free Online Word Counter"
      description="Count words, characters, sentences, and paragraphs in real time. Paste or type your text below — no signup required."
    >
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-[var(--muted)] p-4 text-center"
          >
            <div className="text-2xl font-bold text-[var(--primary)]">
              {item.value.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--muted-foreground)] mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Text input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="min-h-[300px]"
        autoFocus
      />

      {/* FAQ for SEO */}
      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold">How do I count words online?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Simply paste or type your text into the box above. The word count,
            character count, and other statistics update instantly.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Is this word counter free?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Yes, 100% free with no limits. No signup or login required.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Is my text stored on your servers?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            No. All processing happens in your browser. Your text never leaves
            your device.
          </p>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Free Online Word Counter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Count words, characters, sentences, and paragraphs in real time.",
          }),
        }}
      />
    </ToolLayout>
  );
}
