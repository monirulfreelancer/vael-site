import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf8");
      const { data } = matter(raw);
      return { ...data, slug: file.replace(/\.mdx$/, "") } as CaseStudyMeta;
    })
    .sort((a, b) => b.year - a.year);
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudies().filter((study) => study.featured === true);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...data, slug, content } as CaseStudy;
}
