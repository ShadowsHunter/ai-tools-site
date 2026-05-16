"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Scissors } from "lucide-react";

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("");
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (f: File) => {
    setFile(f);
    // Estimate page count from file size (rough heuristic for demo)
    setStatus("Page detection requires pdf-lib. For production, use an API route to get exact page count.");
    setPageCount(Math.max(1, Math.round(f.size / 50000))); // rough estimate
  };

  const split = () => {
    if (!file) { setStatus("Please upload a PDF file."); return; }
    if (!range) { setStatus("Please enter a page range."); return; }
    setStatus("Splitting requires server-side processing (pdf-lib). Connect a backend API for full functionality.");
    setTimeout(() => setStatus("✅ In production, this would download the split PDF pages. Connect a backend API."), 2000);
  };

  return (
    <ToolLayout title="PDF Split" description="Split PDF files by page ranges. Free online PDF splitter.">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}>
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          {file ? <p className="text-sm">{file.name} ({(file.size / 1024).toFixed(0)} KB, ~{pageCount} pages)</p> : <p className="text-[var(--muted-foreground)]">Drop a PDF file here or click to upload</p>}
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Page Range</label>
          <input className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="e.g. 1-3, 5, 7-10" value={range} onChange={(e) => setRange(e.target.value)} />
          <p className="text-xs text-[var(--muted-foreground)] mt-1">Enter page numbers or ranges separated by commas</p>
        </div>
        <button onClick={split} disabled={!file} className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">Split PDF</button>
        {status && <div className="text-sm text-[var(--muted-foreground)] text-center">{status}</div>}
      </div>
    </ToolLayout>
  );
}
