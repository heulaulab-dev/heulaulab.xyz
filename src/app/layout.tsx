import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { Cursor } from "@/components/cursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Heulau Lab — Multidisciplinary Design Studio",
  description:
    "We build bold, unconventional systems across digital and physical space. Rooted in raw modernist principles and controlled imperfection.",
  openGraph: {
    title: "Heulau Lab — Multidisciplinary Design Studio",
    description:
      "We build bold, unconventional systems across digital and physical space.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-surface font-body text-text-primary antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
