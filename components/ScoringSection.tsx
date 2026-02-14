"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sliders, CheckCircle, XCircle } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const WEIGHTS = { liveness: 0.5, emotion: 0.25, deepfake: 0.25 };
const THRESHOLD = 0.7;

function ScoreSlider({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-small font-medium text-ivory">{label}</span>
        <span className="text-small font-mono text-ivory-dim">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="relative group">
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(value * 100)}
          onChange={(e) => onChange(parseInt(e.target.value) / 100)}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-base-border
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-current
                     [&::-webkit-slider-thumb]:bg-base [&::-webkit-slider-thumb]:shadow-lg"
          style={{ color }}
        />
        <div
          className="absolute top-1/2 left-0 h-1.5 rounded-full -translate-y-1/2 pointer-events-none"
          style={{ width: `${value * 100}%`, backgroundColor: color, opacity: 0.6 }}
        />
      </div>
    </div>
  );
}

export default function ScoringSection() {
  const [liveness, setLiveness] = useState(0.92);
  const [emotion, setEmotion] = useState(0.78);
  const [deepfake, setDeepfake] = useState(0.95);

  const composite = useMemo(
    () =>
      WEIGHTS.liveness * liveness + WEIGHTS.emotion * emotion + WEIGHTS.deepfake * deepfake,
    [liveness, emotion, deepfake]
  );

  const pass = composite >= THRESHOLD;

  return (
    <SectionWrapper id="scoring">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — editorial */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-divider mb-6" />
          <span className="text-caption uppercase text-accent tracking-widest mb-4 block">
            Composite Score
          </span>
          <h2 className="text-h2 md:text-h1 text-ivory mb-5 text-balance">
            Weighted{" "}
            <span className="gradient-text-warm">Trust Score</span>
          </h2>
          <p className="text-ivory-muted text-body-lg mb-6 leading-relaxed">
            Every verification session produces a single confidence score that
            determines whether the user is a living, genuine human. Adjust the
            sliders to see how each sub-score affects the outcome.
          </p>

          {/* Formula card */}
          <div className="card-surface rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="text-small font-semibold text-ivory">Formula</span>
            </div>
            <div className="font-mono text-small text-ivory-muted leading-relaxed">
              <span className="text-accent">S</span> ={" "}
              <span className="text-teal">0.50</span> × Liveness +{" "}
              <span className="text-accent">0.25</span> × Emotion +{" "}
              <span className="text-success">0.25</span> × Deepfake
            </div>
            <div className="mt-3 pt-3 border-t border-base-border text-[11px] text-ivory-dim font-mono">
              Threshold: <span className="text-ivory">≥ 0.70</span> → PASS
            </div>
          </div>
        </motion.div>

        {/* Right — interactive */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card-surface rounded-2xl p-6 md:p-8"
        >
          <div className="space-y-6 mb-8">
            <ScoreSlider label="Liveness (50%)" value={liveness} onChange={setLiveness} color="#607B8F" />
            <ScoreSlider label="Emotion Match (25%)" value={emotion} onChange={setEmotion} color="#E97F4A" />
            <ScoreSlider label="Deepfake Defense (25%)" value={deepfake} onChange={setDeepfake} color="#F7E396" />
          </div>

          {/* Result */}
          <div className="border-t border-base-border pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-small font-medium text-ivory-dim">Composite Score</span>
              <span
                className="text-h3 font-bold font-mono"
                style={{ color: pass ? "#F7E396" : "#D4654A" }}
              >
                {composite.toFixed(3)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 bg-base/80 rounded-full overflow-hidden mb-4">
              {/* Threshold marker */}
              <div
                className="absolute top-0 bottom-0 w-px bg-ivory/30 z-10"
                style={{ left: `${THRESHOLD * 100}%` }}
              />
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: pass ? "#F7E396" : "#D4654A" }}
                animate={{ width: `${composite * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>

            {/* Verdict */}
            <div
              className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold ${
                pass
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-rose/10 text-rose border border-rose/20"
              }`}
            >
              {pass ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  VERIFICATION PASSED
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  VERIFICATION FAILED
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
