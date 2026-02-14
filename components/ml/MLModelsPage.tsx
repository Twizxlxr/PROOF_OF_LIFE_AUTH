"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Gauge,
  ScanSearch,
  ArrowLeft,
  Cpu,
  Layers,
  Timer,
  ShieldCheck,
  Activity,
  Eye,
  Zap,
  Database,
  GitBranch,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import GlowButton from "@/components/GlowButton";

/* ================================================================
   Shared helpers
   ================================================================ */

function StatBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-base/60 border border-base-border">
      <span className="text-lg font-bold font-mono" style={{ color }}>
        {value}
      </span>
      <span className="text-[11px] text-ivory-dim uppercase tracking-wider">{label}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-base-border/50 last:border-0">
      <Icon className="w-4 h-4 text-ivory-dim mt-0.5 flex-shrink-0" strokeWidth={1.5} />
      <div>
        <span className="text-small font-medium text-ivory">{label}</span>
        <p className="text-small text-ivory-muted mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function SectionHeading({ tag, title, description }: { tag: string; title: React.ReactNode; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="section-divider mb-6" />
      <span className="text-caption uppercase tracking-widest mb-4 block text-teal-light">{tag}</span>
      <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">{title}</h2>
      <p className="text-ivory-muted text-body-lg max-w-2xl leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ================================================================
   FaceMesh Visualization
   ================================================================ */

function FaceMeshViz() {
  const [landmarks, setLandmarks] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const pts: { x: number; y: number }[] = [];
    // Face outline
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      pts.push({
        x: 200 + Math.cos(angle) * (110 + Math.random() * 6),
        y: 190 + Math.sin(angle) * (135 + Math.random() * 6),
      });
    }
    // Eyes
    for (let i = 0; i < 30; i++) {
      const cx = i < 15 ? 155 : 245;
      pts.push({ x: cx + (Math.random() - 0.5) * 40, y: 155 + (Math.random() - 0.5) * 20 });
    }
    // Nose
    for (let i = 0; i < 20; i++) {
      pts.push({ x: 200 + (Math.random() - 0.5) * 25, y: 175 + Math.random() * 45 });
    }
    // Mouth
    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * Math.PI;
      pts.push({ x: 200 + Math.cos(angle) * 40, y: 260 + Math.sin(angle) * 14 });
    }
    // Eyebrows
    for (let i = 0; i < 20; i++) {
      const cx = i < 10 ? 155 : 245;
      pts.push({ x: cx + (Math.random() - 0.5) * 45, y: 125 + (Math.random() - 0.5) * 10 });
    }
    // Cheeks & forehead scatter
    for (let i = 0; i < 40; i++) {
      pts.push({
        x: 200 + (Math.random() - 0.5) * 180,
        y: 190 + (Math.random() - 0.5) * 240,
      });
    }
    setLandmarks(pts);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto bg-base/80 rounded-2xl overflow-hidden border border-base-border">
      <svg viewBox="0 0 400 380" className="w-full h-full">
        {/* Connection lines */}
        {landmarks.slice(0, 59).map((pt, i) => {
          const next = landmarks[(i + 1) % 60];
          return (
            <line
              key={`l-${i}`}
              x1={pt.x} y1={pt.y} x2={next.x} y2={next.y}
              stroke="#607B8F" strokeWidth={0.4} opacity={0.25}
            />
          );
        })}
        {/* Random mesh connections */}
        {landmarks.map((pt, i) => {
          if (i % 3 !== 0) return null;
          const j = (i + 7) % landmarks.length;
          const other = landmarks[j];
          if (!other) return null;
          const dist = Math.hypot(pt.x - other.x, pt.y - other.y);
          if (dist > 80) return null;
          return (
            <line
              key={`m-${i}`}
              x1={pt.x} y1={pt.y} x2={other.x} y2={other.y}
              stroke="#607B8F" strokeWidth={0.2} opacity={0.12}
            />
          );
        })}
        {/* Points */}
        {landmarks.map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.x} cy={pt.y} r={1.5}
            fill="#607B8F"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5 + Math.random() * 2, delay: i * 0.003, repeat: Infinity }}
          />
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 text-[11px] font-mono text-teal/60">
        {landmarks.length} / 478 landmarks
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-soft" />
        <span className="text-[10px] font-mono text-teal/70">TRACKING</span>
      </div>
    </div>
  );
}

/* ================================================================
   Emotion Bars + Gauge
   ================================================================ */

function EmotionViz() {
  const emotions = [
    { label: "Happy", value: 0.72, color: "#F7E396" },
    { label: "Neutral", value: 0.15, color: "#7A8099" },
    { label: "Surprise", value: 0.08, color: "#E97F4A" },
    { label: "Sad", value: 0.03, color: "#607B8F" },
    { label: "Angry", value: 0.01, color: "#D4654A" },
    { label: "Fear", value: 0.01, color: "#7A8099" },
    { label: "Disgust", value: 0.00, color: "#4A6475" },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-surface rounded-2xl p-6">
        {/* Gauge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-36 h-[72px]">
            <svg viewBox="0 0 140 70" className="w-full h-full">
              <path d="M10 65 A55 55 0 0 1 130 65" fill="none" stroke="#3A4170" strokeWidth="8" strokeLinecap="round" />
              <motion.path
                d="M10 65 A55 55 0 0 1 130 65"
                fill="none" stroke="#F7E396" strokeWidth="8" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 0.72 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3 }}
              />
            </svg>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
              <span className="text-2xl font-bold text-success">72%</span>
              <span className="block text-[10px] text-ivory-dim font-mono">DOMINANT: HAPPY</span>
            </div>
          </div>
        </div>

        {/* Bars */}
        <div className="space-y-3">
          {emotions.map((e, i) => (
            <div key={e.label} className="flex items-center gap-3">
              <span className="text-[12px] font-mono text-ivory-dim w-16">{e.label}</span>
              <div className="flex-1 h-2 bg-base/80 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: e.color }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${e.value * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                />
              </div>
              <span className="text-[12px] font-mono text-ivory-dim w-10 text-right">
                {(e.value * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Deepfake Scanner Viz
   ================================================================ */

function DeepfakeViz() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto bg-base/80 rounded-2xl overflow-hidden border border-base-border">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,227,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(247,227,150,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-success/70 to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Face outline + detection zones */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        <ellipse cx="200" cy="145" rx="90" ry="115" fill="none" stroke="#F7E396" strokeWidth="0.8" strokeDasharray="5 5" opacity={0.3} />

        {[
          { x: 145, y: 105, w: 40, h: 20, label: "L-Eye" },
          { x: 215, y: 105, w: 40, h: 20, label: "R-Eye" },
          { x: 175, y: 155, w: 50, h: 25, label: "Nose" },
          { x: 165, y: 200, w: 70, h: 20, label: "Mouth" },
          { x: 140, y: 80, w: 55, h: 12, label: "L-Brow" },
          { x: 210, y: 80, w: 55, h: 12, label: "R-Brow" },
        ].map((z, i) => (
          <g key={i}>
            <motion.rect
              x={z.x} y={z.y} width={z.w} height={z.h} rx={3}
              fill="none" stroke="#F7E396" strokeWidth={0.8}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.5, delay: i * 0.35, repeat: Infinity }}
            />
            <text
              x={z.x + z.w / 2} y={z.y - 4}
              textAnchor="middle"
              fill="#F7E396"
              fontSize="7" fontFamily="monospace"
              opacity={0.4}
            >
              {z.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-[10px] font-mono text-success/60">ARTIFACT SCAN ACTIVE</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
          <span className="text-[11px] font-mono text-success font-bold">AUTHENTIC</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Pipeline Flow Diagram
   ================================================================ */

function PipelineFlow() {
  const steps = [
    { icon: Eye, label: "Frame Capture", desc: "30fps webcam stream", color: "#7A8099" },
    { icon: Brain, label: "FaceMesh", desc: "478 landmarks, 3D depth", color: "#607B8F" },
    { icon: Gauge, label: "DeepFace", desc: "7-class emotion inference", color: "#E97F4A" },
    { icon: ScanSearch, label: "MesoNet-4", desc: "Artifact detection", color: "#F7E396" },
    { icon: Activity, label: "Scoring", desc: "Weighted composite", color: "#F7E396" },
    { icon: ShieldCheck, label: "JWT Token", desc: "RS256 proof issued", color: "#E97F4A" },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center gap-2 min-w-[700px] px-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-base-card/60 border border-base-border min-w-[110px]"
            >
              <step.icon className="w-5 h-5" style={{ color: step.color }} strokeWidth={1.5} />
              <span className="text-[12px] font-semibold text-ivory whitespace-nowrap">{step.label}</span>
              <span className="text-[10px] text-ivory-dim text-center leading-tight">{step.desc}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="w-6 h-px bg-base-border origin-left"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   Expandable Architecture Detail
   ================================================================ */

function ArchDetail({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-base-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-base-card/30 transition-colors"
      >
        <span className="text-small font-semibold text-ivory">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-ivory-dim" />
        ) : (
          <ChevronDown className="w-4 h-4 text-ivory-dim" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-small text-ivory-muted leading-relaxed space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   Main Page
   ================================================================ */

export default function MLModelsPage() {
  return (
    <div className="min-h-screen bg-base text-ivory">
      {/* ---- Navigation ---- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-md border-b border-base-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-small text-ivory-dim hover:text-ivory transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span className="text-small font-semibold text-ivory">ML Pipeline</span>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto space-y-32">
        {/* ================================================================
           Hero
           ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-base-border bg-base-card/50 mb-8 text-caption uppercase text-ivory-muted tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            Deep Dive
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
            <span className="gradient-text">ML Pipeline</span>
            <br />
            <span className="text-ivory">Three Neural Networks</span>
          </h1>
          <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto leading-relaxed">
            Every verification session routes each video frame through a triple-model pipeline —
            liveness detection, emotion classification, and deepfake analysis — all running in
            real-time at 30fps with sub-100ms total latency.
          </p>
        </motion.div>

        {/* ---- Pipeline Overview ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-h3 text-ivory mb-6 text-center">Inference Pipeline</h3>
          <PipelineFlow />
        </motion.div>

        {/* ================================================================
           Model 1: FaceMesh
           ================================================================ */}
        <section id="facemesh" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                tag="Model 1 — Liveness"
                title={<>MediaPipe <span className="gradient-text">FaceMesh</span></>}
                description="Real-time 3D facial landmark tracking that powers liveness detection through depth analysis and micro-movement verification."
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                <StatBadge label="Landmarks" value="478" color="#607B8F" />
                <StatBadge label="Dimensions" value="3D" color="#607B8F" />
                <StatBadge label="Model Size" value="3.58 MB" color="#7D9AAE" />
                <StatBadge label="Latency" value="30–50ms" color="#7D9AAE" />
              </div>

              <div className="mt-8 space-y-0 card-surface rounded-xl p-5">
                <InfoRow icon={Layers} label="Architecture" value="Lightweight CNN with attention mechanism, optimized for real-time mobile & web inference via TFLite/WASM." />
                <InfoRow icon={Eye} label="Liveness Scoring" value="3D depth analysis (50%) — checks nose-to-ear depth ratio exceeds flat-surface threshold. Micro-movement detection (50%) — tracks involuntary facial tremors." />
                <InfoRow icon={Activity} label="Gesture Challenges" value="Nod, turn head, tilt, blink, open mouth, raise eyebrows — randomly prompted to defeat replay attacks." />
                <InfoRow icon={ShieldCheck} label="Anti-Spoof" value="Flat image detection via coplanarity check. Screen moiré pattern analysis. Print attack rejection via texture frequency analysis." />
                <InfoRow icon={Timer} label="Per-Frame Cost" value="30–50ms including pre/post-processing. Runs at 30fps with room to spare on modern hardware." />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <FaceMeshViz />
            </motion.div>
          </div>

          <div className="mt-10 space-y-3">
            <ArchDetail title="How 3D Depth Liveness Works">
              <p>FaceMesh outputs 478 points with x, y, and z coordinates. The z-axis represents depth relative to the camera. We compute the depth ratio between the nose tip (landmark 1) and ear tragus points (landmarks 234, 454).</p>
              <p>A real face has significant depth variance (nose protrudes 2–4cm from ears). A flat photo or screen has near-zero z-variance. If the depth ratio falls below our calibrated threshold, the frame is flagged as a potential spoof.</p>
              <p>This check runs every frame and contributes 50% of the liveness sub-score.</p>
            </ArchDetail>
            <ArchDetail title="Micro-Movement Detection">
              <p>Even when a person tries to hold still, involuntary micro-movements occur — subtle eyelid tremors, lip tension changes, and head sway. We track the standard deviation of landmark positions across a sliding 10-frame window.</p>
              <p>A static photo produces near-zero deviation. A replayed video produces rhythmic, repeating patterns. A live face produces natural, aperiodic micro-movements that pass our statistical naturalness test.</p>
            </ArchDetail>
            <ArchDetail title="Interactive Gesture Challenges">
              <p>The system randomly prompts the user to perform actions: &quot;Nod your head,&quot; &quot;Turn left,&quot; &quot;Blink twice.&quot; FaceMesh tracks the corresponding landmark displacements in real-time and validates that the gesture was performed naturally (not too fast, not too slow, correct direction).</p>
              <p>This active challenge layer prevents pre-recorded video attacks, since an attacker cannot predict which gestures will be prompted.</p>
            </ArchDetail>
          </div>
        </section>

        {/* ================================================================
           Model 2: DeepFace Emotion
           ================================================================ */}
        <section id="emotion" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 lg:sticky lg:top-24"
            >
              <EmotionViz />
            </motion.div>

            <div className="order-1 lg:order-2">
              <SectionHeading
                tag="Model 2 — Emotion"
                title={<>DeepFace <span className="gradient-text-warm">VGG-Face</span></>}
                description="Real-time emotion classification using a fine-tuned VGG-Face backbone that validates emotional response naturalness during challenges."
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                <StatBadge label="Classes" value="7" color="#E97F4A" />
                <StatBadge label="Backbone" value="VGG" color="#E97F4A" />
                <StatBadge label="Model Size" value="5.98 MB" color="#F09D6E" />
                <StatBadge label="Latency" value="50–100ms" color="#F09D6E" />
              </div>

              <div className="mt-8 space-y-0 card-surface rounded-xl p-5">
                <InfoRow icon={Layers} label="Architecture" value="VGG-Face feature extractor + custom classification head. 7 output classes: happy, sad, angry, surprise, fear, disgust, neutral." />
                <InfoRow icon={Gauge} label="Emotion Scoring" value="We prompt specific emotions ('Smile naturally') and measure confidence match. High-confidence correct emotion = high score." />
                <InfoRow icon={GitBranch} label="Transition Analysis" value="Tracks emotion transitions across frames. Natural faces show smooth probability shifts; deepfakes often jump abruptly between states." />
                <InfoRow icon={ShieldCheck} label="Anti-Spoof" value="Detects rigid expression patterns and penalizes unnatural confidence spikes. Synthetic faces often have emotion distributions that are too 'clean.'" />
                <InfoRow icon={Timer} label="Per-Frame Cost" value="50–100ms for full emotion inference. Runs in parallel with FaceMesh for zero added latency to the pipeline." />
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <ArchDetail title="Emotion Match Scoring">
              <p>During a verification session, the user is prompted with emotion-based challenges: &quot;Smile naturally,&quot; &quot;Show surprise,&quot; or &quot;Return to neutral.&quot; The model&apos;s softmax output for the target emotion class is captured as the match score.</p>
              <p>A genuine human can produce the prompted emotion with 60–95% confidence. A static photo always returns the same emotion. A deepfake often struggles with nuanced emotional transitions.</p>
            </ArchDetail>
            <ArchDetail title="Temporal Transition Analysis">
              <p>We analyze the rate-of-change of emotion probabilities across consecutive frames. Natural emotional transitions follow smooth sigmoid-like curves (0.5–2 seconds from neutral to peak expression).</p>
              <p>Synthetic faces generated by GANs often exhibit one of two tell-tale patterns: either instantaneous jumps (frame N: 10% happy → frame N+1: 90% happy) or complete rigidity (emotion locked at static values).</p>
            </ArchDetail>
            <ArchDetail title="Multi-Frame Confidence Averaging">
              <p>Single-frame emotion detection can be noisy. We average confidence scores across a sliding window of 5 frames to produce a stable reading. This reduces false positives from motion blur or lighting changes while maintaining responsiveness to genuine expression shifts.</p>
            </ArchDetail>
          </div>
        </section>

        {/* ================================================================
           Model 3: MesoNet-4
           ================================================================ */}
        <section id="deepfake" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                tag="Model 3 — Deepfake Defense"
                title={<>MesoNet-4 <span className="gradient-text">Detector</span></>}
                description="A compact CNN specialized in detecting mesoscopic artifacts — the subtle compression and blending traces that deepfakes leave behind."
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                <StatBadge label="Conv Layers" value="4" color="#F7E396" />
                <StatBadge label="Model Size" value="0.15 MB" color="#F7E396" />
                <StatBadge label="Training" value="FF++" color="#FAECB3" />
                <StatBadge label="Latency" value="20–40ms" color="#FAECB3" />
              </div>

              <div className="mt-8 space-y-0 card-surface rounded-xl p-5">
                <InfoRow icon={Layers} label="Architecture" value="4 convolutional layers with inception-style modules. Extremely lightweight at just 0.15 MB — designed to run alongside heavier models without bottlenecking." />
                <InfoRow icon={ScanSearch} label="Detection Method" value="Analyzes mesoscopic (mid-frequency) spatial features that reveal GAN/autoencoder artifacts invisible to the human eye." />
                <InfoRow icon={Database} label="Training Data" value="FaceForensics++ dataset covering Face2Face, FaceSwap, Deepfakes, and NeuralTextures manipulation methods." />
                <InfoRow icon={Zap} label="Early Termination" value="If confidence exceeds 98% deepfake on any single frame, the session is immediately failed — no need to wait for the full challenge sequence." />
                <InfoRow icon={Timer} label="Per-Frame Cost" value="20–40ms — the fastest model in the pipeline. Its lightweight design means it can process every single captured frame." />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <DeepfakeViz />

              {/* Confidence bar */}
              <div className="mt-4 card-surface rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-mono text-ivory-dim">Authenticity Confidence</span>
                  <span className="text-[12px] font-mono text-success font-bold">96.2%</span>
                </div>
                <div className="h-2 bg-base/80 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-success"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "96.2%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-ivory-dim">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Real (96.2%)
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose" />
                    Fake (3.8%)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 space-y-3">
            <ArchDetail title="What Are Mesoscopic Artifacts?">
              <p>Deepfake generation (GANs, autoencoders) operates at two scales: macroscopic (overall face shape) and microscopic (individual pixel noise). Between them lies the mesoscopic scale — mid-frequency features like skin texture patterns, compression boundaries, and blending seams.</p>
              <p>MesoNet-4 is specifically designed to detect artifacts at this scale, where deepfakes are weakest. GAN-generated faces often have subtle but consistent checkerboard patterns from upsampling layers, or blending artifacts around the jawline and hairline.</p>
            </ArchDetail>
            <ArchDetail title="Spatial + Temporal Analysis">
              <p>Single-frame spatial analysis catches most deepfakes, but sophisticated real-time deepfakes can sometimes fool individual frames. To counter this, we also analyze temporal consistency — the model&apos;s confidence should remain stable across consecutive frames of a real face.</p>
              <p>Deepfake systems processing live video often produce flickering confidence (artifact appears in some frames but not others), which our temporal smoothing layer detects as a tampering signal.</p>
            </ArchDetail>
            <ArchDetail title="Early Termination for Obvious Fakes">
              <p>If MesoNet-4 returns &gt;98% deepfake confidence on any single frame, the system immediately terminates the session with a FAIL verdict. This prevents attackers from &quot;warming up&quot; a deepfake system and hoping it stabilizes.</p>
              <p>The early termination check runs before FaceMesh gestures and emotion challenges, saving compute and providing instant rejection of low-effort attacks.</p>
            </ArchDetail>
          </div>
        </section>

        {/* ================================================================
           Combined Scoring Summary
           ================================================================ */}
        <section className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="section-divider mx-auto mb-6" />
            <span className="text-caption uppercase text-accent tracking-widest mb-4 block">Composite Scoring</span>
            <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
              How Scores <span className="gradient-text-warm">Combine</span>
            </h2>
            <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
              Each model produces a sub-score that feeds into a weighted composite formula.
              The final score determines whether the user passes verification.
            </p>
          </motion.div>

          <div className="card-surface rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="font-mono text-body-lg text-center text-ivory-muted mb-8 leading-relaxed">
              <span className="text-accent font-bold">S</span> ={" "}
              <span className="text-teal">0.50</span> × <span className="text-teal">Liveness</span> +{" "}
              <span className="text-accent">0.25</span> × <span className="text-accent">Emotion</span> +{" "}
              <span className="text-success">0.25</span> × <span className="text-success">Deepfake</span>
            </div>

            <div className="space-y-4">
              {[
                { label: "Liveness (FaceMesh)", weight: "50%", score: "0.92", color: "#607B8F" },
                { label: "Emotion (DeepFace)", weight: "25%", score: "0.78", color: "#E97F4A" },
                { label: "Deepfake (MesoNet-4)", weight: "25%", score: "0.95", color: "#F7E396" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-small text-ivory w-40">{item.label}</span>
                  <div className="flex-1 h-2 bg-base/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${parseFloat(item.score) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-small font-mono text-ivory-dim w-10 text-right">{item.score}</span>
                  <span className="text-[11px] font-mono text-ivory-dim w-8">×{item.weight}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-base-border flex items-center justify-between">
              <span className="text-small font-semibold text-ivory">Composite Score</span>
              <div className="flex items-center gap-3">
                <span className="text-h3 font-bold font-mono text-success">0.891</span>
                <span className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-[11px] font-mono text-success font-semibold">
                  PASS ≥ 0.70
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/">
            <GlowButton>Back to Overview</GlowButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
