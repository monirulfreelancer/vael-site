import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/adminData";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      body: content,
      tags,
      author,
      published,
      slug,
    } = body ?? {};

    if (!title || !description || !content) {
      return NextResponse.json(
        { error: "Title, description, and body are required." },
        { status: 400 }
      );
    }

    const finalSlug = slugify(String(slug || title));
    const existing = await db.post.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json(
        { error: "A post with that slug already exists." },
        { status: 409 }
      );
    }

    const post = await db.post.create({
      data: {
        slug: finalSlug,
        title: String(title),
        description: String(description),
        body: String(content),
        tags: Array.isArray(tags) ? tags : [],
        author: author ? String(author) : "Vael",
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${finalSlug}`);

    return NextResponse.json({ ok: true, id: post.id });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
