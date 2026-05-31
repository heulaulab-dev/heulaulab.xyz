import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Heulau Lab",
  description:
    "Privacy policy for heulaulab.xyz — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-32">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">
          Legal
        </p>
        <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] mb-4">
          Privacy Policy.
        </h1>
        <p className="text-sm text-text-secondary mb-16 max-w-[55ch]">
          Last updated: May 31, 2026. This policy applies to heulaulab.xyz only.
        </p>

        <div className="privacy-content">
          {sections.map((section) => (
            <section key={section.title} className="privacy-section">
              <h2 className="privacy-heading">{section.title}</h2>
              {section.content.map((para, i) => (
                <p key={i} className="privacy-para">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-text-muted max-w-[60ch] leading-relaxed">
            Questions about this policy? Contact{" "}
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

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us, such as when you fill out a contact form or subscribe to our mailing list. This includes your name, email address, and any other information you choose to provide.",
      "We do not collect sensitive personal data such as government IDs, financial information, or health data.",
      "When you visit heulaulab.xyz, we automatically collect certain technical information including your browser type, operating system, IP address, and pages visited. This data is collected anonymously and used solely to improve our website.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use the information we collect to respond to your inquiries, send you updates about our work if you have subscribed, and improve the functionality and performance of this website.",
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share anonymised, aggregated technical data with analytics providers to understand site traffic and usage patterns.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "heulaulab.xyz may use minimal, functional cookies for site analytics and performance measurement. We do not use advertising cookies or third-party tracking pixels.",
      "You can disable cookies in your browser settings at any time. Disabling cookies may affect some site functionality.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "Contact form submissions are retained for a maximum of 24 months and deleted thereafter unless you request earlier removal.",
      "Technical log data is retained for a maximum of 90 days.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, email us at hello@heulaulab.xyz.",
      "You may unsubscribe from our mailing list at any time by contacting us or clicking the unsubscribe link in any email we send.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "This website is hosted on Vercel. Their privacy policy applies to any data processed by their infrastructure. This policy does not cover any external websites linked from heulaulab.xyz.",
      "We may embed content from third-party services (e.g., fonts, video platforms). Each service's own privacy policy governs its data collection practices.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
    ],
  },
];