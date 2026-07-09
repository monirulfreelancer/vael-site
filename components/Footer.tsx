import Logo from "./Logo";

// Note: the email and social URLs below are placeholders. Replace hello@vael.studio
// and the x.com / linkedin.com links with the real accounts before launch.
const siteLinks = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

const connectLinks = [
  { href: "mailto:hello@vael.studio", label: "Email" },
  { href: "https://x.com", label: "X" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <a href="/" className="flex items-center">
              <Logo />
            </a>
            <p className="mt-4 text-base leading-relaxed text-text/70">
              We build AI software that does real work. Senior engineering,
              AI-accelerated delivery.
            </p>
          </div>

          <div className="flex gap-14 font-mono text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted">
                Site
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {siteLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted">
                Connect
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {connectLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row">
          <span>© {year} Vael. All rights reserved.</span>
          <span>
            Senior engineering, AI-accelerated. Agency quality at startup speed.
          </span>
        </div>
      </div>
    </footer>
  );
}
