"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { FileImage } from "lucide-react";

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = async () => {
    if (!file) { setStatus("Please upload a PDF file."); return; }
    try {
      setStatus("Loading PDF renderer...");
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setStatus(`Rendering ${pdf.numPages} page(s)...`);
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, canvas, viewport }).promise;
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `page-${i}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        }, "image/png");
      }
      setStatus(`✅ Done! ${pdf.numPages} page(s) downloaded as PNG images.`);
    } catch {
      setStatus("Error: Install pdfjs-dist package. Run: npm install pdfjs-dist");
    }
  };

  return (
    <ToolLayout title="PDF to Image" description="Convert PDF pages to PNG images. Free online PDF to image converter.">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && setFile(e.dataTransfer.files[0]); }}>
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
          {file ? <p className="text-sm">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p> : <p className="text-[var(--muted-foreground)]">Drop a PDF file here or click to upload</p>}
        </div>
        <button onClick={convert} disabled={!file} className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">Convert to PNG Images</button>
        {status && <div className="text-sm text-[var(--muted-foreground)] text-center">{status}</div>}
      </div>
    </ToolLayout>
  );
}
