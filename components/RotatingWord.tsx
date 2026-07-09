"use client";

import { useEffect, useState } from "react";

const words = ["apps", "agents", "automation"];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  if (reduced) {
    return <span className="font-semibold text-accent">automation</span>;
  }

  const prev = (index - 1 + words.length) % words.length;

  return (
    <span className="rotating-word">
      {/* Reserves the widest word's box so nothing shifts as words change. */}
      <span className="rotating-word__sizer" aria-hidden="true">
        automation
      </span>
      <span className="rotating-word__clip">
        {animate && (
          <span
            key={`out-${index}`}
            aria-hidden="true"
            className="rotating-word__word is-out"
          >
            {words[prev]}
          </span>
        )}
        <span
          key={`in-${index}`}
          className={`rotating-word__word${animate ? " is-in" : ""}`}
        >
          {words[index]}
        </span>
      </span>
    </span>
  );
}
