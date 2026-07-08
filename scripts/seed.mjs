import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import matter from "gray-matter";
import prismaPkg from "@prisma/client";

// @prisma/client ships CommonJS; destructure from the default import so this
// resolves cleanly as an ES module in the runner container.
const { Prisma, PrismaClient } = prismaPkg;

const db = new PrismaClient();

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readMdx(dir) {
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

// Content is only imported when the table is empty. This keeps a container
// restart from clobbering posts edited in the admin panel with the original MDX.
async function seedPosts() {
  const count = await db.post.count();
  if (count > 0) {
    console.log(`Post table already has ${count} rows, skipping content seed.`);
    return;
  }

  const posts = readMdx(BLOG_DIR);
  for (const { slug, data, content } of posts) {
    await db.post.create({
      data: {
        slug,
        title: data.title,
        description: data.description,
        body: content,
        tags: data.tags ?? [],
        author: data.author ?? "Vael",
        published: data.published ?? false,
        publishedAt: data.date ? new Date(data.date) : null,
      },
    });
  }
  console.log(`Post table seeded with ${posts.length} rows.`);
}

async function seedCaseStudies() {
  const count = await db.caseStudy.count();
  if (count > 0) {
    console.log(
      `CaseStudy table already has ${count} rows, skipping content seed.`
    );
    return;
  }

  const studies = readMdx(CASE_STUDIES_DIR);
  for (const { slug, data, content } of studies) {
    await db.caseStudy.create({
      data: {
        slug,
        title: data.title,
        industry: data.industry,
        client: data.client,
        year: data.year,
        duration: data.duration,
        services: data.services ?? [],
        thumbnail: data.thumbnail,
        featured: data.featured ?? false,
        body: content,
        metrics: data.metrics ?? [],
        testimonial: data.testimonial ?? Prisma.JsonNull,
        published: data.published ?? true,
      },
    });
  }
  console.log(`CaseStudy table seeded with ${studies.length} rows.`);
}

// Always ensure the admin user exists. Never touches an existing user's
// password, so this is safe to run on every boot.
async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("Admin user: ADMIN_EMAIL / ADMIN_PASSWORD not set, skipping.");
    return;
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user: ${email} already exists, leaving it untouched.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({ data: { email, passwordHash, name: "Admin" } });
  console.log(`Admin user: created ${email}.`);
}

async function main() {
  await seedPosts();
  await seedCaseStudies();
  await seedAdminUser();
}

main()
  .then(() => console.log("Seed complete."))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
