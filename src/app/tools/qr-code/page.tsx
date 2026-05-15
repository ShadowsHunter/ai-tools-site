"use client";

import { useState, useCallback, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Download } from "lucide-react";
import QRCode from "qrcode";

export default function QrCodePage() {
  const [text, setText] = useState("https://example.com");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!text.trim()) return;
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error("QR generation failed:", err);
    }
  }, [text, size, fgColor, bgColor]);

  const download = useCallback(() => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  }, [qrDataUrl]);

  return (
    <ToolLayout
      title="Free QR Code Generator"
      description="Create QR codes for URLs, text, email, or phone numbers. Download as PNG — no signup required."
    >
      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">Text or URL</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Size (px)</label>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          >
            <option value={200}>200 × 200</option>
            <option value={300}>300 × 300</option>
            <option value={500}>500 × 500</option>
            <option value={1000}>1000 × 1000</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Foreground Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-10 w-10 rounded cursor-pointer border-0"
            />
            <span className="text-sm font-mono">{fgColor}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Background Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-10 rounded cursor-pointer border-0"
            />
            <span className="text-sm font-mono">{bgColor}</span>
          </div>
        </div>
      </div>

      <button onClick={generate} className="btn-primary mb-6">
        Generate QR Code
      </button>

      {/* Result */}
      {qrDataUrl && (
        <div className="flex flex-col items-center gap-4 rounded-lg bg-[var(--muted)] p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt={`QR code for ${text}`}
            width={size}
            height={size}
            className="rounded-lg max-w-full"
          />
          <button
            onClick={download}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download PNG
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div>
          <h3 className="font-semibold">
            Can I use these QR codes commercially?
          </h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Yes. QR codes generated here are free for personal and commercial
            use.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">What formats can I download?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Currently PNG. Higher resolutions (500px, 1000px) work well for
            printing.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Is this QR code generator free?</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Yes, 100% free. No signup required. All generation happens in your
            browser.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Free QR Code Generator",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </ToolLayout>
  );
}
