"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { RefreshCw } from "lucide-react";

export default function ImageFormatConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"image/png" | "image/jpeg" | "image/webp">("image/png");
  const [quality, setQuality] = useState(92);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (f: File) => {
    if (f.type.startsWith("image/")) setFile(f);
  };

  const convert = () => {
    if (!file || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const ext = format.split("/")[1];
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `converted.${ext}`;
            a.click();
            URL.revokeObjectURL(url);
          }
        },
        format,
        quality / 100
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const formats = [
    { value: "image/png" as const, label: "PNG", desc: "Lossless, supports transparency" },
    { value: "image/jpeg" as const, label: "JPEG", desc: "Smaller size, no transparency" },
    { value: "image/webp" as const, label: "WebP", desc: "Modern, best compression" },
  ];

  return (
    <ToolLayout title="Image Format Converter" description="Convert images between PNG, JPEG, and WebP formats. Free online converter.">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={() => document.getElementById("img-input")?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}>
          <input id="img-input" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          {file ? <p className="text-sm">{file.name} ({file.type}, {(file.size / 1024).toFixed(0)} KB)</p> : <p className="text-[var(--muted-foreground)]">Drop an image here or click to upload</p>}
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Convert to</label>
          <div className="grid grid-cols-3 gap-3">
            {formats.map((f) => (
              <button key={f.value} onClick={() => setFormat(f.value)} className={`rounded-lg border p-3 text-left transition-all ${format === f.value ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)]"}`}>
                <div className="font-medium text-sm">{f.label}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>
        {format !== "image/png" && (
          <div>
            <div className="flex justify-between text-sm mb-1"><span>Quality</span><span className="font-mono">{quality}%</span></div>
            <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </div>
        )}
        <button onClick={convert} disabled={!file} className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">Convert & Download</button>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
}
