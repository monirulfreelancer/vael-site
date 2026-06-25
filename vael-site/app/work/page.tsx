import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllCaseStudies } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Our work",
  description: "Case studies — AI software, automation, and custom apps we've shipped.",
};

export default function WorkIndex() {
  const studies = getAllCaseStudies();
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow mb-4">Our work</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Every project, the same goal: measurable results.
          </h1>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {studies.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="group block rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent/60 transition-colors"
              >
                <div className="aspect-[16/10] bg-surface2 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full border border-accent/40 text-accent font-mono text-[11px] px-3 py-1">
                    {c.industry}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold">{c.title}</h2>
                  <p className="mt-4 font-mono text-xs text-accent">View case →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
