"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import GlowButton from "./GlowButton";

function SubtleGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-radial from-accent/[0.04] via-transparent to-transparent blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-teal/[0.03] blur-3xl animate-float" />
    </div>
  );
}

function FloatingOrbs() {
  const [orbs, setOrbs] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setOrbs(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 6,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.size,
            height: o.size,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TypedSubtitle() {
  const text = "Real-Time Biometric Liveness · Deepfake Defense · JWT Proof Tokens";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, 45);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <span className="font-mono text-base md:text-lg text-ivory-muted">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block w-[2px] h-4 bg-accent ml-1 align-middle"
      />
    </span>
  );
}

export default function Hero() {
  const handleScroll = useCallback(() => {
    document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <SubtleGrid />
      <FloatingOrbs />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-base-border bg-base-card/50 mb-10"
        >
          <Shield className="w-4 h-4 text-accent" strokeWidth={1.5} />
          <span className="text-caption uppercase text-ivory-muted tracking-widest">Proof-of-Life Protocol v1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
        >
          <span className="gradient-text">Proof of Life</span>
          <br />
          <span className="text-ivory">Authentication</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-4 h-8"
        >
          <TypedSubtitle />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-ivory-dim text-body-lg max-w-xl mb-10 leading-relaxed"
        >
          Three ML models — MediaPipe FaceMesh, DeepFace VGG-Face, and MesoNet-4 —
          verify genuine human presence through interactive challenges and issue
          cryptographic RS256 JWT proof tokens. No biometric data stored.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex gap-4"
        >
          <GlowButton onClick={handleScroll}>See How It Works</GlowButton>
          <GlowButton
            variant="secondary"
            onClick={() => document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" })}
          >
            Architecture
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-[-100px]"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-ivory-dim" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-base to-transparent" />
    </section>
  );
}
