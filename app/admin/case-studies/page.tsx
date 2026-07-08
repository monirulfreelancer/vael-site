import AdminTable from "@/components/admin/AdminTable";
import { requireSession } from "@/lib/auth";
import { formatDate } from "@/lib/blog";
import { listCaseStudies } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage() {
  await requireSession();
  const studies = await listCaseStudies();

  return (
    <AdminTable
      heading="Case studies"
      subtitle="Featured studies appear on the homepage."
      newHref="/admin/case-studies/new"
      newLabel="New case study"
    >
      {studies.length === 0 ? (
        <div className="p-12 text-center text-muted">
          No case studies yet.{" "}
          <a href="/admin/case-studies/new" className="text-accent">
            Add your first case study
          </a>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-surface2 font-mono text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-normal">Title</th>
              <th className="px-5 py-3 font-normal">Industry</th>
              <th className="px-5 py-3 font-normal">Status</th>
              <th className="px-5 py-3 font-normal">Updated</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => (
              <tr
                key={study.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-5 py-4">
                  <a
                    href={`/admin/case-studies/${study.id}`}
                    className="text-sm"
                  >
                    {study.title}
                  </a>
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {study.industry}
                </td>
                <td className="px-5 py-4">
                  {study.featured ? (
                    <span className="pill">Featured</span>
                  ) : study.published ? (
                    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-muted">
                  {formatDate(study.updatedAt.toISOString().slice(0, 10))}
                </td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={`/admin/case-studies/${study.id}`}
                    className="font-mono text-xs text-accent"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminTable>
  );
}
