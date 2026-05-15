import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - AI Tools & Online Tools Guides",
  description:
    "In-depth guides, reviews, and comparisons of the best AI tools and online utilities. Stay updated with the latest in AI.",
};

const posts = [
  {
    slug: "best-ai-writing-tools-2026",
    title: "Best AI Writing Tools in 2026: Complete Comparison",
    excerpt:
      "We tested 15+ AI writing tools to find the best ones for blogs, emails, and creative writing. Here are our top picks.",
    date: "2026-05-10",
    readTime: "8 min",
    category: "AI Writing",
  },
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude: Which AI Assistant Should You Use?",
    excerpt:
      "A detailed comparison of ChatGPT and Claude across writing, coding, analysis, and more. Real examples included.",
    date: "2026-05-05",
    readTime: "10 min",
    category: "AI Chatbots",
  },
  {
    slug: "free-ai-image-generators",
    title: "8 Best Free AI Image Generators (No Signup Required)",
    excerpt:
      "Create AI images for free with these tools. No credit card, no signup — just type and generate.",
    date: "2026-04-28",
    readTime: "6 min",
    category: "AI Image",
  },
  {
    slug: "ai-code-assistants-compared",
    title: "AI Code Assistants Compared: Copilot vs Cursor vs Cody",
    excerpt:
      "We compared the top AI coding tools on real-world tasks. Here's which one actually makes you more productive.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "AI Code",
  },
  {
    slug: "best-ai-tools-for-students",
    title: "15 Best AI Tools for Students (Most Are Free)",
    excerpt:
      "From note-taking to essay writing to math solving — the best AI tools every student should know about.",
    date: "2026-04-15",
    readTime: "7 min",
    category: "Education",
  },
  {
    slug: "free-alternatives-jasper-ai",
    title: "6 Free Alternatives to Jasper AI in 2026",
    excerpt:
      "Jasper is great but pricey. Here are 6 free or cheaper alternatives that deliver similar results.",
    date: "2026-04-08",
    readTime: "5 min",
    category: "AI Writing",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          AI Tools Blog
        </h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Guides, reviews, and comparisons to help you find the best AI tools.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
              <span className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 font-medium text-[var(--primary)]">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} read
              </span>
            </div>
            <h2 className="text-xl font-semibold hover:text-[var(--primary)] transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-[var(--muted-foreground)] text-sm line-clamp-2">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[var(--primary)] hover:underline"
            >
              Read more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>

      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "AI Tools Hub Blog",
            description:
              "Guides, reviews, and comparisons of the best AI tools.",
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.date,
              description: p.excerpt,
            })),
          }),
        }}
      />
    </div>
  );
}
