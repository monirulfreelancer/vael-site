import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allStudies, allPosts] = await Promise.all([
    getAllCaseStudies(),
    getAllPosts(),
  ]);

  const studies: MetadataRoute.Sitemap = allStudies.map((study) => ({
    url: `${SITE.url}/work/${study.slug}`,
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/blog`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/order`, changeFrequency: "monthly", priority: 0.9 },
    ...studies,
    ...posts,
  ];
}
