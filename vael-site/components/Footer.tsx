import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-10">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-mono text-lg">
              <span className="grid place-items-center w-7 h-7 border border-accent text-accent rounded-md text-sm">
                V
              </span>
              <span className="font-semibold">Vael</span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              AI-powered software, built fast. We pair senior engineering with
              AI-accelerated workflows.
            </p>
          </div>

          <div className="flex gap-14 font-mono text-sm">
            <div className="space-y-3">
              <p className="text-muted text-xs uppercase tracking-wider">Site</p>
              <a href="/#services" className="block text-muted hover:text-text">Services</a>
              <a href="/#work" className="block text-muted hover:text-text">Work</a>
              <a href="/#pricing" className="block text-muted hover:text-text">Pricing</a>
              <a href="/#contact" className="block text-muted hover:text-text">Contact</a>
            </div>
            <div className="space-y-3">
              <p className="text-muted text-xs uppercase tracking-wider">Connect</p>
              <a href="mailto:hello@vael.studio" className="block text-muted hover:text-text">Email</a>
              <a href="https://x.com" className="block text-muted hover:text-text">X / Twitter</a>
              <a href="https://linkedin.com" className="block text-muted hover:text-text">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Vael. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            We pair senior engineering with AI — agency quality at startup speed.
          </p>
        </div>
      </div>
    </footer>
  );
}
