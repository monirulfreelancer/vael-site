import Reveal from "./Reveal";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most MVPs ship in six weeks. Larger builds run eight to twelve weeks. We give you a fixed timeline before any work begins, and we hold to it.",
  },
  {
    question: "What does an AI project actually cost?",
    answer:
      "Projects start at $10,000 for an MVP and run to $75,000 or more for complex platforms. You get a fixed-price quote after the discovery call, never an open-ended hourly bill.",
  },
  {
    question: "Do I own the code you write?",
    answer:
      "Yes. Every line, every asset, and the infrastructure it runs on. There is no per-seat licensing and no vendor lock-in.",
  },
  {
    question: "What if I do not know exactly what I need?",
    answer:
      "That is what discovery is for. Most clients arrive with a problem, not a spec. We help you decide what to build, what to skip, and where AI adds real value.",
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer:
      "Yes. We regularly build on top of existing systems, integrate with legacy tools, and hand work back to in-house teams with full documentation.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes launch support. From there you can take it in-house or keep us on a monthly retainer for features, fixes, and improvements.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="glow -bottom-56 left-1/2 h-[500px] w-[900px] -translate-x-1/2 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">Common questions</span>
          <h2
            id="faq-heading"
            className="mt-6 max-w-2xl text-4xl font-extrabold sm:text-5xl"
          >
            Everything you want to know before we start.
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl space-y-3 sm:mt-20">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="ml-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-base leading-relaxed text-text/75">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
