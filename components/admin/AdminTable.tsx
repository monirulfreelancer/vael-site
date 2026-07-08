import type { ReactNode } from "react";

export default function AdminTable({
  heading,
  subtitle,
  newHref,
  newLabel,
  children,
}: {
  heading: string;
  subtitle: string;
  newHref: string;
  newLabel: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{heading}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>
        </div>
        <a
          href={newHref}
          className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
        >
          {newLabel}
        </a>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        {children}
      </div>
    </div>
  );
}
