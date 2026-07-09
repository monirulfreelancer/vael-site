"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Adds an `in` class to its own element the first time it scrolls into view.
// Unlike Reveal, it applies no styles of its own, so the caller owns the
// animation entirely through CSS keyed on the `in` class.
export default function InView({
  children,
  className = "",
  "aria-hidden": ariaHidden,
}: {
  children: ReactNode;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden={ariaHidden}>
      {children}
    </div>
  );
}
