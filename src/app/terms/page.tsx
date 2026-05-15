import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for AI Tools Hub.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-sm max-w-none dark:prose-invert space-y-6">
        <p><em>Last updated: May 2026</em></p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing AI Tools Hub, you agree to these Terms of Service. If
          you do not agree, please do not use the site.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          Our tools are provided free of charge for personal and commercial
          use. You agree not to misuse the service or attempt to disrupt it.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on AI Tools Hub, including text, graphics, and code, is
          our property or licensed to us. Tools generate output that you own.
        </p>

        <h2>4. Disclaimer</h2>
        <p>
          Tools are provided &quot;as is&quot; without warranties. We are not
          liable for any damages arising from use of the service.
        </p>

        <h2>5. Changes</h2>
        <p>
          We reserve the right to modify or discontinue any tool or feature at
          any time.
        </p>
      </div>
    </div>
  );
}
