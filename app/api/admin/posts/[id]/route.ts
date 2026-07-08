import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/adminData";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

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
    const clash = await db.post.findFirst({
      where: { slug: finalSlug, NOT: { id } },
    });
    if (clash) {
      return NextResponse.json(
        { error: "A post with that slug already exists." },
        { status: 409 }
      );
    }

    // Stamp publishedAt the first time a post goes live; never clear it.
    let publishedAt = existing.publishedAt;
    if (published && !publishedAt) publishedAt = new Date();

    await db.post.update({
      where: { id },
      data: {
        slug: finalSlug,
        title: String(title),
        description: String(description),
        body: String(content),
        tags: Array.isArray(tags) ? tags : [],
        author: author ? String(author) : "Vael",
        published: Boolean(published),
        publishedAt,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${finalSlug}`);
    if (existing.slug !== finalSlug) {
      revalidatePath(`/blog/${existing.slug}`);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.post.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
