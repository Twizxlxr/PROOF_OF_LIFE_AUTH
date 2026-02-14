"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Cpu,
  HardDrive,
  Globe,
  Layers,
  MonitorSmartphone,
  Database,
  Box,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import AnimatedCard from "./AnimatedCard";

const metrics = [
  { label: "Full Verification", value: "20–40s", sub: "3-5 challenges", color: "#E97F4A" },
  { label: "Frame Processing", value: "100–200ms", sub: "parallel ML", color: "#607B8F" },
  { label: "Token Generation", value: "<5ms", sub: "RS256 signing", color: "#F7E396" },
  { label: "328 Tests", value: "100%", sub: "unit + property", color: "#D4654A" },
];

const stack = [
  {
    layer: "Frontend",
    items: [
      { icon: MonitorSmartphone, name: "Next.js 14", note: "App Router + SSR" },
      { icon: Layers, name: "Clerk Auth", note: "User management" },
      { icon: Globe, name: "Convex", note: "Cloud persistence" },
    ],
    color: "#E97F4A",
  },
  {
    layer: "Backend",
    items: [
      { icon: Zap, name: "FastAPI", note: "Async Python 3.11" },
      { icon: Database, name: "SQLite", note: "aiosqlite async" },
      { icon: HardDrive, name: "WebSocket", note: "Bidirectional RT" },
    ],
    color: "#607B8F",
  },
  {
    layer: "ML / Infra",
    items: [
      { icon: Cpu, name: "MediaPipe", note: "478 landmarks" },
      { icon: Box, name: "DeepFace", note: "VGG-Face + FER" },
      { icon: Globe, name: "MesoNet-4", note: "0.15 MB CNN" },
    ],
    color: "#F7E396",
  },
];

export default function PerformanceSection() {
  return (
    <SectionWrapper id="performance">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="section-divider mx-auto mb-6" />
        <span className="text-caption uppercase text-success tracking-widest mb-4 block">
          Performance & Stack
        </span>
        <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
          Built for{" "}
          <span className="gradient-text-warm">Speed</span>
        </h2>
        <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
          Sub-second ML inference, async Python APIs, and a modern React
          frontend combine to deliver a seamless verification experience.
        </p>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-surface rounded-xl p-5 text-center"
          >
            <div className="text-h2 font-bold font-mono mb-1" style={{ color: m.color }}>
              {m.value}
            </div>
            <div className="text-small font-medium text-ivory">{m.label}</div>
            <div className="text-caption text-ivory-dim mt-0.5">{m.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stack.map((group, gi) => (
          <AnimatedCard key={group.layer} delay={gi * 0.1}>
            <div className="mb-4">
              <span
                className="inline-block text-caption uppercase tracking-widest font-semibold"
                style={{ color: group.color }}
              >
                {group.layer}
              </span>
            </div>
            <div className="space-y-3">
              {group.items.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.name} className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${group.color}12` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: group.color }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-small font-medium text-ivory">{tech.name}</span>
                      <span className="text-caption text-ivory-dim ml-2">{tech.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
