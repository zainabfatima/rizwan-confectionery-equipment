"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div whileHover={reduce ? undefined : { y: -4 }} transition={{ duration: 0.2 }} className={className}>
      {children}
    </motion.div>
  );
}
