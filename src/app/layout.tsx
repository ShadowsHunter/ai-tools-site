import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Tools Hub - Free Online Tools & AI Directory",
    template: "%s | AI Tools Hub",
  },
  description:
    "Free online tools for developers, designers & creators. JSON formatter, image compressor, QR code generator, and 50+ AI tool recommendations.",
  keywords: [
    "AI tools",
    "free online tools",
    "JSON formatter",
    "image compressor",
    "QR code generator",
    "developer tools",
    "AI writing tools",
    "AI image generator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Hub",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "R_oGepEJTblu4u9o8hq_5R8bZRZ6tU78mfzdGP6m2pM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6P4F7BK4CX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6P4F7BK4CX');
          `}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
