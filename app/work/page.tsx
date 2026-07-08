import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { getAllCaseStudies } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Case studies from Vael. AI apps, agents, and automation built for real businesses, with measurable results.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return (
    <>
      <Nav />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <span className="eyebrow">Our work</span>
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">
              Every project starts with the same goal, measurable results.
            </h1>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {studies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 80}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
