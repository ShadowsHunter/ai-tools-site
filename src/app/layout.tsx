import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
