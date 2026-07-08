import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import matter from "gray-matter";
import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readMdx(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

async function seedPosts() {
  const posts = readMdx(BLOG_DIR);
  let created = 0;
  let updated = 0;

  for (const { slug, data, content } of posts) {
    const publishedAt = data.date ? new Date(data.date) : null;
    const published = data.published ?? false;
    const fields = {
      title: data.title,
      description: data.description,
      body: content,
      tags: (data.tags ?? []) as string[],
      author: data.author ?? "Vael",
      published,
      publishedAt,
    };

    const existing = await db.post.findUnique({ where: { slug } });
    await db.post.upsert({
      where: { slug },
      update: fields,
      create: { slug, ...fields },
    });
    if (existing) updated++;
    else created++;
  }

  return { created, updated, total: posts.length };
}

async function seedCaseStudies() {
  const studies = readMdx(CASE_STUDIES_DIR);
  let created = 0;
  let updated = 0;

  for (const { slug, data, content } of studies) {
    const fields = {
      title: data.title,
      industry: data.industry,
      client: data.client,
      year: data.year,
      duration: data.duration,
      services: (data.services ?? []) as string[],
      thumbnail: data.thumbnail,
      featured: data.featured ?? false,
      body: content,
      metrics: (data.metrics ?? []) as Prisma.InputJsonValue,
      testimonial: data.testimonial ?? Prisma.JsonNull,
      published: data.published ?? true,
    };

    const existing = await db.caseStudy.findUnique({ where: { slug } });
    await db.caseStudy.upsert({
      where: { slug },
      update: fields,
      create: { slug, ...fields },
    });
    if (existing) updated++;
    else created++;
  }

  return { created, updated, total: studies.length };
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      "• Admin user: skipped (set ADMIN_EMAIL and ADMIN_PASSWORD to create one)"
    );
    return;
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`• Admin user: ${email} already exists, skipped`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({
    data: { email, passwordHash, name: "Admin" },
  });
  console.log(`• Admin user: created ${email}`);
}

async function main() {
  const posts = await seedPosts();
  console.log(
    `• Posts: ${posts.created} created, ${posts.updated} updated (${posts.total} total)`
  );

  const studies = await seedCaseStudies();
  console.log(
    `• Case studies: ${studies.created} created, ${studies.updated} updated (${studies.total} total)`
  );

  await seedAdminUser();
}

main()
  .then(() => console.log("Seed complete."))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
