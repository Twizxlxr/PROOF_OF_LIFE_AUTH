"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import GlowButton from "./GlowButton";

export default function CTASection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Warm radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-teal/[0.03] blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-divider mx-auto mb-8" />
        <h2 className="text-h1 md:text-display text-ivory mb-5 text-balance leading-tight">
          Humanity,{" "}
          <span className="gradient-text-warm">Verified.</span>
        </h2>
        <p className="text-body-lg text-ivory-muted max-w-xl mx-auto mb-10 leading-relaxed">
          Proof-of-Life Authentication proves users are real, live humans —
          without storing a single frame of biometric data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlowButton>
            <span className="flex items-center gap-2">
              Read the Paper
              <ArrowRight className="w-4 h-4" />
            </span>
          </GlowButton>
          <GlowButton variant="secondary">
            <a
              href="https://github.com/ArrinPaul/Proof-of-life.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </GlowButton>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-14 text-caption text-ivory-dim"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Built with Next.js 14 · FastAPI · MediaPipe · DeepFace VGG-Face · MesoNet-4 · SQLite · RS256 JWT
        </motion.p>
      </motion.div>
    </section>
  );
}
