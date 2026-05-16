"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { FileImage } from "lucide-react";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const images = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...images]);
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const convert = async () => {
    if (files.length === 0) { setStatus("Please add at least one image."); return; }
    try {
      setStatus("Converting...");
      // Dynamic import of jsPDF
      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      for (let i = 0; i < files.length; i++) {
        if (i > 0) pdf.addPage();
        const img = await loadImage(files[i]);
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageW / img.width, pageH / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageW - w) / 2;
        const y = (pageH - h) / 2;
        pdf.addImage(img.dataUrl, "JPEG", x, y, w, h);
      }
      pdf.save("converted.pdf");
      setStatus(`✅ Downloaded! ${files.length} image(s) converted to PDF.`);
    } catch {
      setStatus("Error: Install jspdf package. Run: npm install jspdf");
    }
  };

  const loadImage = (file: File): Promise<{ dataUrl: string; width: number; height: number }> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve({ dataUrl: reader.result as string, width: img.width, height: img.height });
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

  return (
    <ToolLayout title="Image to PDF" description="Convert images (JPG, PNG, GIF, WebP) to PDF. Free online converter.">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          <p className="text-[var(--muted-foreground)]">Drop images here or click to upload</p>
        </div>
        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {files.map((f, i) => (
              <div key={i} className="relative rounded-lg border border-[var(--border)] bg-[var(--card)] p-2">
                <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-24 object-cover rounded" />
                <button onClick={() => removeFile(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">✕</button>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 truncate">{f.name}</p>
              </div>
            ))}
          </div>
        )}
        <button onClick={convert} disabled={files.length === 0} className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">Convert to PDF</button>
        {status && <div className="text-sm text-[var(--muted-foreground)] text-center">{status}</div>}
      </div>
    </ToolLayout>
  );
}
