"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Braces } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const getMatches = () => {
    if (!pattern || !testStr) return [];
    try {
      setError("");
      const regex = new RegExp(pattern, flags);
      const matches: { text: string; index: number }[] = [];
      let match;
      if (flags.includes("g")) {
        while ((match = regex.exec(testStr)) !== null) {
          matches.push({ text: match[0], index: match.index });
          if (!match[0]) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testStr);
        if (match) matches.push({ text: match[0], index: match.index });
      }
      return matches;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid regex");
      return [];
    }
  };

  const matches = getMatches();

  const highlightText = () => {
    if (!pattern || !testStr || matches.length === 0) return testStr;
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    matches.forEach((m, i) => {
      if (m.index > lastIdx) parts.push(<span key={`b${i}`}>{testStr.slice(lastIdx, m.index)}</span>);
      parts.push(<mark key={`m${i}`} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{m.text}</mark>);
      lastIdx = m.index + m.text.length;
    });
    if (lastIdx < testStr.length) parts.push(<span key="end">{testStr.slice(lastIdx)}</span>);
    return parts;
  };

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions in real-time with match highlighting.">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3">
            <span className="text-[var(--muted-foreground)]">/</span>
            <input className="flex-1 bg-transparent py-3 text-sm font-mono focus:outline-none" placeholder="Regular expression" value={pattern} onChange={(e) => setPattern(e.target.value)} />
            <span className="text-[var(--muted-foreground)]">/{flags}</span>
          </div>
          <input className="w-16 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <textarea className="w-full h-40 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Test string..." value={testStr} onChange={(e) => setTestStr(e.target.value)} />
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="text-xs font-medium text-[var(--primary)] mb-2">Highlighted Matches</div>
          <div className="text-sm font-mono whitespace-pre-wrap break-all min-h-[2rem]">{testStr ? highlightText() : <span className="text-[var(--muted-foreground)] italic">Matches appear here...</span>}</div>
        </div>
        <div className="text-sm text-[var(--muted-foreground)]">{matches.length} match{matches.length !== 1 ? "es" : ""} found</div>
      </div>
    </ToolLayout>
  );
}
