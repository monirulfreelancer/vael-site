import type { ReactNode } from "react";

export default function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </div>
      {children}
    </div>
  );
}
