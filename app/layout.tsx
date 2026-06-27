import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const SITE = "https://vael.studio"; // TODO: replace with your domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Vael — AI software development agency",
    template: "%s · Vael",
  },
  description:
    "We build AI-powered software that moves your business forward. Custom apps, automation, and AI solutions — from MVP to production, shipped in weeks.",
  keywords: [
    "AI software development",
    "custom AI apps",
    "MVP development",
    "business automation",
    "AI agency",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    title: "Vael — AI software development agency",
    description:
      "AI-powered software, built by a senior team and accelerated by AI. Shipped in weeks, not quarters.",
    siteName: "Vael",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vael — AI software development agency",
    description:
      "AI-powered software, built fast. From MVP to production in weeks.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
