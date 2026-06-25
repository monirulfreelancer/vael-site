"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#pricing", label: "Pricing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? "bg-bg/85 backdrop-blur border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg tracking-tight">
          <span className="grid place-items-center w-7 h-7 border border-accent text-accent rounded-md text-sm">
            V
          </span>
          <span className="font-semibold">Vael</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="rounded-lg bg-accent px-4 py-2 font-medium text-bg hover:bg-accent-dim transition-colors"
          >
            Book a call
          </a>
        </div>

        <button
          className="md:hidden text-text text-2xl leading-none"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-bg px-5 py-4 flex flex-col gap-4 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-muted hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-accent px-4 py-2 font-medium text-bg text-center"
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}
