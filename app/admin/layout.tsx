import type { Metadata } from "next";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only render the chrome when signed in. On /admin/login there is no session,
  // so the bar is hidden. This does not redirect; pages guard themselves.
  const session = await getSession();

  return (
    <>
      {session && (
        <header className="h-14 border-b border-border bg-surface">
          <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5">
            <a href="/admin" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-7 w-7 items-center justify-center rounded-md border border-accent font-mono text-sm text-accent"
              >
                V
              </span>
              <span className="font-display text-lg font-semibold">Vael</span>
              <span className="font-mono text-xs text-muted">Admin</span>
            </a>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="font-mono text-sm text-muted transition-colors hover:text-text"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </>
  );
}
