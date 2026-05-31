"use client";

import { useRef, useCallback, useState } from "react";
import { useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
}

export function useTilt({ maxTilt = 8, perspective = 800 }: TiltOptions = {}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(rawY, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateY = useTransform(rawX, [-0.5, 0.5], [maxTilt, -maxTilt]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, reduce]
  );

  const handleMouseEnter = useCallback(() => setIsActive(true), []);
  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setIsActive(false);
  }, [rawX, rawY]);

  return {
    ref,
    rotateX,
    rotateY,
    x,
    y,
    isActive,
    perspective,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}