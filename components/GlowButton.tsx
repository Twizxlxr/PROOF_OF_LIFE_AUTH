"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function GlowButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: GlowButtonProps) {
  const base =
    variant === "primary"
      ? "bg-accent text-base font-semibold shadow-glow-accent hover:bg-accent-light"
      : "bg-transparent border border-base-border text-ivory-muted hover:border-accent/40 hover:text-ivory";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`relative px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-250 cursor-pointer ${base} ${className}`}
    >
      {children}
    </motion.button>
  );
}
