import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-10 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: wordmark + tagline */}
        <div className="flex flex-col gap-2">
          <p className="font-display font-bold text-base text-text-primary">
            HEULAULAB
          </p>
          <p className="text-xs text-text-muted">
            Multidisciplinary Design Lab. Jakarta.
          </p>
        </div>

        {/* Center: nav links */}
        <nav className="flex flex-wrap gap-6">
          {[
            { label: "Work", href: "/#work" },
            { label: "Studio", href: "/#studio" },
            { label: "Contact", href: "/#contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/licenses"
            className="text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            Open Source
          </Link>
          <Link
            href="/privacy"
            className="text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            Privacy
          </Link>
        </nav>

        {/* Right: copyright */}
        <p className="text-xs text-text-muted font-mono">
          {year} Heulau Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}