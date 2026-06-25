import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content/case-studies");

export type Metric = { value: string; label: string };
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

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), "utf8");
      const { data } = matter(raw);
      return { ...(data as Omit<CaseStudyMeta, "slug">), slug: f.replace(/\.mdx$/, "") };
    })
    .sort((a, b) => b.year - a.year);
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudies().filter((c) => c.featured);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as Omit<CaseStudyMeta, "slug">), slug, content };
}
