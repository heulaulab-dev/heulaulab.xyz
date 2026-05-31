"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { TextScramble } from "@/components/ui/text-scramble";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // SVG parallax at different rate
  const svgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const svgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 min-h-[100dvh] overflow-hidden"
    >

      <motion.div
        style={{ y, opacity }}
        className="z-10 relative mx-auto w-full max-w-7xl"
      >
        <div className="items-end gap-8 lg:gap-0 grid grid-cols-1 lg:grid-cols-12">
          {/* Left: text content */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            {/* Status label */}
            <div className="flex items-center gap-3">
              <motion.span
                className="inline-block bg-accent rounded-full w-2 h-2"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-mono text-text-muted text-xs uppercase tracking-widest">
                Multidisciplinary Design Lab
              </span>
            </div>

            {/* Headline with text scramble */}
            <h1
              className="font-display font-bold leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              <TextScramble
                text="We build systems"
                className="block"
                delay={200}
                scrambleChars={2}
                duration={40}
              />
              <TextScramble
                text="that refuse to be"
                className="block"
                delay={500}
                scrambleChars={2}
                duration={40}
              />
              <TextScramble
                text="ignored."
                className="block text-accent"
                delay={800}
                scrambleChars={2}
                duration={40}
              />
            </h1>

            <p className="text-text-secondary text-base leading-relaxed">
              We work across digital and physical space, building systems with a point of view.
            </p>

            {/* Magnetic CTA */}
            <div className="flex items-center gap-4">
              <MagneticButton>
                <Button size="lg" asChild>
                  <a href="#work">See our work</a>
                </Button>
              </MagneticButton>
            </div>
          </div>

        </div>

        {/* Bottom metadata strip */}
        <div className="flex flex-wrap gap-8 mt-16 pt-8 border-border border-t">
          <div>
            <p className="mb-1 font-mono text-[10px] text-text-muted uppercase tracking-widest">
              Founded
            </p>
            <p className="text-text-secondary text-sm">2021</p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[10px] text-text-muted uppercase tracking-widest">
              Based in
            </p>
            <p className="text-text-secondary text-sm">Jakarta, Indonesia</p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[10px] text-text-muted uppercase tracking-widest">
              Disciplines
            </p>
            <p className="text-text-secondary text-sm">
              Digital / Physical / Spatial
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
