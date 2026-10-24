"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut, viewportOnce } from "./presets";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
