import Reveal from "./Reveal";

// Replace these with your real client names/logos later.
// To use image logos instead of text: swap the <span> for
// <img src="/logos/yourclient.svg" alt="Client" className="h-7 opacity-60" />
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

function LogoRow() {
  return (
    <>
      {clients.map((name, i) => (
        <div
          key={`${name}-${i}`}
          className="flex items-center gap-2.5 px-10 shrink-0"
        >
          <span className="grid place-items-center w-6 h-6 rounded-md border border-border text-accent font-mono text-xs">
            {name[0]}
          </span>
          <span className="font-mono text-lg tracking-tight text-muted whitespace-nowrap">
            {name}
          </span>
        </div>
      ))}
    </>
  );
}

export default function ClientLogos() {
  return (
    <section className="py-12 border-t border-border section-soft">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center">
        <Reveal>
          <p className="eyebrow text-center !text-muted mb-8">
            Trusted by teams who needed it shipped
          </p>
        </Reveal>
      </div>

      {/* edge fade + marquee */}
      <div className="relative marquee-track overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: "linear-gradient(90deg, var(--color-bg), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: "linear-gradient(270deg, var(--color-bg), transparent)" }}
        />
        <div className="marquee">
          {/* duplicated for seamless loop */}
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </section>
  );
}
