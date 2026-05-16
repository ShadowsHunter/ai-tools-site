import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  Check,
  X,
  Star,
  ArrowLeft,
  MessageCircle,
  DollarSign,
  Zap,
  Users,
} from "lucide-react";
import { aiTools, getAiTool, getAllToolSlugs } from "@/data/ai-tools";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getAiTool(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Review 2026 — Features, Pricing & Alternatives`,
    description: `${tool.description} Full review with features, pricing, pros, cons, and alternatives. Is ${tool.name} worth it?`,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} Review 2026`,
      description: tool.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} Review 2026`,
      description: tool.description,
    },
  };
}

export default async function AiToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getAiTool(slug);
  if (!tool) notFound();

  // Find alternatives from our database
  const alternativeTools = aiTools.filter(
    (t) => tool.alternatives.includes(t.name) && t.slug !== tool.slug
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/ai-tools"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to AI Tools Directory
      </Link>

      {/* Hero */}
      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
          <span className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 font-medium text-[var(--primary)]">
            {tool.category}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {tool.name} Review 2026
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] mb-6">
          {tool.longDescription}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Visit {tool.name} <ExternalLink className="h-4 w-4" />
          </a>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm">
            <DollarSign className="h-4 w-4 text-[var(--muted-foreground)]" />
            {tool.pricing}
          </span>
        </div>
      </header>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-[var(--primary)]" /> Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tool.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-2.5 rounded-lg bg-[var(--muted)] p-3"
            >
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-600">✅ Pros</h2>
          <ul className="space-y-2">
            {tool.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-500">❌ Cons</h2>
          <ul className="space-y-2">
            {tool.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm">
                <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Best For */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-[var(--primary)]" /> Best For
        </h2>
        <div className="flex flex-wrap gap-2">
          {tool.bestFor.map((use) => (
            <span
              key={use}
              className="rounded-full bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1.5 text-sm font-medium"
            >
              {use}
            </span>
          ))}
        </div>
      </section>

      {/* Alternatives */}
      {alternativeTools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Alternatives</h2>
          <div className="grid gap-4">
            {alternativeTools.map((alt) => (
              <Link
                key={alt.slug}
                href={`/ai-tools/${alt.slug}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-[var(--primary)]">
                      {alt.category}
                    </span>
                    <h3 className="mt-1 font-semibold text-lg">{alt.name}</h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {alt.description}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] shrink-0 ml-4">
                    {alt.pricing}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-[var(--primary)]" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {tool.faq.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rating summary */}
      <section className="mb-12 rounded-xl border border-[var(--border)] bg-[var(--muted)] p-6">
        <h2 className="text-xl font-bold mb-4">Our Verdict</h2>
        <div className="flex items-center gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-[var(--border)]"}`}
            />
          ))}
          <span className="font-semibold ml-1">4/5</span>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          {tool.name} is a solid choice for {tool.bestFor[0]?.toLowerCase()} and{" "}
          {tool.bestFor[1]?.toLowerCase()}. {tool.pros[0]}.{" "}
          {tool.cons[0]}.
        </p>
      </section>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            url: tool.url,
            applicationCategory: tool.category,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            review: {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "4",
                bestRating: "5",
              },
              author: { "@type": "Organization", name: "AI Tools Hub" },
            },
          }),
        }}
      />

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tool.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
