import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "We launched faster than we thought possible, and sales followed. The whole process was clear from day one.",
    author: "Sarah Chen",
    role: "Founder, [Company]",
    rating: 5,
  },
  {
    quote:
      "Our support queue dropped overnight. Customers cannot tell it is AI handling them.",
    author: "Priya Nair",
    role: "Head of Ops, [Company]",
    rating: 5,
  },
  {
    quote:
      "It runs the back office for us now. I got my evenings back. Best money we have spent.",
    author: "Marcus Reid",
    role: "Owner, [Company]",
    rating: 5,
  },
];

export default function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">What clients say</span>
          <h2
            id="testimonials-heading"
            className="mt-6 max-w-2xl text-4xl font-semibold sm:text-5xl"
          >
            Founders and teams who needed it shipped.
          </h2>
        </Reveal>

        <Reveal>
          <figure className="mt-16 rounded-2xl border border-border bg-surface p-10 sm:mt-20 sm:p-14">
            <div
              aria-hidden
              className="font-display text-6xl leading-none text-accent"
            >
              &ldquo;
            </div>
            <blockquote className="mt-4 text-2xl leading-snug text-text sm:text-3xl">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-medium">{featured.author}</div>
                <div className="font-mono text-xs text-muted">
                  {featured.role}
                </div>
              </div>
              <div
                className="text-sm text-accent"
                aria-label={`${featured.rating} out of 5 stars`}
              >
                <span aria-hidden>{"★".repeat(featured.rating)}</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.author} delay={i * 80}>
              <figure className="card flex h-full flex-col p-7">
                <div
                  className="mb-4 text-sm text-accent"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  <span aria-hidden>{"★".repeat(t.rating)}</span>
                </div>
                <blockquote className="flex-1 leading-relaxed text-text/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <div className="font-medium">{t.author}</div>
                  <div className="font-mono text-xs text-muted">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
