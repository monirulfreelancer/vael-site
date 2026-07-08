import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
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
      industry,
      client,
      year,
      duration,
      thumbnail,
      body: content,
      slug,
      services,
      metrics,
      testimonial,
      featured,
      published,
    } = body ?? {};

    if (
      !title ||
      !industry ||
      !client ||
      year == null ||
      Number.isNaN(Number(year)) ||
      !duration ||
      !thumbnail ||
      !content
    ) {
      return NextResponse.json(
        {
          error:
            "Title, industry, client, year, duration, thumbnail, and body are required.",
        },
        { status: 400 }
      );
    }

    const finalSlug = slugify(String(slug || title));
    const existing = await db.caseStudy.findUnique({
      where: { slug: finalSlug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A case study with that slug already exists." },
        { status: 409 }
      );
    }

    const study = await db.caseStudy.create({
      data: {
        slug: finalSlug,
        title: String(title),
        industry: String(industry),
        client: String(client),
        year: Number(year),
        duration: String(duration),
        services: Array.isArray(services) ? services : [],
        thumbnail: String(thumbnail),
        body: String(content),
        metrics: Array.isArray(metrics) ? metrics : [],
        testimonial: testimonial ?? Prisma.JsonNull,
        featured: Boolean(featured),
        published: published === undefined ? true : Boolean(published),
      },
    });

    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${finalSlug}`);

    return NextResponse.json({ ok: true, id: study.id });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
