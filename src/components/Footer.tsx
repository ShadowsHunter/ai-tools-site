import Link from "next/link";
import { Sparkles } from "lucide-react";

const toolLinks = [
  { name: "Word Counter", href: "/tools/word-counter" },
  { name: "JSON Formatter", href: "/tools/json-formatter" },
  { name: "Base64 Encoder", href: "/tools/base64" },
  { name: "QR Code Generator", href: "/tools/qr-code" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
  { name: "Color Picker", href: "/tools/color-picker" },
];

const resourceLinks = [
  { name: "AI Tools Directory", href: "/ai-tools" },
  { name: "Blog", href: "/blog" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Sparkles className="h-5 w-5 text-[var(--primary)]" />
              AI Tools Hub
            </Link>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              Free online tools & AI directory for developers, designers, and
              creators. No signup required.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-sm mb-4">About</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              AI Tools Hub provides free, fast, and privacy-friendly online
              tools. All processing happens in your browser — we never store
              your data.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} AI Tools Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
