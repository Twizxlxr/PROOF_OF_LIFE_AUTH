"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={
        hover
          ? {
              y: -4,
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className={`relative card-surface rounded-2xl p-6 transition-shadow duration-300 hover:shadow-card-hover cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}
