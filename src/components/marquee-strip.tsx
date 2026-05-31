"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const marqueeItems = [
  "Software Interfaces",
  "Spatial Experiences",
  "Design Systems",
  "Brand Identity",
  "Physical Environments",
  "Cross-Disciplinary Systems",
];

export function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section ref={ref} className="py-20 border-t border-b border-border overflow-hidden">
      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-12 whitespace-nowrap"
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="font-display font-bold text-2xl md:text-3xl text-text-muted/50 uppercase tracking-widest"
            >
              {item}
              <span className="text-accent mx-12">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}