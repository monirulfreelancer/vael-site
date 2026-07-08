import { db } from "./db";

export type Metric = {
  value: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating?: number;
};

export type CaseStudyMeta = {
  slug: string;
  title: string;
  industry: string;
  client: string;
  year: number;
  duration: string;
  services: string[];
  thumbnail: string;
  featured: boolean;
  metrics: Metric[];
  testimonial?: Testimonial;
};

export type CaseStudy = CaseStudyMeta & { content: string };

type CaseStudyRow = {
  slug: string;
  title: string;
  industry: string;
  client: string;
  year: number;
  duration: string;
  services: string[];
  thumbnail: string;
  featured: boolean;
  metrics: unknown;
  testimonial: unknown;
  body?: string;
};

function toMeta(row: CaseStudyRow): CaseStudyMeta {
  return {
    slug: row.slug,
    title: row.title,
    industry: row.industry,
    client: row.client,
    year: row.year,
    duration: row.duration,
    services: row.services,
    thumbnail: row.thumbnail,
    featured: row.featured,
    metrics: (row.metrics ?? []) as Metric[],
    testimonial: (row.testimonial as Testimonial | null) ?? undefined,
  };
}

export async function getAllCaseStudies(): Promise<CaseStudyMeta[]> {
  try {
    const rows = await db.caseStudy.findMany({
      where: { published: true },
      orderBy: { year: "desc" },
    });
    return rows.map(toMeta);
  } catch {
    return [];
  }
}

export async function getFeaturedCaseStudies(): Promise<CaseStudyMeta[]> {
  try {
    const rows = await db.caseStudy.findMany({
      where: { published: true, featured: true },
      orderBy: { year: "desc" },
    });
    return rows.map(toMeta);
  } catch {
    return [];
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const row = await db.caseStudy.findFirst({
      where: { slug, published: true },
    });
    if (!row) return null;
    return { ...toMeta(row), content: row.body };
  } catch {
    return null;
  }
}
