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
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">What clients say</span>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Founders and teams who needed it shipped.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 80}>
              <figure className="card flex h-full flex-col p-7">
                <div className="mb-4 text-sm text-accent">
                  {"★".repeat(t.rating)}
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
