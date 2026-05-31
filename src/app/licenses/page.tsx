import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import "./licenses.css";

export const metadata: Metadata = {
  title: "Open Source — Heulau Lab",
  description:
    "Open source libraries and licenses used in building heulaulab.xyz.",
};

const packages = [
  {
    name: "Next.js",
    version: "16.2.6",
    description: "The React Framework for the Web.",
    license: "MIT",
    url: "https://nextjs.org/",
    notice:
      "Copyright (c) Vercel, Inc. and its affiliates. Licensed under the Next.js Fair Use License.",
  },
  {
    name: "React",
    version: "19.2.4",
    description: "The library for web and native user interfaces.",
    license: "MIT",
    url: "https://react.dev/",
    notice:
      "Copyright (c) Meta Platforms, Inc. and affiliates. Licensed under the React License.",
  },
  {
    name: "Tailwind CSS",
    version: "4.1.7",
    description: "A utility-first CSS framework.",
    license: "MIT",
    url: "https://tailwindcss.com/",
    notice:
      "Copyright (c) Tailwind Labs, Inc. Licensed under the Tailwind CSS Open Source License.",
  },
  {
    name: "Framer Motion",
    version: "11.18.2",
    description: "A production-ready motion library for React.",
    license: "MIT",
    url: "https://framer.com/motion",
    notice:
      "Copyright (c) Framer B.V. Licensed under the Framer Motion License.",
  },
  {
    name: "Radix UI",
    version: "Various",
    description:
      "Unstyled, accessible UI component primitives for React.",
    license: "MIT",
    url: "https://radix-ui.com/",
    notice:
      "Copyright (c) Radix UI and contributors. Licensed under the Radix UI License.",
  },
  {
    name: "Phosphor Icons",
    version: "2.1.7",
    description: "A flexible icon family for React.",
    license: "MIT",
    url: "https://phosphoricons.com/",
    notice:
      "Copyright (c) Phosphor Icons team. Licensed under the MIT License.",
  },
  {
    name: "Vercel",
    version: "Latest",
    description: "Develop. Preview. Ship.",
    license: "Apache-2.0",
    url: "https://vercel.com/",
    notice:
      "Copyright (c) Vercel, Inc. Licensed under the Vercel Hosted License.",
  },
  {
    name: "clsx",
    version: "2.1.1",
    description: "A tiny utility for constructing class names.",
    license: "MIT",
    url: "https://github.com/lukeed/clsx",
    notice: "Copyright (c) Luke Edwards. Licensed under the MIT License.",
  },
  {
    name: "tailwind-merge",
    version: "2.6.0",
    description: "A tiny utility for merging Tailwind CSS classes.",
    license: "MIT",
    url: "https://github.com/lukeed/tailwind-merge",
    notice: "Copyright (c) Luke Edwards. Licensed under the MIT License.",
  },
  {
    name: "class-variance-authority",
    version: "0.7.1",
    description: "Tailwind CSS class variance utility.",
    license: "MIT",
    url: "https://github.com/joe-bell/cva",
    notice:
      "Copyright (c) Joe Bell. Licensed under the MIT License.",
  },
];

export default function LicensesPage() {
  return (
    <main className="licenses-page">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-32">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">
          Open Source
        </p>
        <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] mb-4">
          Licenses.
        </h1>
        <p className="text-sm text-text-secondary mb-16 max-w-[55ch]">
          This site is built with open source software. Each library below is
          listed with its license. Full license texts are available via the links
          provided.
        </p>

        <div className="licenses-table">
          {/* Header */}
          <div className="licenses-table-header">
            <span>Package</span>
            <span>License</span>
            <span>Version</span>
          </div>

          {/* Rows */}
          {packages.map((pkg) => (
            <a
              key={pkg.name}
              href={pkg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="licenses-table-row group"
            >
              <div>
                <span className="licenses-name group-hover:text-accent transition-colors">
                  {pkg.name}
                </span>
                <span className="licenses-description">{pkg.description}</span>
              </div>
              <span className="licenses-license">{pkg.license}</span>
              <span className="licenses-version">{pkg.version}</span>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-text-muted max-w-[60ch] leading-relaxed">
            All software listed above retains its original copyright notices.
            This page serves as an attribution disclosure in compliance with each
            library&apos;s respective license terms. If you believe any entry
            requires correction, please contact{" "}
            <a
              href="mailto:hello@heulaulab.xyz"
              className="text-accent hover:underline"
            >
              hello@heulaulab.xyz
            </a>
            .
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}