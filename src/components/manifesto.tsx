"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <section
      id="studio"
      ref={ref}
      className="px-6 md:px-10 py-24 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left label */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
              Studio
</p>
            <div className="w-8 h-px bg-accent" />
          </div>

          {/* Right: manifesto text */}
          <div className="lg:col-span-9 lg:pl-12">
            <motion.blockquote
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <p
                className="font-display font-bold leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
              >
                Not every brand needs to be liked.
                <br />
                <span className="text-accent">Some need to be remembered.</span>
              </p>

              <div className="max-w-[60ch] flex flex-col gap-4">
                <p className="text-base text-text-secondary leading-relaxed">
                  We are a multidisciplinary design lab operating at the
                  intersection of digital and physical space. We build bold,
                  unconventional systems, rooted in raw modernist principles
                  and controlled imperfection.
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  Our work resists decoration. Every decision is load-bearing.
                  We do not make things prettier. We make things{" "}
                  <span className="text-text-primary font-medium">
                    more precise.
                  </span>
                </p>
              </div>

              {/* Pull stat */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="w-px h-12 bg-accent" />
                <p className="font-mono text-xs text-text-muted tracking-widest uppercase max-w-[40ch]">
                  The work that matters most is the work that changes how
                  something works, not just how it looks.
</p>
              </motion.div>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
