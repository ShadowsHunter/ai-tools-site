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
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ToolCard } from "@/components/ToolCard";

const tools = [
  {
    name: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs in real time.",
    href: "/tools/word-counter",
    icon: Type,
    category: "Text",
  },
  {
    name: "JSON Formatter",
    description: "Validate, format, and minify JSON data instantly.",
    href: "/tools/json-formatter",
    icon: Braces,
    category: "Developer",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings in your browser.",
    href: "/tools/base64",
    icon: Binary,
    category: "Developer",
  },
  {
    name: "QR Code Generator",
    description: "Create QR codes for URLs, text, or contact info — free.",
    href: "/tools/qr-code",
    icon: QrCode,
    category: "Utility",
  },
  {
    name: "Image Compressor",
    description: "Reduce image file size without losing quality. 100% client-side.",
    href: "/tools/image-compressor",
    icon: ImageIcon,
    category: "Image",
  },
  {
    name: "Color Picker",
    description: "Pick colors and get HEX, RGB, HSL values instantly.",
    href: "/tools/color-picker",
    icon: Palette,
    category: "Design",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode or decode URL components safely.",
    href: "/tools/url-encoder",
    icon: LinkIcon,
    category: "Developer",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and layouts.",
    href: "/tools/lorem-ipsum",
    icon: AlignLeft,
    category: "Text",
  },
  {
    name: "Unit Converter",
    description: "Convert between length, weight, temperature, and more.",
    href: "/tools/unit-converter",
    icon: Ruler,
    category: "Utility",
  },
  {
    name: "Markdown to HTML",
    description: "Convert Markdown text to clean HTML instantly.",
    href: "/tools/markdown-html",
    icon: FileCode,
    category: "Developer",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools run in your browser. No uploads, no waiting.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data never leaves your device. 100% client-side processing.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Discover the best AI tools curated for every use case.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Free Online Tools{" "}
            <span className="text-[var(--primary)]">&</span>{" "}
            AI Directory
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Fast, free, and privacy-friendly tools for developers, designers, and
            creators. Plus a curated directory of the best AI tools.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/word-counter"
              className="btn-primary text-base px-6 py-3"
            >
              Browse Tools
            </Link>
            <Link
              href="/ai-tools"
              className="btn-secondary text-base px-6 py-3"
            >
              AI Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[var(--border)] bg-[var(--muted)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Free Online Tools</h2>
            <p className="mt-1 text-[var(--muted-foreground)]">
              No signup, no ads clutter — just tools that work.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* AI Tools CTA */}
      <section className="bg-[var(--primary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Discover the Best AI Tools
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            A curated directory of 50+ AI tools for writing, images, video, code,
            and more — updated weekly.
          </p>
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 mt-8 bg-white text-[var(--primary)] font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
          >
            Explore AI Directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
