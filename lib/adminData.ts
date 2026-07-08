import { db } from "./db";

export function listPosts() {
  return db.post.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      published: true,
      publishedAt: true,
      updatedAt: true,
    },
  });
}

export function listCaseStudies() {
  return db.caseStudy.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      industry: true,
      featured: true,
      published: true,
      updatedAt: true,
    },
  });
}

export function getPostById(id: string) {
  return db.post.findUnique({ where: { id } });
}

export function getCaseStudyById(id: string) {
  return db.caseStudy.findUnique({ where: { id } });
}

// Lowercase, drop anything that is not a letter, number, or space, collapse
// runs of whitespace into single hyphens, and trim stray hyphens.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}
