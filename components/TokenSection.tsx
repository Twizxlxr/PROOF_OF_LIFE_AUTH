"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Key, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const HEADER = {
  alg: "RS256",
  typ: "JWT",
};

const PAYLOAD = {
  sub: "user_8f3a2b1c",
  session: "sess_vrf_a7c3e9",
  score: 0.891,
  liveness: 0.92,
  emotion: 0.78,
  deepfake: 0.95,
  result: "PASS",
  iat: 1717012800,
  exp: 1717013700,
};

const SIGNATURE_STUB = "dGhpcyBpcyBhIHNpZ25hdHVyZSBzdHViIGZvciB2aXN1YWxpemF0aW9uIG9ubHk...";

function b64(obj: object | string) {
  if (typeof obj === "string") return obj;
  return btoa(JSON.stringify(obj)).replace(/=/g, "");
}

function ColoredToken({ showDecoded }: { showDecoded: boolean }) {
  if (showDecoded) {
    return (
      <div className="space-y-3 font-mono text-[12px] leading-relaxed">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-accent/60 mb-1 block">Header</span>
          <pre className="text-accent whitespace-pre-wrap">{JSON.stringify(HEADER, null, 2)}</pre>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-teal/60 mb-1 block">Payload</span>
          <pre className="text-teal whitespace-pre-wrap">{JSON.stringify(PAYLOAD, null, 2)}</pre>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-rose/60 mb-1 block">Signature</span>
          <pre className="text-rose break-all">{SIGNATURE_STUB}</pre>
        </div>
      </div>
    );
  }

  const header = b64(HEADER);
  const payload = b64(PAYLOAD);
  const sig = "dGhpcyBpcyBhIHNpZ25hdHVyZSBzdHViIGZvciB2aXN1YWxpemF0aW9uIG9ubHk";

  return (
    <div className="font-mono text-[11px] break-all leading-relaxed">
      <span className="text-accent">{header}</span>
      <span className="text-ivory-dim">.</span>
      <span className="text-teal">{payload}</span>
      <span className="text-ivory-dim">.</span>
      <span className="text-rose">{sig}</span>
    </div>
  );
}

function Countdown() {
  const [seconds, setSeconds] = useState(900);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 900 : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = (seconds / 900) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-base-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: pct > 25 ? "#F7E396" : "#D4654A" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <span className="text-[12px] font-mono text-ivory-dim tabular-nums w-12 text-right">
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function TokenSection() {
  const [decoded, setDecoded] = useState(false);
  const toggle = useCallback(() => setDecoded((d) => !d), []);

  return (
    <SectionWrapper id="token">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — editorial */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-divider mb-6" />
          <span className="text-caption uppercase text-teal-light tracking-widest mb-4 block">
            Token
          </span>
          <h2 className="text-h2 md:text-h1 text-ivory mb-5 text-balance">
            JWT{" "}
            <span className="gradient-text">Proof Token</span>
          </h2>
          <p className="text-ivory-muted text-body-lg leading-relaxed mb-6">
            A successful verification issues a short-lived RS256-signed JWT.
            The token carries the composite score, sub-scores, and session
            metadata — never any biometric data.
          </p>

          {/* Legend */}
          <div className="space-y-3">
            {[
              { label: "Header", desc: "Algorithm & type", color: "#E97F4A" },
              { label: "Payload", desc: "Claims & scores", color: "#607B8F" },
              { label: "Signature", desc: "RS256 proof", color: "#D4654A" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-small font-medium text-ivory">{item.label}</span>
                <span className="text-small text-ivory-dim">— {item.desc}</span>
              </div>
            ))}
          </div>

          {/* RS256 badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <Key className="w-3.5 h-3.5 text-success" strokeWidth={1.5} />
            <span className="text-[12px] font-mono text-success font-medium">RS256 — Asymmetric Signing</span>
          </div>
        </motion.div>

        {/* Right — token card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="card-surface rounded-2xl p-6">
            {/* Toggle */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-small font-semibold text-ivory">Token View</span>
              <button
                onClick={toggle}
                className="flex items-center gap-2 text-small text-ivory-dim hover:text-ivory transition-colors"
              >
                {decoded ? (
                  <ToggleRight className="w-5 h-5 text-accent" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-ivory-dim" />
                )}
                {decoded ? "Decoded" : "Encoded"}
              </button>
            </div>

            <div className="bg-base/80 rounded-xl p-4 border border-base-border min-h-[200px]">
              <ColoredToken showDecoded={decoded} />
            </div>
          </div>

          {/* Expiry */}
          <div className="card-surface rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="text-small font-semibold text-ivory">Token Expiry</span>
              <span className="text-[11px] font-mono text-ivory-dim ml-auto">15 min TTL</span>
            </div>
            <Countdown />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
