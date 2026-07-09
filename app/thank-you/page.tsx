import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main className="grid min-h-[70vh] place-items-center px-5 sm:px-8">
        <div className="max-w-md text-center">
          <div aria-hidden className="text-6xl text-accent">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-semibold">
            Thanks, we have your project details.
          </h1>
          <p className="mt-4 leading-relaxed text-text/85">
            We read every message ourselves. Expect a reply within one business
            day with next steps and a time for your free consultation.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="/"
              className="btn-primary rounded-full bg-accent px-8 py-4 text-sm font-medium text-bg hover:bg-accent-dim"
            >
              Back to home
            </a>
            <a
              href="/blog"
              className="rounded-full border border-border px-6 py-3 text-sm text-text transition-colors hover:border-accent-dim"
            >
              Read the blog
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
