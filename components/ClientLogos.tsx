import Reveal from "./Reveal";

// Real clients, shown as text wordmarks. To add or remove one, edit this
// array: order here is display order, and the marquee duplicates the full
// list automatically for the seamless loop. If the list grows much longer,
// consider raising the marquee duration in globals.css so it stays readable.
const clients = [
  "Volante Technologies",
  "Devstorms",
  "Lucid Design Group",
  "MediMizer",
  "Kudit",
  "Venga",
  "Tomerlin-ERP",
  "Stone Enterprises",
  "AppJester",
  "nMile",
  "Integrity Consulting",
  "Team Soft Solutions",
];

// First letter of the first two words, or the first two letters for
// single-word names.
function initials(name: string): string {
  const words = name.split(" ");
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function ClientLogos() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="border-t border-border pb-14 pt-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(217,142,4,0.015), transparent 40%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <span id="clients-heading" className="eyebrow text-center mb-8 text-muted">
            Companies we have worked with
          </span>
        </Reveal>
      </div>

      <div className="marquee-track relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-bg to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-bg to-transparent"
        />

        <div className="marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {clients.map((client) => (
                <div
                  key={client}
                  className="group flex shrink-0 items-center gap-3 px-12"
                >
                  <span
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs font-semibold text-accent"
                  >
                    {initials(client)}
                  </span>
                  <span className="whitespace-nowrap font-display text-lg font-medium tracking-tight text-muted/80 underline decoration-transparent underline-offset-[6px] transition-colors group-hover:text-text group-hover:decoration-accent">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
