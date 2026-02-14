"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  SmilePlus,
  ScanFace,
  Dices,
  Calculator,
  BadgeCheck,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const solutions = [
  {
    icon: Eye,
    title: "Liveness Detection",
    short: "Confirms the subject is physically present and alive in real-time.",
    detail:
      "Uses MediaPipe FaceMesh to track 478 3D facial landmarks in real-time. Combines 3D depth analysis (nose protrusion, Z-axis variance) at 50% weight with micro-movement detection at 50% weight to confirm a live person is present — not a photo, video, or 3D mask.",
    accent: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/20",
  },
  {
    icon: SmilePlus,
    title: "Emotion Verification",
    short: "Validates that challenged emotional responses are genuine.",
    detail:
      "Leverages DeepFace with VGG-Face backbone for 7-class emotion classification (happy, sad, angry, surprise, fear, disgust, neutral). Analyzes emotion match confidence and transition naturalness to detect rigid synthetic patterns.",
    accent: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: ScanFace,
    title: "Deepfake Detection",
    short: "AI-powered detection of synthetic and manipulated media.",
    detail:
      "Employs a MesoNet-4 CNN (just 0.15 MB) trained on FaceForensics++ to detect Face2Face, FaceSwap, and Deepfake artifacts. Combines spatial artifact analysis with temporal consistency checks; supports early termination on high-confidence deepfake signals.",
    accent: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  {
    icon: Dices,
    title: "Challenge Engine",
    short: "Generates unique, unpredictable verification challenges.",
    detail:
      "Produces sequences of 3–5 random challenges per session. Two types: gestures (nod, turn, tilt, blink, open mouth, raise eyebrows) and expressions (smile, surprised, neutral). Each challenge includes a cryptographic nonce for replay prevention.",
    accent: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/20",
  },
  {
    icon: Calculator,
    title: "Scoring Engine",
    short: "Weighted multi-factor confidence scoring with configurable thresholds.",
    detail:
      "Computes a weighted composite score: 50% Liveness + 25% Emotion + 25% Deepfake detection. Sessions scoring ≥0.70 (70%) pass verification. Returns pass/fail decision with detailed component scores.",
    accent: "text-teal-light",
    bg: "bg-teal/10",
    border: "border-teal/20",
  },
  {
    icon: BadgeCheck,
    title: "Token Issuer",
    short: "Issues cryptographically signed proof-of-life JWT tokens.",
    detail:
      "Upon success, issues RS256-signed JWT tokens containing session ID, timestamp, component scores, and final verdict. Tokens are short-lived (15 min) and verifiable by any relying party.",
    accent: "text-accent-light",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
];

export default function SolutionSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <SectionWrapper id="solution">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="section-divider mx-auto mb-6" />
        <span className="text-caption uppercase text-teal tracking-widest mb-4 block">
          The Solution
        </span>
        <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
          Multi-Factor{" "}
          <span className="gradient-text">Proof-of-Life</span>
        </h2>
        <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
          Six integrated verification layers working in concert to
          cryptographically prove a human is present, alive, and genuine.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {solutions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="group cursor-pointer"
          >
            <div className={`relative card-surface rounded-2xl p-6 h-full transition-all duration-300 hover:border-base-hover ${expanded === i ? `border ${s.border}` : ""}`}>
              {/* Top accent line */}
              <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-base-border to-transparent ${expanded === i ? "via-accent/30" : ""}`} />

              <div className={`inline-flex p-2.5 rounded-xl ${s.bg} mb-4`}>
                <s.icon className={`w-5 h-5 ${s.accent}`} strokeWidth={1.5} />
              </div>

              <h3 className="text-ivory font-semibold mb-2">{s.title}</h3>
              <p className="text-ivory-dim text-small leading-relaxed">{s.short}</p>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-base-border">
                      <p className="text-ivory-muted text-small leading-relaxed">
                        {s.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-3 text-caption text-ivory-dim/50">
                {expanded === i ? "Click to collapse" : "Click for details"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
