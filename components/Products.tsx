import Reveal from "./Reveal";

const products = [
  {
    glyph: "◆",
    name: "FridayLead",
    category: "B2B lead generation",
    url: "https://fridaylead.com",
    description:
      "A searchable database of verified business contacts, with every email re-verified automatically.",
  },
  {
    glyph: "▣",
    name: "ContentFlow",
    category: "AI content generation",
    url: "https://topanglelead.com",
    description:
      "Platform-specific social content, written in a human voice, generated from a single prompt.",
  },
  {
    glyph: "⚡",
    name: "mailverify",
    category: "Email verification",
    url: "https://goanglelead.com",
    description:
      "Bulk and single email verification with an API, built for teams that send cold email at volume.",
  },
  {
    glyph: "▤",
    name: "AutoZoom",
    category: "Screen recording",
    url: "https://autozoom.app",
    description:
      "An AI screen recorder that finds the moments worth zooming into, without a Mac requirement.",
  },
  {
    glyph: "◎",
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
              className="mt-6 text-4xl font-semibold sm:text-5xl"
            >
              We do not just build software. We run it.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted">
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
                <div aria-hidden className="text-2xl text-accent">
                  {product.glyph}
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{product.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {product.category}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted">
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
              <div aria-hidden className="text-2xl text-accent">
                →
              </div>
              <h3 className="mt-5 text-2xl font-semibold">And yours next.</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
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
