import { notFound } from "next/navigation";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";
import { requireSession } from "@/lib/auth";
import { getCaseStudyById } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;
  const study = await getCaseStudyById(id);
  if (!study) notFound();

  return (
    <div>
      <a href="/admin/case-studies" className="font-mono text-xs text-muted">
        ← Case studies
      </a>
      <h1 className="mt-4 text-2xl font-semibold">Edit case study</h1>
      <div className="mt-8">
        <CaseStudyEditor
          study={{
            id: study.id,
            title: study.title,
            slug: study.slug,
            industry: study.industry,
            client: study.client,
            year: study.year,
            duration: study.duration,
            services: study.services,
            thumbnail: study.thumbnail,
            body: study.body,
            metrics: study.metrics,
            testimonial: study.testimonial,
            featured: study.featured,
            published: study.published,
          }}
        />
      </div>
    </div>
  );
}
