import type { ReactNode } from "react";
import Reveal from "./Reveal";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type Product = {
  icon: ReactNode;
  name: string;
  category: string;
  url: string;
  description: string;
};

const products: Product[] = [
  {
    // Magnifying glass over a list: search across contact data.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M3 6h8M3 11h6M3 16h8" />
        <circle cx="16" cy="10" r="4.5" />
        <path d="m19.2 13.2 2.8 2.8" />
      </svg>
    ),
    name: "FridayLead",
    category: "B2B lead generation",
    url: "https://fridaylead.com",
    description:
      "A searchable database of verified business contacts, with every email re-verified automatically.",
  },
  {
    // Cascading cards: content variants from one prompt.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="3" y="3" width="12" height="8" rx="2" />
        <rect x="6" y="8" width="12" height="8" rx="2" />
        <rect x="9" y="13" width="12" height="8" rx="2" />
      </svg>
    ),
    name: "ContentFlow",
    category: "AI content generation",
    url: "https://topanglelead.com",
    description:
      "Platform-specific social content, written in a human voice, generated from a single prompt.",
  },
  {
    // Envelope with a check: verified email.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M2 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6.5" />
        <path d="m2 7.5 7.5 5L17 7.5" />
        <path d="M2 7v9a2 2 0 0 0 2 2h8" />
        <path d="m15.5 17.5 2 2 4-4.5" />
      </svg>
    ),
    name: "mailverify",
    category: "Email verification",
    url: "https://goanglelead.com",
    description:
      "Bulk and single email verification with an API, built for teams that send cold email at volume.",
  },
  {
    // Viewfinder with a focus point: the zoom-worthy moment.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M8 4H6a2 2 0 0 0-2 2v2" />
        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
        <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
        <path d="M16 20h2a2 2 0 0 0 2-2v-2" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
    name: "AutoZoom",
    category: "Screen recording",
    url: "https://autozoom.app",
    description:
      "An AI screen recorder that finds the moments worth zooming into, without a Mac requirement.",
  },
  {
    // Briefcase: agency operations.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="3" y="8" width="18" height="11" rx="2" />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M3 13h18" />
      </svg>
    ),
    name: "AngleDesk",
    category: "Agency operations",
    url: "https://angleleadteam.com",
    description:
      "Project, staff, and client management for agencies, with notifications wired into WhatsApp.",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="glow left-1/2 top-1/3 h-[600px] w-[1000px] -translate-x-1/2 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow text-center">Our own products</span>
            <h2
              id="products-heading"
              className="mt-6 text-4xl font-extrabold sm:text-5xl"
            >
              We do not just build software. We run it.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-text/85">
              Five products we designed, built, and operate ourselves. The same
              team builds yours.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={i * 80}>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group block h-full p-7"
              >
                <div aria-hidden className="text-accent">
                  {product.icon}
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-text">
                  {product.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {product.category}
                </p>
                <p className="mt-3 text-base leading-relaxed text-text/70">
                  {product.description}
                </p>
                <p className="mt-5 font-mono text-xs text-accent">
                  Visit site{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </a>
            </Reveal>
          ))}

          <Reveal delay={products.length * 80}>
            <div className="h-full rounded-2xl border border-border bg-surface p-7 shadow-[0_1px_2px_rgba(23,23,26,0.04),0_8px_24px_-12px_rgba(23,23,26,0.08)]">
              <div aria-hidden className="text-accent">
                <svg {...iconProps} aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-text">
                And yours next.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text/70">
                Every product here started as a scoped six week build. So can
                yours.
              </p>
              <a
                href="/order"
                className="btn-primary mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent-dim"
              >
                Start your project
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
