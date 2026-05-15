import type { Metadata } from "next";
import Link from "next/link";
import {
  Pen,
  ImageIcon,
  Video,
  Code,
  MessageSquare,
  Music,
  Search,
  Brain,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools Directory 2026",
  description:
    "A curated directory of the best AI tools for writing, images, video, code, and more. Updated weekly with honest reviews and comparisons.",
};

const categories = [
  { name: "AI Writing", icon: Pen, count: 12, slug: "writing" },
  { name: "AI Image", icon: ImageIcon, count: 15, slug: "image" },
  { name: "AI Video", icon: Video, count: 8, slug: "video" },
  { name: "AI Code", icon: Code, count: 10, slug: "code" },
  { name: "AI Chatbots", icon: MessageSquare, count: 6, slug: "chatbots" },
  { name: "AI Audio", icon: Music, count: 5, slug: "audio" },
  { name: "AI Search", icon: Search, count: 4, slug: "search" },
  { name: "AI Productivity", icon: Brain, count: 9, slug: "productivity" },
];

const featuredTools = [
  {
    name: "ChatGPT",
    category: "AI Chatbots",
    description:
      "OpenAI's conversational AI. Great for writing, coding, analysis, and brainstorming.",
    url: "https://chat.openai.com",
    pricing: "Free / $20/mo Pro",
  },
  {
    name: "Claude",
    category: "AI Chatbots",
    description:
      "Anthropic's AI assistant. Excellent for long-form writing, coding, and nuanced analysis.",
    url: "https://claude.ai",
    pricing: "Free / $20/mo Pro",
  },
  {
    name: "Midjourney",
    category: "AI Image",
    description:
      "Create stunning AI-generated images from text prompts. Top-tier quality.",
    url: "https://midjourney.com",
    pricing: "From $10/mo",
  },
  {
    name: "Cursor",
    category: "AI Code",
    description:
      "AI-first code editor. Built on VS Code with integrated AI coding assistant.",
    url: "https://cursor.sh",
    pricing: "Free / $20/mo Pro",
  },
  {
    name: "Runway",
    category: "AI Video",
    description:
      "AI-powered video generation and editing. Gen-3 model for realistic video creation.",
    url: "https://runwayml.com",
    pricing: "Free trial / From $12/mo",
  },
  {
    name: "ElevenLabs",
    category: "AI Audio",
    description:
      "Realistic AI voice generation and text-to-speech. Clone voices, create narration.",
    url: "https://elevenlabs.io",
    pricing: "Free / From $5/mo",
  },
  {
    name: "GitHub Copilot",
    category: "AI Code",
    description:
      "AI pair programmer. Autocompletes code, suggests functions, writes tests.",
    url: "https://github.com/features/copilot",
    pricing: "$10/mo / $19/mo",
  },
  {
    name: "Perplexity AI",
    category: "AI Search",
    description:
      "AI-powered search engine. Get cited answers instead of blue links.",
    url: "https://perplexity.ai",
    pricing: "Free / $20/mo Pro",
  },
  {
    name: "Notion AI",
    category: "AI Productivity",
    description:
      "AI writing and organization inside Notion. Summarize, draft, brainstorm.",
    url: "https://notion.so",
    pricing: "Add-on $10/mo",
  },
];

export default function AiToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)] mb-4">
          <Sparkles className="h-4 w-4" />
          Updated Weekly
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Best AI Tools Directory
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          A curated collection of the best AI tools for every use case. Honest
          reviews, real pricing, and hand-picked recommendations.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--primary)] hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <cat.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-sm">{cat.name}</div>
              <div className="text-xs text-[var(--muted-foreground)]">
                {cat.count} tools
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Tools */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-[var(--primary)] uppercase tracking-wide">
                    {tool.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold">{tool.name}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] line-clamp-2">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--muted-foreground)]">
                  {tool.pricing}
                </span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Visit <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog links for SEO */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-8">
        <h2 className="text-2xl font-bold mb-4">AI Tools Guides & Reviews</h2>
        <p className="text-[var(--muted-foreground)] mb-6">
          In-depth comparisons and guides to help you choose the right AI tools.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Best AI Writing Tools in 2026",
            "ChatGPT vs Claude: Which is Better?",
            "Best Free AI Image Generators",
            "AI Code Assistants Compared",
            "Best AI Tools for Students",
            "Free Alternatives to Jasper AI",
          ].map((title) => (
            <Link
              key={title}
              href="/blog"
              className="flex items-center gap-2 rounded-lg bg-[var(--background)] px-4 py-3 text-sm font-medium hover:shadow-sm transition-shadow"
            >
              📄 {title}
            </Link>
          ))}
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Best AI Tools Directory 2026",
            description:
              "A curated directory of the best AI tools for writing, images, video, code, and more.",
          }),
        }}
      />
    </div>
  );
}
