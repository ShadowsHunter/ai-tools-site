"use client";
import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Shield } from "lucide-react";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { setPassword(""); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
    setCopied(false);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (length < 12) return { label: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" };
    if (length < 16) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500" };
    return { label: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const strength = getStrength();

  return (
    <ToolLayout title="Password Generator" description="Generate secure, random passwords. Customize length, characters, and complexity.">
      <div className="space-y-6">
        {password && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium ${strength.color}`}>{strength.label}</span>
              <button onClick={copy} className="text-xs text-[var(--primary)] hover:underline">{copied ? "✓ Copied!" : "Copy"}</button>
            </div>
            <div className="font-mono text-lg break-all select-all bg-[var(--muted)] rounded-lg p-4">{password}</div>
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4].map((i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= (length < 8 ? 1 : length < 12 ? 2 : length < 16 ? 3 : 4) ? strength.bg : "bg-[var(--border)]"}`} />)}
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2"><span>Length</span><span className="font-mono">{length}</span></div>
            <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: "Uppercase (A-Z)", checked: useUpper, fn: setUseUpper }, { label: "Lowercase (a-z)", checked: useLower, fn: setUseLower }, { label: "Numbers (0-9)", checked: useNumbers, fn: setUseNumbers }, { label: "Symbols (!@#$)", checked: useSymbols, fn: setUseSymbols }].map((o) => (
              <label key={o.label} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={o.checked} onChange={(e) => o.fn(e.target.checked)} className="accent-[var(--primary)]" /><span className="text-sm">{o.label}</span></label>
            ))}
          </div>
        </div>
        <button onClick={generate} className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-medium hover:opacity-90 transition-opacity">Generate Password</button>
      </div>
    </ToolLayout>
  );
}
