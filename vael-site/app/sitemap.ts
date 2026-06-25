import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/caseStudies";

const SITE = "https://vael.studio"; // TODO: replace

export default function sitemap(): MetadataRoute.Sitemap {
  const base = [
    { url: SITE, priority: 1 },
    { url: `${SITE}/work`, priority: 0.8 },
  ];
  const work = getAllCaseStudies().map((c) => ({
    url: `${SITE}/work/${c.slug}`,
    priority: 0.7,
  }));
  return [...base, ...work];
}
