"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Brain, Database, ArrowDown } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const layers = [
  {
    icon: Monitor,
    label: "Frontend",
    tech: "Next.js + React",
    desc: "Camera capture at 10 FPS, WebSocket streaming, Clerk auth, real-time challenge UI",
    accent: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Server,
    label: "Backend",
    tech: "FastAPI + Python",
    desc: "Session management, challenge engine (3–5 per session), scoring, JWT RS256 issuance",
    accent: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/20",
  },
  {
    icon: Brain,
    label: "ML Layer",
    tech: "MediaPipe + DeepFace + MesoNet",
    desc: "Real-time face mesh, emotion classification, deepfake artifact detection",
    accent: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  {
    icon: Database,
    label: "Database",
    tech: "SQLite + Convex",
    desc: "Session storage, nonce tracking, audit logs (90-day retention), JWT token records",
    accent: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/20",
  },
];

function DataFlow({ delay }: { delay: number }) {
  return (
    <div className="flex justify-center py-3">
      <div className="relative flex flex-col items-center gap-1">
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-base-border to-accent/20"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay }}
          style={{ transformOrigin: "top" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
        >
          <ArrowDown className="w-3 h-3 text-accent/40" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
          className="text-[10px] font-mono text-ivory-dim absolute -right-20 top-1/2 -translate-y-1/2"
        >
          WebSocket
        </motion.span>
      </div>
    </div>
  );
}

export default function ArchitectureSection() {
  return (
    <SectionWrapper id="architecture">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-6" />
          <span className="text-caption uppercase text-teal tracking-widest mb-4 block">
            Architecture
          </span>
          <h2 className="text-h2 md:text-h1 text-ivory mb-6 text-balance">
            System{" "}
            <span className="gradient-text">Blueprint</span>
          </h2>
          <p className="text-ivory-muted text-body-lg leading-relaxed max-w-lg mb-8">
            A layered architecture designed for real-time biometric processing
            with cryptographic security at every level. Sub-200ms latency target
            from frame capture to scoring.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              <span className="text-small text-ivory-dim">Real-time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse-soft" />
              <span className="text-small text-ivory-dim">Bidirectional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-small text-ivory-dim">Encrypted</span>
            </div>
          </div>
        </motion.div>

        {/* Right: stack diagram */}
        <div className="flex flex-col items-center">
          {layers.map((layer, i) => (
            <div key={layer.label} className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative card-surface rounded-xl p-5 border ${layer.border}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${layer.bg}`}>
                    <layer.icon className={`w-5 h-5 ${layer.accent}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-ivory font-semibold text-sm">{layer.label}</h3>
                      <span className="text-[11px] font-mono text-ivory-dim bg-base/50 px-2 py-0.5 rounded">
                        {layer.tech}
                      </span>
                    </div>
                    <p className="text-ivory-dim text-small truncate">{layer.desc}</p>
                  </div>
                </div>
              </motion.div>
              {i < layers.length - 1 && <DataFlow delay={i * 0.15 + 0.2} />}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
