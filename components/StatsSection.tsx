"use client";

import { motion } from "framer-motion";
import {
  Code2,
  TestTube2,
  ShieldCheck,
  Rocket,
  Mic,
  Smartphone,
  Activity,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import AnimatedCard from "./AnimatedCard";

const stats = [
  { value: "7,000+", label: "Lines of Code", color: "#E97F4A" },
  { value: "328", label: "Total Tests", color: "#607B8F" },
  { value: "50+", label: "Project Files", color: "#F7E396" },
  { value: "9", label: "Core Services", color: "#D4654A" },
  { value: "3", label: "ML Models", color: "#E97F4A" },
  { value: "15", label: "Backend Deps", color: "#607B8F" },
];

const compliance = [
  { label: "OWASP Top 10", desc: "Web application security compliance" },
  { label: "GDPR / CCPA", desc: "Privacy regulation considerations" },
  { label: "ISO/IEC 30107", desc: "Presentation Attack Detection standard" },
  { label: "NIST SP 800-63B", desc: "Digital Identity Guidelines" },
  { label: "FIDO Alliance", desc: "Authentication protocol principles" },
  { label: "WCAG 2.1", desc: "Accessibility guidelines consideration" },
];

const roadmap = [
  {
    icon: Mic,
    title: "Voice Analysis",
    desc: "Add voice biometrics for multi-modal verification",
  },
  {
    icon: Activity,
    title: "Behavioral Biometrics",
    desc: "Analyze typing patterns and mouse movements",
  },
  {
    icon: TrendingUp,
    title: "Risk-Based Auth",
    desc: "Adjust challenge difficulty based on risk score",
  },
  {
    icon: RefreshCcw,
    title: "Continuous Auth",
    desc: "Periodic re-verification during active sessions",
  },
  {
    icon: Smartphone,
    title: "Mobile SDK",
    desc: "Native iOS and Android support",
  },
  {
    icon: Rocket,
    title: "Edge Deployment",
    desc: "Run models on-device for privacy and speed",
  },
];

export default function StatsSection() {
  return (
    <SectionWrapper id="stats">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="section-divider mx-auto mb-6" />
        <span className="text-caption uppercase text-accent tracking-widest mb-4 block">
          Project Stats
        </span>
        <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
          By the{" "}
          <span className="gradient-text">Numbers</span>
        </h2>
        <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
          A production-ready system backed by comprehensive testing,
          industry-standard compliance, and a clear roadmap.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-14">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="card-surface rounded-xl p-4 text-center"
          >
            <div
              className="text-h3 md:text-h2 font-bold font-mono mb-1"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-caption text-ivory-dim">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance */}
        <AnimatedCard delay={0}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-teal/10">
              <ShieldCheck className="w-4 h-4 text-teal" strokeWidth={1.5} />
            </div>
            <h3 className="text-ivory font-semibold">Compliance & Standards</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compliance.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                <div>
                  <span className="text-small font-medium text-ivory">{c.label}</span>
                  <span className="text-caption text-ivory-dim block">{c.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        {/* Roadmap */}
        <AnimatedCard delay={0.1}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent/10">
              <Rocket className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <h3 className="text-ivory font-semibold">Future Roadmap</h3>
          </div>
          <div className="space-y-3">
            {roadmap.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1.5 rounded-md bg-accent/5 flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-small font-medium text-ivory">{r.title}</span>
                    <span className="text-caption text-ivory-dim ml-2">— {r.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedCard>
      </div>

      {/* Testing highlight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 card-surface rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-success/10">
            <TestTube2 className="w-4 h-4 text-success" strokeWidth={1.5} />
          </div>
          <h3 className="text-ivory font-semibold">Testing Strategy</h3>
          <span className="ml-auto text-caption font-mono text-success">328 total tests</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Service Tests", value: "200+", sub: "9 services covered" },
            { label: "Integration", value: "70+", sub: "E2E + WebSocket" },
            { label: "Property-Based", value: "37", sub: "Hypothesis framework" },
            { label: "Frameworks", value: "4", sub: "pytest · httpx · asyncio" },
          ].map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <div className="text-h3 font-bold font-mono text-success/80 mb-0.5">
                {t.value}
              </div>
              <div className="text-small font-medium text-ivory">{t.label}</div>
              <div className="text-caption text-ivory-dim">{t.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
