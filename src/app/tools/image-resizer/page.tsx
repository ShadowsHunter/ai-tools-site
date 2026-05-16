"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Maximize } from "lucide-react";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockRatio, setLockRatio] = useState(true);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const img = new Image();
    img.onload = () => {
      setOriginalSize({ w: img.width, h: img.height });
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = URL.createObjectURL(f);
  };

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (lockRatio && originalSize.w > 0) {
      setHeight(Math.round(w * (originalSize.h / originalSize.w)));
    }
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (lockRatio && originalSize.h > 0) {
      setWidth(Math.round(h * (originalSize.w / originalSize.h)));
    }
  };

  const resize = () => {
    if (!file || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `resized-${width}x${height}-${file.name}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, file.type || "image/png");
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <ToolLayout title="Image Resizer" description="Resize images online. Maintain aspect ratio, preview, and download.">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={() => document.getElementById("file-input")?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}>
          <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          {file ? <p className="text-sm">Selected: {file.name} ({originalSize.w}×{originalSize.h})</p> : <p className="text-[var(--muted-foreground)]">Drop image here or click to upload</p>}
        </div>
        <div className="flex items-end gap-4">
          <div><label className="text-xs font-medium block mb-1">Width</label><input type="number" className="w-28 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} /></div>
          <button onClick={() => setLockRatio(!lockRatio)} className={`px-3 py-2 rounded-lg text-sm border ${lockRatio ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "border-[var(--border)]"}`}>🔗</button>
          <div><label className="text-xs font-medium block mb-1">Height</label><input type="number" className="w-28 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} /></div>
        </div>
        <button onClick={resize} disabled={!file} className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">Resize & Download</button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
}
