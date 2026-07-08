import { getFeaturedCaseStudies } from "@/lib/caseStudies";
import CaseStudyCard from "./CaseStudyCard";
import Reveal from "./Reveal";

export default async function CaseStudies() {
  const studies = await getFeaturedCaseStudies();

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t border-border py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">Selected work</span>
          <h2
            id="work-heading"
            className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl"
          >
            Real problems, measurable results.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
