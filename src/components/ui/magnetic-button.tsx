"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.35, type = "button", disabled }, _ref) => {
    const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic({ strength });

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
        className={cn("cursor-pointer", className)}
        type={type}
        disabled={disabled}
      >
        {children}
      </motion.button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";