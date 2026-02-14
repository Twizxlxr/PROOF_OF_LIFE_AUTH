"use client";

import { motion } from "framer-motion";
import { KeyRound, Repeat, UserX, Scan } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import AnimatedCard from "./AnimatedCard";

const threats = [
  {
    icon: KeyRound,
    title: "Password Breaches",
    stat: "24B+",
    statLabel: "credentials exposed",
    description:
      "Static passwords can be stolen, guessed, or phished. Over 24 billion credentials have been exposed in data breaches worldwide.",
    color: "text-rose",
  },
  {
    icon: Repeat,
    title: "2FA Bypass Attacks",
    stat: "78%",
    statLabel: "bypass success rate",
    description:
      "SIM-swap attacks, TOTP phishing, and real-time relay proxies render traditional two-factor authentication increasingly unreliable.",
    color: "text-rose-light",
  },
  {
    icon: Scan,
    title: "Replay Attacks",
    stat: "< 2s",
    statLabel: "to replay a session",
    description:
      "Pre-recorded video and audio can bypass biometric systems that lack real-time liveness verification capabilities.",
    color: "text-accent",
  },
  {
    icon: UserX,
    title: "Deepfake Impersonation",
    stat: "96%",
    statLabel: "fool human reviewers",
    description:
      "AI-generated faces and voice clones fool humans and basic biometric checks. Real-time deepfake generation is now accessible to anyone.",
    color: "text-rose",
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: editorial copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-6" />
          <span className="text-caption uppercase text-rose tracking-widest mb-4 block">
            The Problem
          </span>
          <h2 className="text-h2 md:text-h1 text-ivory mb-6 text-balance">
            Authentication is{" "}
            <span className="gradient-text-warm">fundamentally broken</span>
          </h2>
          <p className="text-ivory-muted text-body-lg leading-relaxed mb-8 max-w-lg">
            Traditional identity verification was designed for a world without
            AI-generated media. That world no longer exists. Every layer of
            conventional auth can be defeated with off-the-shelf tools.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-bold text-rose mb-1">4.1B</div>
              <div className="text-caption text-ivory-dim">records breached in 2025</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">300%</div>
              <div className="text-caption text-ivory-dim">deepfake attack increase</div>
            </div>
          </div>
        </motion.div>

        {/* Right: threat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {threats.map((threat, i) => (
            <AnimatedCard key={threat.title} delay={i * 0.1}>
              <div className={`mb-4 ${threat.color}`}>
                <threat.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-ivory font-semibold mb-1.5 text-sm">
                {threat.title}
              </h3>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className={`text-xl font-bold ${threat.color}`}>{threat.stat}</span>
                <span className="text-caption text-ivory-dim">{threat.statLabel}</span>
              </div>
              <p className="text-ivory-dim text-small leading-relaxed">
                {threat.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
