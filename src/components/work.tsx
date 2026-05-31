"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTilt } from "@/hooks/use-tilt";

const capabilities = [
  {
    index: "01",
    title: "Digital Products",
    description:
      "Interfaces and digital systems built with strong identity at their core. Software that has a point of view.",
    tags: ["UI/UX", "Identity Systems", "Web", "Mobile"],
  },
  {
    index: "02",
    title: "Design Systems",
    description:
      "Frameworks that enforce behavior, not just decoration. Systems that make the right thing the easy thing.",
    tags: ["Tokens", "Components", "Governance"],
  },
  {
    index: "03",
    title: "Brand& Space",
    description:
      "Experimental identities and spatial experiences. Physical environments with digital logic.",
    tags: ["Brand", "Exhibition", "Spatial"],
  },
  {
    index: "04",
    title: "Cross-Disciplinary",
    description:
      "Systems that connect software, space, and culture. The interesting work happens at the edges.",
    tags: ["Research", "Systems", "Culture"],
  },
];

export function Work() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      ref={ref}
      className="px-6 md:px-10 py-24 md:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-4">
            What we build
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              Four disciplines,
              <br />
              one lab.
            </h2>
            <p className="text-sm text-text-secondary max-w-[36ch]">
              Not every project fits a category. We work where disciplines
              collide and something new emerges.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.index} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  cap,
  index,
}: {
  cap: (typeof capabilities)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const tilt = useTilt({ maxTilt: 6 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--mx", `${mx}%`);
      ref.current.style.setProperty("--my", `${my}%`);
      tilt.handleMouseMove(e);
    },
    [tilt, reduce]
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: reduce ? undefined : tilt.perspective,
      }}
      onMouseMove={reduce ? undefined : handleMouseMove}
      onMouseEnter={reduce ? undefined : tilt.handleMouseEnter}
      onMouseLeave={reduce ? undefined : tilt.handleMouseLeave}
      className="relative bg-surface p-8 md:p-12 flex flex-col gap-6 group cursor-pointer"
    >
      {/* Spotlight glow — tracks mouse position via CSS vars */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-100 opacity-0"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(232,255,71,0.10) 0%, transparent 65%)",
        }}
      />

      {/* 3D tilt inner */}
      <motion.div
        ref={tilt.ref as React.Ref<HTMLDivElement>}
        className="relative z-10 flex flex-col gap-6 flex-1"
        style={{
          rotateX: reduce ? undefined : tilt.rotateX,
          rotateY: reduce ? undefined : tilt.rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] text-text-muted tracking-widest">
            {cap.index}
          </span>
          <motion.div
            className="w-8 h-8 border border-border group-hover:border-accent transition-colors duration-300 flex items-center justify-center"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-3 h-3 bg-accent/30 group-hover:bg-accent transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="font-display font-semibold text-xl md:text-2xl leading-tight">
            {cap.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {cap.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {cap.tags.map((tag) => (
            <motion.span
              key={tag}
              className="font-mono text-[10px] text-text-muted tracking-widest uppercase border border-border px-2 py-1 group-hover:border-accent/40 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
