import Reveal from "./Reveal";

const items = [
  {
    quote:
      "We launched faster than we thought possible, and sales followed. The whole process was clear from day one.",
    author: "Sarah Chen",
    role: "Founder, [Company]",
    rating: 5,
  },
  {
    quote:
      "Our support queue dropped overnight. Customers genuinely can't tell it's AI handling them.",
    author: "Priya Nair",
    role: "Head of Ops, [Company]",
    rating: 5,
  },
  {
    quote:
      "It runs the back office for us now. I got my evenings back. Best money we've spent.",
    author: "Marcus Reid",
    role: "Owner, [Company]",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">What clients say</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
            Trusted by founders and teams who needed it shipped.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.author} delay={i * 80}>
              <figure className="card h-full p-7 flex flex-col">
                <div className="text-accent text-sm mb-4">
                  {"★".repeat(t.rating)}
                </div>
                <blockquote className="text-text/90 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-medium">{t.author}</p>
                  <p className="font-mono text-xs text-muted">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
