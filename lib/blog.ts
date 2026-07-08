import { db } from "./db";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readingTime: string;
  published: boolean;
};

export type Post = PostMeta & { content: string };

type PostRow = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  body: string;
};

function computeReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// The DB stores publishedAt as a DateTime; the public types use a "YYYY-MM-DD"
// string so formatDate stays timezone-safe. Fall back to createdAt if a
// published post is missing publishedAt.
function toDateString(row: PostRow): string {
  const date = row.publishedAt ?? row.createdAt;
  return date.toISOString().slice(0, 10);
}

function toMeta(row: PostRow): PostMeta {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: toDateString(row),
    tags: row.tags,
    author: row.author,
    readingTime: computeReadingTime(row.body),
    published: row.published,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const rows = await db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(toMeta);
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const row = await db.post.findFirst({
      where: { slug, published: true },
    });
    if (!row) return null;
    return { ...toMeta(row), content: row.body };
  } catch {
    return null;
  }
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Format an ISO date (YYYY-MM-DD) as "Jan 15, 2026" without going through the
// Date object, so the output never shifts with the server's timezone.
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  for (const post of await getAllPosts()) {
    for (const tag of post.tags ?? []) tags.add(tag);
  }
  return Array.from(tags).sort();
}
