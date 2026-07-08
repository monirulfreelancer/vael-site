"use client";

import { useState } from "react";
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
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const count = testimonials.length;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="glow -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 opacity-[0.10]"
        style={{
          background: "radial-gradient(closest-side, #FFC24B, transparent)",
        }}
      />
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

        <Reveal delay={120}>
          <div className="mt-16 sm:mt-20">
            <figure
              key={index}
              aria-label={`${t.rating} out of 5 stars`}
              className="fade-in mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-10 text-center sm:p-16"
            >
              <div aria-hidden className="text-sm text-accent">
                {"★".repeat(t.rating)}
              </div>
              <div
                aria-hidden
                className="mt-4 font-display text-6xl leading-none text-accent"
              >
                &ldquo;
              </div>
              <blockquote className="mt-2 text-2xl leading-snug sm:text-3xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-medium">{t.author}</div>
                <div className="mt-1 font-mono text-xs text-muted">
                  {t.role}
                </div>
              </figcaption>
            </figure>

            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => setIndex((index + count - 1) % count)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-text"
              >
                <span aria-hidden>←</span>
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.author}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-accent" : "w-1.5 bg-muted/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIndex((index + 1) % count)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-text"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
