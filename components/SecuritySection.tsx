"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Timer,
  KeyRound,
  FileSearch,
  VideoOff,
  ChevronDown,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const items = [
  {
    icon: ShieldCheck,
    title: "Replay Attack Prevention",
    color: "#607B8F",
    summary: "Cryptographic nonces and unique challenge sequences make replay impossible.",
    details: [
      "32-byte cryptographic nonce per challenge (secrets.token_urlsafe)",
      "Nonce stored in SQLite with 5-minute expiration",
      "Server validates nonce matches session and hasn't been used",
      "Used nonces immediately invalidated, expired ones auto-purged",
    ],
  },
  {
    icon: Timer,
    title: "Session Timeout & Rate Limiting",
    color: "#E97F4A",
    summary: "Strict timeouts and failure limits prevent brute-force abuse.",
    details: [
      "2-minute maximum session duration",
      "3 consecutive failures before session termination",
      "Session states: active → completed / timeout / failed",
      "Immutable state transitions with full audit trail",
    ],
  },
  {
    icon: KeyRound,
    title: "JWT RS256 Token Signing",
    color: "#F7E396",
    summary: "2048-bit RSA asymmetric signing prevents token forgery.",
    details: [
      "RS256 (RSA + SHA-256) with 2048-bit key pair",
      "Private key stored in environment secrets (server-only)",
      "Public key distributable for verification by relying parties",
      "15-minute token expiry with no refresh flow",
    ],
  },
  {
    icon: FileSearch,
    title: "Comprehensive Audit Trail",
    color: "#D4654A",
    summary: "Every verification event is logged in SQLite for compliance.",
    details: [
      "Structured JSON logs per verification step",
      "Includes timestamps, scores, challenge responses",
      "90-day retention policy with automatic purging",
      "Exportable for SOC2 / GDPR / CCPA audit requests",
    ],
  },
  {
    icon: VideoOff,
    title: "Zero Video Storage",
    color: "#7A8099",
    summary: "No biometric data is stored — ever.",
    details: [
      "Frames processed in-memory and immediately discarded",
      "Only derived numerical scores are persisted",
      "No PII is included in audit logs",
      "Compliant with GDPR data minimisation principles",
    ],
  },
];

export default function SecuritySection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionWrapper id="security">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Left col — editorial */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-divider mb-6" />
          <span className="text-caption uppercase text-accent tracking-widest mb-4 block">
            Security
          </span>
          <h2 className="text-h2 md:text-h1 text-ivory mb-5 text-balance">
            Defense{" "}
            <span className="gradient-text">in Depth</span>
          </h2>
          <p className="text-ivory-muted text-body-lg leading-relaxed">
            Five interlocking safeguards create a security posture that protects
            both the system and the end-user at every layer.
          </p>
        </motion.div>

        {/* Right col — accordion */}
        <div className="lg:col-span-3 space-y-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isOpen = open === i;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-surface rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left group"
                >
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-ivory group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-ivory-dim mt-0.5 truncate">{item.summary}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-ivory-dim" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="px-5 pb-5 pt-0 space-y-2">
                        {item.details.map((d, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-start gap-2 text-small text-ivory-muted"
                          >
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            {d}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
