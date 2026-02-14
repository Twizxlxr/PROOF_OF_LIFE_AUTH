"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Gauge, ScanSearch, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";

/* ---- FaceMesh Panel ---- */
function FaceMeshPanel({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  const [landmarks, setLandmarks] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      pts.push({
        x: 150 + Math.cos(angle) * (80 + Math.random() * 5),
        y: 140 + Math.sin(angle) * (100 + Math.random() * 5),
      });
    }
    for (let i = 0; i < 20; i++) {
      const cx = i < 10 ? 115 : 185;
      pts.push({ x: cx + (Math.random() - 0.5) * 30, y: 115 + (Math.random() - 0.5) * 15 });
    }
    for (let i = 0; i < 15; i++) {
      pts.push({ x: 150 + (Math.random() - 0.5) * 20, y: 130 + Math.random() * 30 });
    }
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI;
      pts.push({ x: 150 + Math.cos(angle) * 30, y: 190 + Math.sin(angle) * 10 });
    }
    setLandmarks(pts);
  }, []);

  return (
    <motion.div
      layout
      onClick={onToggle}
      className="card-surface rounded-2xl p-6 cursor-pointer hover:border-teal/20 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-teal/10">
          <Brain className="w-4 h-4 text-teal" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-semibold text-ivory">MediaPipe FaceMesh</h3>
      </div>
      <p className="text-ivory-dim text-small mb-4">478 3D facial landmarks tracked in real-time</p>

      <div className="relative w-full aspect-square max-w-[260px] mx-auto bg-base/80 rounded-xl overflow-hidden border border-base-border">
        <svg viewBox="0 0 300 280" className="w-full h-full">
          {landmarks.map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={1}
              fill="#607B8F"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2.5 + Math.random() * 2, delay: i * 0.004, repeat: Infinity }}
            />
          ))}
          {landmarks.slice(0, 59).map((pt, i) => {
            const next = landmarks[(i + 1) % 60];
            return (
              <line key={`l-${i}`} x1={pt.x} y1={pt.y} x2={next.x} y2={next.y} stroke="#607B8F" strokeWidth={0.3} opacity={0.2} />
            );
          })}
        </svg>
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-teal/50">
          {landmarks.length} / 478 landmarks
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mt-4 pt-4 border-t border-base-border text-small text-ivory-muted space-y-1.5">
              <p><strong className="text-ivory">Model:</strong> MediaPipe FaceMesh (3.58 MB)</p>
              <p><strong className="text-ivory">Landmarks:</strong> 478 3D facial points</p>
              <p><strong className="text-ivory">Liveness:</strong> 3D depth analysis (50%) + micro-movement detection (50%)</p>
              <p><strong className="text-ivory">Gestures:</strong> Nod, turn, tilt, blink, open mouth, raise eyebrows</p>
              <p><strong className="text-ivory">Latency:</strong> 30–50ms per frame</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---- Emotion Panel ---- */
function EmotionPanel({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  const emotions = [
    { label: "Happy", value: 0.72, color: "#F7E396" },
    { label: "Neutral", value: 0.15, color: "#7A8099" },
    { label: "Surprise", value: 0.08, color: "#E97F4A" },
    { label: "Sad", value: 0.03, color: "#607B8F" },
    { label: "Angry", value: 0.01, color: "#D4654A" },
    { label: "Fear", value: 0.01, color: "#7A8099" },
  ];

  return (
    <motion.div layout onClick={onToggle} className="card-surface rounded-2xl p-6 cursor-pointer hover:border-accent/20 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <Gauge className="w-4 h-4 text-accent" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-semibold text-ivory">DeepFace Emotion</h3>
      </div>
      <p className="text-ivory-dim text-small mb-4">Real-time emotion classification</p>

      <div className="space-y-2.5">
        {emotions.map((e, i) => (
          <div key={e.label} className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-ivory-dim w-14">{e.label}</span>
            <div className="flex-1 h-1.5 bg-base/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: e.color }}
                initial={{ width: "0%" }}
                whileInView={{ width: `${e.value * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              />
            </div>
            <span className="text-[11px] font-mono text-ivory-dim w-8 text-right">
              {(e.value * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      {/* Gauge */}
      <div className="mt-5 flex items-center justify-center">
        <div className="relative w-28 h-14">
          <svg viewBox="0 0 120 60" className="w-full h-full">
            <path d="M10 55 A50 50 0 0 1 110 55" fill="none" stroke="#3A4170" strokeWidth="6" strokeLinecap="round" />
            <motion.path
              d="M10 55 A50 50 0 0 1 110 55"
              fill="none" stroke="#F7E396" strokeWidth="6" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 0.72 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-lg font-bold text-success">72%</span>
            <span className="block text-[10px] text-ivory-dim">HAPPY</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mt-4 pt-4 border-t border-base-border text-small text-ivory-muted space-y-1.5">
              <p><strong className="text-ivory">Engine:</strong> DeepFace with VGG-Face backbone (5.98 MB)</p>
              <p><strong className="text-ivory">Classes:</strong> 7 emotions — happy, sad, angry, surprise, fear, disgust, neutral</p>
              <p><strong className="text-ivory">Scoring:</strong> Emotion match confidence + transition naturalness analysis</p>
              <p><strong className="text-ivory">Anti-Spoof:</strong> Detects rigid patterns and penalizes unnatural confidence jumps</p>
              <p><strong className="text-ivory">Latency:</strong> 50–100ms per frame</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---- Deepfake Panel ---- */
function DeepfakePanel({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <motion.div layout onClick={onToggle} className="card-surface rounded-2xl p-6 cursor-pointer hover:border-success/20 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-success/10">
          <ScanSearch className="w-4 h-4 text-success" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-semibold text-ivory">MesoNet-4 Detector</h3>
      </div>
      <p className="text-ivory-dim text-small mb-4">Mesoscopic artifact analysis</p>

      <div className="relative w-full aspect-square max-w-[260px] mx-auto bg-base/80 rounded-xl overflow-hidden border border-base-border">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(247,227,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(247,227,150,0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-success/60 to-transparent"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Face outline */}
        <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
          <ellipse cx="150" cy="140" rx="70" ry="90" fill="none" stroke="#F7E396" strokeWidth="0.8" strokeDasharray="4 4" opacity={0.35} />
          {[
            { x: 120, y: 110, w: 25, h: 12 },
            { x: 165, y: 110, w: 25, h: 12 },
            { x: 135, y: 155, w: 30, h: 15 },
            { x: 130, y: 185, w: 40, h: 12 },
          ].map((z, i) => (
            <motion.rect
              key={i} x={z.x} y={z.y} width={z.w} height={z.h} rx={2}
              fill="none" stroke="#F7E396" strokeWidth={0.8}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </svg>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-[10px] font-mono text-success/50">SCANNING...</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-soft" />
            <span className="text-[10px] font-mono text-success font-semibold">REAL</span>
          </div>
        </div>
      </div>

      {/* Confidence */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono text-ivory-dim">Authenticity</span>
          <span className="text-[11px] font-mono text-success font-semibold">96.2%</span>
        </div>
        <div className="h-1.5 bg-base/80 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-success"
            initial={{ width: "0%" }}
            whileInView={{ width: "96.2%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mt-4 pt-4 border-t border-base-border text-small text-ivory-muted space-y-1.5">
              <p><strong className="text-ivory">Architecture:</strong> MesoNet-4 CNN — 4 conv layers, just 0.15 MB</p>
              <p><strong className="text-ivory">Training:</strong> FaceForensics++ (Face2Face, FaceSwap, Deepfakes)</p>
              <p><strong className="text-ivory">Detection:</strong> Spatial artifacts + temporal consistency across frames</p>
              <p><strong className="text-ivory">Feature:</strong> Early termination on high-confidence deepfake signal</p>
              <p><strong className="text-ivory">Latency:</strong> 20–40ms per frame</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---- Main ---- */
export default function MLSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <SectionWrapper id="ml">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="section-divider mx-auto mb-6" />
        <span className="text-caption uppercase text-teal-light tracking-widest mb-4 block">
          ML Pipeline
        </span>
        <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
          Three{" "}
          <span className="gradient-text">Neural Networks</span>
        </h2>
        <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
          Each frame passes through a triple-model pipeline that extracts
          liveness signals, classifies emotions, and detects synthetic artifacts.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FaceMeshPanel expanded={expanded === 0} onToggle={() => setExpanded(expanded === 0 ? null : 0)} />
        <EmotionPanel expanded={expanded === 1} onToggle={() => setExpanded(expanded === 1 ? null : 1)} />
        <DeepfakePanel expanded={expanded === 2} onToggle={() => setExpanded(expanded === 2 ? null : 2)} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <Link
          href="/ml"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent/30 text-sm text-accent hover:bg-accent/10 hover:border-accent/50 transition-all duration-200"
        >
          Deep Dive into ML Pipeline
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
