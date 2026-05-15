"use client";

import { useState, useCallback, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Upload, Download, ImageIcon } from "lucide-react";

export default function ImageCompressorPage() {
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [quality, setQuality] = useState(70);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const compress = useCallback(
    (file: File) => {
      setFileName(file.name);
      setOriginalSize(file.size);
      setCompressedUrl("");

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              setCompressedSize(blob.size);
              setCompressedUrl(URL.createObjectURL(blob));
            },
            "image/jpeg",
            quality / 100
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [quality]
  );

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) compress(file);
    },
    [compress]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) compress(file);
    },
    [compress]
  );

  const download = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = fileName.replace(/\.[^.]+$/, "-compressed.jpg");
    a.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
  };

  const savings =
    originalSize > 0
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : 0;

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size without losing quality. 100% client-side — your images never leave your browser."
    >
      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-[var(--border)] rounded-xl p-10 text-center cursor-pointer hover:border-[var(--primary)] transition-colors"
      >
        <Upload className="h-10 w-10 mx-auto text-[var(--muted-foreground)] mb-3" />
        <p className="font-medium">Drop an image here or click to upload</p>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Supports JPG, PNG, WebP
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      {/* Quality slider */}
      <div className="mt-6">
        <label className="text-sm font-medium mb-2 block">
          Quality: {quality}%
        </label>
        <input
          type="range"
          min={10}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
          <span>Smaller file</span>
          <span>Better quality</span>
        </div>
      </div>

      {/* Results */}
      {originalSize > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-[var(--muted)] p-4 text-center">
            <div className="text-xs text-[var(--muted-foreground)]">
              Original
            </div>
            <div className="text-xl font-bold mt-1">
              {formatBytes(originalSize)}
            </div>
          </div>
          <div className="rounded-lg bg-[var(--muted)] p-4 text-center">
            <div className="text-xs text-[var(--muted-foreground)]">
              Compressed
            </div>
            <div className="text-xl font-bold text-[var(--primary)] mt-1">
              {formatBytes(compressedSize)}
            </div>
          </div>
          <div className="rounded-lg bg-[var(--muted)] p-4 text-center">
            <div className="text-xs text-[var(--muted-foreground)]">Saved</div>
            <div className="text-xl font-bold text-green-600 mt-1">
              {savings}%
            </div>
          </div>
        </div>
      )}

      {/* Download */}
      {compressedUrl && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={download}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download Compressed Image
          </button>
        </div>
      )}

      {/* Re-compress when quality changes */}
      {fileName && originalSize > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-secondary text-sm"
          >
            Upload Different Image
          </button>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Image Compressor",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
