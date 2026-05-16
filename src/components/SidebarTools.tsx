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
  Shield,
  Maximize,
  RefreshCw,
  DollarSign,
  Heart,
  CalendarDays,
  Percent,
  FileStack,
  Scissors,
  FileImage,
} from "lucide-react";

const tools = [
  { name: "Word Counter", href: "/tools/word-counter", icon: Type },
  { name: "Text Case Converter", href: "/tools/text-case", icon: Type },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum", icon: AlignLeft },
  { name: "Markdown→HTML", href: "/tools/markdown-html", icon: FileCode },
  { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
  { name: "Base64 Encoder", href: "/tools/base64", icon: Binary },
  { name: "URL Encoder", href: "/tools/url-encoder", icon: LinkIcon },
  { name: "Regex Tester", href: "/tools/regex-tester", icon: Braces },
  { name: "CSS Minifier", href: "/tools/css-minifier", icon: FileCode },
  { name: "Image Compressor", href: "/tools/image-compressor", icon: ImageIcon },
  { name: "Image Resizer", href: "/tools/image-resizer", icon: Maximize },
  { name: "Image Format Converter", href: "/tools/image-format-converter", icon: RefreshCw },
  { name: "QR Code Generator", href: "/tools/qr-code", icon: QrCode },
  { name: "Color Picker", href: "/tools/color-picker", icon: Palette },
  { name: "Unit Converter", href: "/tools/unit-converter", icon: Ruler },
  { name: "Currency Converter", href: "/tools/currency-converter", icon: DollarSign },
  { name: "BMI Calculator", href: "/tools/bmi-calculator", icon: Heart },
  { name: "Age Calculator", href: "/tools/age-calculator", icon: CalendarDays },
  { name: "Percentage Calculator", href: "/tools/percentage-calculator", icon: Percent },
  { name: "PDF Merge", href: "/tools/pdf-merge", icon: FileStack },
  { name: "PDF Split", href: "/tools/pdf-split", icon: Scissors },
  { name: "PDF to Image", href: "/tools/pdf-to-image", icon: FileImage },
  { name: "Image to PDF", href: "/tools/image-to-pdf", icon: FileImage },
  { name: "Password Generator", href: "/tools/password-generator", icon: Shield },
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
