"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const steps = [
  {
    num: 1,
    title: "Session Creation",
    desc: "Client requests a new verification session with user_id. Server generates a unique session ID, stores it in SQLite, and returns a WebSocket URL.",
    json: `{
  "session_id": "sess_7f3a2b1c",
  "websocket_url": "ws://localhost:8000/ws/verify/sess_7f3a2b1c",
  "status": "active",
  "timeout": "2 minutes",
  "max_failures": 3
}`,
  },
  {
    num: 2,
    title: "Challenge Generation",
    desc: "The Challenge Engine produces 3–5 unique challenges per session: gestures (nod, turn, tilt, blink) and expressions (smile, surprised, neutral). Each includes a cryptographic nonce.",
    json: `{
  "type": "CHALLENGE_ISSUED",
  "data": {
    "challenge_id": "ch_9e4f2a1b",
    "challenge_type": "gesture",
    "instruction": "Please nod your head up",
    "nonce": "32-byte-url-safe-token",
    "nonce_expiry": "5 minutes",
    "timeout_seconds": 10
  }
}`,
  },
  {
    num: 3,
    title: "Live Video Streaming",
    desc: "Client captures webcam frames at 10 FPS and streams them to the backend via WebSocket as base64-encoded JPEG. Server validates nonce per frame.",
    json: `{
  "type": "video_frame",
  "frame": "data:image/jpeg;base64,/9j/4AAQ...",
  "challenge_id": "ch_9e4f2a1b",
  "nonce": "32-byte-url-safe-token",
  "timestamp": 1708423801234
}`,
  },
  {
    num: 4,
    title: "ML Processing",
    desc: "Each frame runs through three ML models in parallel: MediaPipe FaceMesh (478 landmarks), DeepFace VGG-Face (emotion), and MesoNet-4 (deepfake). Total: 100–200ms per frame.",
    json: `{
  "type": "SCORE_UPDATE",
  "data": {
    "facemesh": {
      "landmarks": 478,
      "depth_score": 0.87,
      "movement_score": 0.91
    },
    "liveness_score": 0.89,
    "emotion_score": 0.82,
    "deepfake_score": 0.96
  }
}`,
  },
  {
    num: 5,
    title: "Scoring",
    desc: "The Scoring Engine computes weighted composite scores from all ML results accumulated during the session.",
    json: `{
  "scores": {
    "liveness": 0.94,
    "emotion": 0.87,
    "deepfake": 0.96
  },
  "formula": "(0.50 × 0.94) + (0.25 × 0.87) + (0.25 × 0.96)",
  "final_score": 0.9275,
  "verdict": "PASS"
}`,
  },
  {
    num: 6,
    title: "Token Issuance",
    desc: "Upon passing (≥0.70), an RS256-signed JWT is issued. Token stored in Convex database. Contains session ID, user ID, score, and 15-minute expiry.",
    json: `{
  "type": "VERIFICATION_SUCCESS",
  "data": {
    "token": "eyJhbGciOiJSUzI1NiIs...",
    "final_score": 0.9275,
    "liveness_score": 0.94,
    "emotion_score": 0.87,
    "deepfake_score": 0.96
  }
}`,
  },
];

export default function FlowSection() {
  const [active, setActive] = useState(0);

  return (
    <SectionWrapper id="flow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="section-divider mx-auto mb-6" />
        <span className="text-caption uppercase text-success tracking-widest mb-4 block">
          Verification Flow
        </span>
        <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
          Watch It{" "}
          <span className="gradient-text">Operate</span>
        </h2>
        <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
          Step-by-step walkthrough of the complete verification pipeline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Timeline */}
        <div className="flex flex-col gap-1.5">
          {steps.map((step, i) => (
            <motion.button
              key={step.num}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-250 cursor-pointer ${
                active === i
                  ? "card-surface border border-accent/20"
                  : "bg-transparent hover:bg-base-hover"
              }`}
            >
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  active === i
                    ? "bg-accent text-base"
                    : i < active
                    ? "bg-success/20 text-success"
                    : "bg-base-border text-ivory-dim"
                }`}
              >
                {i < active ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
              </div>
              <span className={`text-small font-medium ${active === i ? "text-ivory" : "text-ivory-dim"}`}>
                {step.title}
              </span>
              {active === i && (
                <motion.div layoutId="flowArrow" className="ml-auto">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </motion.div>
              )}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              let i = 0;
              const interval = setInterval(() => {
                i++;
                if (i >= steps.length) { clearInterval(interval); return; }
                setActive(i);
              }, 1500);
              setActive(0);
            }}
            className="mt-3 flex items-center justify-center gap-2 p-3 rounded-xl border border-teal/20 text-teal hover:bg-teal/5 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span className="text-small font-medium">Auto-Play Flow</span>
          </motion.button>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="card-surface rounded-2xl p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-sm font-bold text-base">
                {steps[active].num}
              </div>
              <h3 className="text-h3 text-ivory">{steps[active].title}</h3>
            </div>

            <p className="text-ivory-muted mb-6 leading-relaxed text-body">
              {steps[active].desc}
            </p>

            {/* JSON block */}
            <div className="rounded-xl overflow-hidden border border-base-border">
              <div className="flex items-center justify-between bg-base/80 px-4 py-2.5 border-b border-base-border">
                <span className="text-caption font-mono text-ivory-dim">response.json</span>
                <span className="text-caption font-mono text-accent/50">
                  Step {steps[active].num} / {steps.length}
                </span>
              </div>
              <pre className="bg-base-light/50 p-5 overflow-x-auto">
                <code className="text-small font-mono text-ivory-muted leading-relaxed">
                  {steps[active].json}
                </code>
              </pre>
            </div>

            {/* Progress bar */}
            <div className="mt-6 flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                    i <= active ? "bg-accent" : "bg-base-border"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
