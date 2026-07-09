"use client";

import { useEffect, useRef, useState } from "react";

// Split "20+" into { prefix: "", digits: "20", suffix: "+" }. Returns null when
// the value has no integer to animate (for example "AI-first" or "[X]+").
function parse(value: string) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], target: parseInt(match[2], 10), suffix: match[3] };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Counter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const parsed = parse(value);
  // SSR and the no-JS fallback render the final value.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const format = (n: number) => `${parsed.prefix}${n}${parsed.suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(format(parsed.target));
      return;
    }

    // Reset to the start off-screen (this card is below the fold), then count
    // up on first intersection.
    setDisplay(format(0));

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const duration = 1200;
        let start: number | null = null;
        const step = (timestamp: number) => {
          if (start === null) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const current = Math.round(easeOutCubic(progress) * parsed.target);
          setDisplay(format(current));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div ref={ref}>
      <div className="text-3xl font-bold text-accent">{display}</div>
      <div className="mt-1 font-mono text-xs text-muted">{label}</div>
    </div>
  );
}
