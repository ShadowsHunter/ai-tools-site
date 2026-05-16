import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { blogPosts, getBlogPost, getAllSlugs } from "@/data/blog-posts";
import { moreBlogPosts } from "@/data/blog-posts-more";

const allPosts = [...blogPosts, ...moreBlogPosts];
const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);
const allSlugs = () => allPosts.map((p) => p.slug);

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["AI Tools Hub"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Simple markdown-ish renderer (handles ##, ###, **, tables, lists)
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {tableHeaders.map((h, hi) => (
                  <th
                    key={hi}
                    className="border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-left font-semibold"
                  >
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-[var(--border)] px-4 py-2"
                    >
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  };

  const renderInline = (text: string): React.ReactNode => {
    // Handle **bold** and simple inline formatting
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pi}>{part.slice(2, -2)}</strong>;
      }
      return <span key={pi}>{part}</span>;
    });
  };

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "" && !c.match(/^[\s-]+$/));
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else if (cells.every((c) => c.match(/^[\s-:]+$/))) {
        // separator row, skip
      } else {
        tableRows.push(cells);
      }
      i++;
      // Check if next line is not a table row
      if (i >= lines.length || !lines[i].trim().startsWith("|")) {
        flushTable();
      }
      continue;
    }

    if (inTable) flushTable();

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl font-bold mt-10 mb-4 text-[var(--foreground)]"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="text-xl font-semibold mt-8 mb-3 text-[var(--foreground)]"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // List item
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 my-3 space-y-1">
          {items.map((item, li) => (
            <li key={li} className="text-[var(--muted-foreground)]">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (line.trim().match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().match(/^\d+\.\s/)
      ) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal pl-6 my-3 space-y-1">
          {items.map((item, li) => (
            <li key={li} className="text-[var(--muted-foreground)]">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="my-3 text-[var(--muted-foreground)] leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  if (inTable) flushTable();

  return elements;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Find related posts (same category, different slug)
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-4">
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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--muted-foreground)]">
          {post.excerpt}
        </p>
      </header>

      {/* Content */}
      <div className="prose-custom">{renderContent(post.content)}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[var(--border)]">
        <Tag className="h-4 w-4 text-[var(--muted-foreground)]" />
        {post.keywords.map((kw) => (
          <span
            key={kw}
            className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2.5 py-1 rounded-full"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
          <div className="grid gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-medium text-[var(--primary)]">
                  {r.category}
                </span>
                <h4 className="mt-1 font-semibold">{r.title}</h4>
                <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
                  {r.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: "AI Tools Hub" },
            publisher: { "@type": "Organization", name: "AI Tools Hub" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://aitoolshub.com/blog/${post.slug}`,
            },
          }),
        }}
      />
    </article>
  );
}
