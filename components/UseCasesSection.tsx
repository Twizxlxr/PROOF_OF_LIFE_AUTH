"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  HeartPulse,
  FileCheck,
  GraduationCap,
  Bot,
  Fingerprint,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const useCases = [
  {
    icon: Landmark,
    title: "Banking & Finance",
    desc: "Secure account access, transaction approval, and fraud prevention for financial services.",
    examples: [
      "Multi-factor login for online banking",
      "High-value transaction authorization",
      "Fraud detection at account creation",
      "Corporate VPN access verification",
    ],
    color: "#E97F4A",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    desc: "Patient identity verification for telemedicine, portals, and prescription access.",
    examples: [
      "Telemedicine patient verification",
      "Healthcare portal authentication",
      "Prescription refill authorization",
      "HIPAA-compliant access control",
    ],
    color: "#607B8F",
  },
  {
    icon: FileCheck,
    title: "KYC / Compliance",
    desc: "Know Your Customer regulatory compliance for onboarding and identity verification.",
    examples: [
      "Remote identity verification",
      "Account creation screening",
      "Employee onboarding verification",
      "Regulatory audit trail generation",
    ],
    color: "#F7E396",
  },
  {
    icon: GraduationCap,
    title: "Online Exam Proctoring",
    desc: "Ensure exam integrity by verifying live human presence throughout testing sessions.",
    examples: [
      "Pre-exam identity verification",
      "Continuous presence monitoring",
      "Anti-cheating enforcement",
      "Certification exam security",
    ],
    color: "#D4654A",
  },
  {
    icon: Bot,
    title: "Anti-Bot Protection",
    desc: "Block automated attacks, credential stuffing, and bot-driven fraud at scale.",
    examples: [
      "Prevent automated account creation",
      "Stop credential stuffing attacks",
      "Protect sensitive API endpoints",
      "Secure online voting systems",
    ],
    color: "#7A8099",
  },
  {
    icon: Fingerprint,
    title: "Access Control",
    desc: "Physical and digital access control requiring live biometric proof-of-presence.",
    examples: [
      "Privileged operation approval",
      "Sensitive data access gates",
      "Multi-factor authentication layer",
      "Works on any device with a camera",
    ],
    color: "#E97F4A",
  },
];

export default function UseCasesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <SectionWrapper id="usecases">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="section-divider mx-auto mb-6" />
        <span className="text-caption uppercase text-rose tracking-widest mb-4 block">
          Applications
        </span>
        <h2 className="text-h2 md:text-h1 text-ivory mb-4 text-balance">
          Real-World{" "}
          <span className="gradient-text-warm">Use Cases</span>
        </h2>
        <p className="text-ivory-muted text-body-lg max-w-2xl mx-auto">
          From banking to exam proctoring — proof-of-life authentication
          protects wherever human presence must be confirmed.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {useCases.map((uc, i) => {
          const Icon = uc.icon;
          const isOpen = active === i;

          return (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onClick={() => setActive(isOpen ? null : i)}
              className="cursor-pointer"
            >
              <div
                className={`card-surface rounded-2xl p-6 h-full transition-all duration-300 hover:border-base-hover ${
                  isOpen ? "border border-opacity-30" : ""
                }`}
                style={isOpen ? { borderColor: `${uc.color}40` } : {}}
              >
                <div
                  className="inline-flex p-2.5 rounded-xl mb-4"
                  style={{ backgroundColor: `${uc.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: uc.color }} strokeWidth={1.5} />
                </div>

                <h3 className="text-ivory font-semibold mb-2">{uc.title}</h3>
                <p className="text-ivory-dim text-small leading-relaxed">{uc.desc}</p>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 pt-4 border-t border-base-border space-y-2">
                        {uc.examples.map((ex, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-start gap-2 text-small text-ivory-muted"
                          >
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: uc.color }}
                            />
                            {ex}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-3 text-caption text-ivory-dim/50">
                  {isOpen ? "Click to collapse" : "Click for examples"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
