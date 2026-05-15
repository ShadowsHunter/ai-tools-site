import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AI Tools Hub. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none dark:prose-invert space-y-6">
        <p><em>Last updated: May 2026</em></p>

        <h2>1. Information We Collect</h2>
        <p>
          AI Tools Hub is designed with privacy in mind. Our online tools
          process all data directly in your browser. We do not collect, store,
          or transmit any content you create using our tools.
        </p>
        <p>
          We may collect anonymized analytics data (page views, browser type,
          country) through privacy-respecting analytics to improve our service.
        </p>

        <h2>2. Cookies</h2>
        <p>
          We use minimal cookies necessary for the website to function. We do
          not use tracking cookies or sell any data to third parties.
        </p>

        <h2>3. Third-Party Services</h2>
        <p>
          We display advertisements through Google AdSense. Google may use
          cookies to serve ads based on your prior visits. You can opt out of
          personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>.
        </p>

        <h2>4. Data Security</h2>
        <p>
          All tool processing happens client-side. Your data never leaves your
          browser. We have no access to any content you create or process.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page.
        </p>

        <h2>6. Contact</h2>
        <p>
          Questions? Contact us at privacy@aitoolshub.com
        </p>
      </div>
    </div>
  );
}
