import Reveal from "./Reveal";

// Placeholder text lettermarks. To swap in real image logos later: drop the
// files into public/logos/ (SVG preferred), change this array to objects like
// { name: "Northwind", src: "/logos/northwind.svg" }, and replace the bordered
// letter square + name spans below with an <img> sized to a fixed height
// (e.g. h-6 w-auto) so the marquee rows keep a consistent scale.
const clients = [
  "Northwind",
  "Apex Labs",
  "Brightly",
  "Vertex",
  "Lumen",
  "Quanta",
  "Helios",
  "Cobalt",
];

export default function ClientLogos() {
  return (
    <section
      className="border-t border-border py-12"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,194,75,0.015), transparent 40%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow text-center mb-8 text-muted">
            Trusted by teams who needed it shipped
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
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {clients.map((client) => (
                <div
                  key={client}
                  className="flex shrink-0 items-center gap-2.5 px-10"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border font-mono text-xs text-accent">
                    {client[0]}
                  </span>
                  <span className="whitespace-nowrap font-mono text-lg tracking-tight text-muted">
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
