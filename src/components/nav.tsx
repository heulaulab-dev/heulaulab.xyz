"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";
import Image from "next/image";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Studio", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "top-0 right-0 left-0 z-50 fixed transition-all duration-300",
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center mx-auto px-6 md:px-10 max-w-7xl h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Heulau Lab home">
          {/* biome-ignore lint/a11y/noImgElement: logo SVG from public folder */}
          <Image src="/heulaulab-logo.svg" alt="Heulau Lab" width={70} height={0} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <MagneticNavButton href="/#contact">
            <span className="inline-block hover:bg-accent px-4 py-2 border border-accent font-semibold text-accent hover:text-surface text-sm transition-all duration-200">
              Start a project
            </span>
          </MagneticNavButton>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-5 h-px bg-text-primary transition-all duration-300",
              menuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-text-primary transition-all duration-300",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-text-primary transition-all duration-300",
              menuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-64 border-b border-border bg-surface" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="font-semibold text-accent text-sm"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
<Link
      href={href}
      className="group relative pb-0.5 overflow-hidden text-text-secondary hover:text-text-primary text-sm tracking-wide transition-colors"
    >
      <span className="block">{children}</span>
<span className="bottom-0 left-0 absolute bg-accent w-0 group-hover:w-full h-px transition-all duration-400 ease-[0.16,1,0.3,1]" />
    </Link>
  );
}

function MagneticNavButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic({ strength: 0.3 });

  return (
    <motion.a
      href={href}
      ref={ref as React.Ref<HTMLAnchorElement>}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.a>
  );
}