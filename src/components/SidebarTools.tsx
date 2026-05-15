import Link from "next/link";
import {
  Type,
  Braces,
  Binary,
  QrCode,
  ImageIcon,
  Palette,
  LinkIcon,
  AlignLeft,
  Ruler,
  FileCode,
} from "lucide-react";

const tools = [
  { name: "Word Counter", href: "/tools/word-counter", icon: Type },
  { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
  { name: "Base64 Encoder", href: "/tools/base64", icon: Binary },
  { name: "QR Code Generator", href: "/tools/qr-code", icon: QrCode },
  { name: "Image Compressor", href: "/tools/image-compressor", icon: ImageIcon },
  { name: "Color Picker", href: "/tools/color-picker", icon: Palette },
  { name: "URL Encoder", href: "/tools/url-encoder", icon: LinkIcon },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum", icon: AlignLeft },
  { name: "Unit Converter", href: "/tools/unit-converter", icon: Ruler },
  { name: "Markdown→HTML", href: "/tools/markdown-html", icon: FileCode },
];

export function SidebarTools() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
      <h3 className="font-semibold text-sm mb-4">All Tools</h3>
      <ul className="space-y-1">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <tool.icon className="h-4 w-4 shrink-0" />
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
