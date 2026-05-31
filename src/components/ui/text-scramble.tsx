"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleChars?: number;
  duration?: number;
  delay?: number;
}

export function TextScramble({
  text,
  className,
  scrambleChars = 3,
  duration = 60,
  delay = 0,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState<string>("");
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * scrambleChars;
      const interval = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "\n") return char;
            if (i < frame / scrambleChars) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplayed(scrambled);
        frame++;
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayed(text);
        }
      }, duration);
      frameRef.current = frame;

      return () => {
        clearInterval(interval);
        cancelAnimationFrame(frameRef.current);
      };
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, scrambleChars, duration, delay]);

  return <span className={className}>{displayed}</span>;
}
