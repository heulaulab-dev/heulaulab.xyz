"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Spring-damped cursor position
  const springX = useSpring(mouseX, { stiffness: 600, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 600, damping: 28 });

  // Spring for the trailing dot
  const trailX = useSpring(mouseX, { stiffness: 150, damping: 18 });
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 0.4 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-8 h-8 rounded-full bg-accent/20" />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.7 : isHovering ? 1.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
      </motion.div>
    </>
  );
}