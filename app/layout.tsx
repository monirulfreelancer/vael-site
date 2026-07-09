import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import type { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
import { SITE } from "@/lib/site";

const title = "Vael | AI software development agency";
const description =
  "We build AI software that does real work. Custom AI apps, agents, and automation, from MVP to production in weeks.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Vael",
  },
  description,
  keywords: [
    "AI software development agency",
    "custom AI agents",
    "RAG system development",
    "business process automation",
    "MVP development",
    "AI app development",
  ],
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  serviceType: [
    "AI Agents & Assistants",
    "AI-Powered Apps",
    "Business Automation",
    "Custom Software & MVPs",
  ],
  areaServed: "Worldwide",
  knowsAbout: [
    "AI agents",
    "RAG systems",
    "business process automation",
    "MVP development",
    "custom software development",
  ],
  owns: [
    { "@type": "Product", name: "FridayLead", url: "https://fridaylead.com" },
    { "@type": "Product", name: "ContentFlow", url: "https://topanglelead.com" },
    { "@type": "Product", name: "mailverify", url: "https://goanglelead.com" },
    { "@type": "Product", name: "AutoZoom", url: "https://autozoom.app" },
    { "@type": "Product", name: "AngleDesk", url: "https://angleleadteam.com" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement models",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Launch",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: 10000,
        },
      },
      {
        "@type": "Offer",
        name: "Build",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: 25000,
        },
      },
      {
        "@type": "Offer",
        name: "Scale",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: 75000,
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div aria-hidden className="grain" />
        <ScrollProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
