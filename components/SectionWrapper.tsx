"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fullHeight?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  fullHeight = true,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={`relative ${fullHeight ? "slide-section" : "py-24 px-6 md:px-12 lg:px-24"} ${className}`}
    >
      <div className="w-full max-w-6xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
}
