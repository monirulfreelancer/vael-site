import CaseStudyEditor from "@/components/admin/CaseStudyEditor";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewCaseStudyPage() {
  await requireSession();

  return (
    <div>
      <a href="/admin/case-studies" className="font-mono text-xs text-muted">
        ← Case studies
      </a>
      <h1 className="mt-4 text-2xl font-semibold">New case study</h1>
      <div className="mt-8">
        <CaseStudyEditor />
      </div>
    </div>
  );
}
