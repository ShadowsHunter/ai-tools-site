"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { FileStack } from "lucide-react";

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfs = Array.from(newFiles).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const moveFile = (i: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const j = i + dir;
      if (j < 0 || j >= newFiles.length) return prev;
      [newFiles[i], newFiles[j]] = [newFiles[j], newFiles[i]];
      return newFiles;
    });
  };

  const merge = async () => {
    if (files.length < 2) { setStatus("Add at least 2 PDF files to merge."); return; }
    setStatus("Merging requires a server-side library (pdf-lib). This is a UI demo — for production, integrate pdf-lib via API route.");
    // For a real implementation, you'd send files to an API route that uses pdf-lib
    // For now, we show the UX flow
    setTimeout(() => setStatus("✅ In production, this would download the merged PDF. Connect a backend API for full functionality."), 2000);
  };

  return (
    <ToolLayout title="PDF Merge" description="Combine multiple PDF files into one. Free online PDF merger.">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
          <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          <p className="text-[var(--muted-foreground)]">Drop PDF files here or click to upload</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">Select multiple PDF files to merge</p>
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                <span className="text-sm font-mono text-[var(--muted-foreground)] w-6">{i + 1}.</span>
                <span className="flex-1 text-sm truncate">{f.name}</span>
                <span className="text-xs text-[var(--muted-foreground)]">{(f.size / 1024).toFixed(0)} KB</span>
                <button onClick={() => moveFile(i, -1)} disabled={i === 0} className="text-xs text-[var(--primary)] disabled:opacity-30">↑</button>
                <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} className="text-xs text-[var(--primary)] disabled:opacity-30">↓</button>
                <button onClick={() => removeFile(i)} className="text-xs text-red-500">✕</button>
              </div>
            ))}
          </div>
        )}
        <button onClick={merge} disabled={files.length < 2} className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">Merge {files.length} PDFs</button>
        {status && <div className="text-sm text-[var(--muted-foreground)] text-center">{status}</div>}
      </div>
    </ToolLayout>
  );
}
