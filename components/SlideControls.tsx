"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Play,
  Monitor,
  Keyboard,
  X,
} from "lucide-react";
import { usePresentation } from "./PresentationProvider";

function SlideProgress() {
  const { currentSlide, totalSlides } = usePresentation();
  return (
    <div className="h-[2px] w-full bg-base-border/50">
      <motion.div
        className="h-full bg-accent"
        animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      />
    </div>
  );
}

function SlideDots() {
  const { currentSlide, totalSlides, goToSlide, slideNames } = usePresentation();

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSlides }, (_, i) => (
        <button
          key={i}
          onClick={() => goToSlide(i)}
          title={slideNames[i]}
          className="group relative"
        >
          <motion.div
            className={`rounded-full transition-colors ${
              i === currentSlide
                ? "bg-accent"
                : "bg-ivory/20 hover:bg-ivory/40"
            }`}
            animate={{
              width: i === currentSlide ? 20 : 6,
              height: 6,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-base-card border border-base-border text-[10px] text-ivory-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {slideNames[i]}
          </div>
        </button>
      ))}
    </div>
  );
}

function KeyboardHelp() {
  const [show, setShow] = useState(false);

  const shortcuts = [
    { keys: ["→", "↓", "Space"], action: "Next slide" },
    { keys: ["←", "↑"], action: "Previous slide" },
    { keys: ["Home"], action: "First slide" },
    { keys: ["End"], action: "Last slide" },
    { keys: ["F"], action: "Toggle fullscreen" },
    { keys: ["P"], action: "Presentation mode" },
    { keys: ["Esc"], action: "Exit presentation" },
  ];

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="p-2 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ivory/5 transition-colors"
        title="Keyboard shortcuts"
      >
        <Keyboard className="w-4 h-4" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-base/60 backdrop-blur-sm"
            onClick={() => setShow(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-surface rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-ivory">Keyboard Shortcuts</h3>
                <button onClick={() => setShow(false)} className="p-1 rounded hover:bg-ivory/5">
                  <X className="w-4 h-4 text-ivory-dim" />
                </button>
              </div>
              <div className="space-y-2.5">
                {shortcuts.map((s) => (
                  <div key={s.action} className="flex items-center justify-between">
                    <span className="text-small text-ivory-muted">{s.action}</span>
                    <div className="flex gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="inline-block px-2 py-0.5 text-[11px] font-mono text-ivory bg-base/80 rounded border border-base-border"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SlideControls() {
  const {
    currentSlide,
    totalSlides,
    isFullscreen,
    isPresentationMode,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    togglePresentationMode,
    slideNames,
  } = usePresentation();

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <SlideProgress />
      </div>

      {/* Bottom control bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 120, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-[100]"
      >
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <div className="card-surface rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
            {/* Prev */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ivory/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Slide counter + name */}
            <div className="flex-1 flex items-center justify-center gap-3 min-w-0">
              <span className="text-[12px] font-mono text-ivory-dim tabular-nums flex-shrink-0">
                {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </span>
              <span className="hidden sm:block text-[12px] text-ivory/50">|</span>
              <span className="hidden sm:block text-[12px] text-ivory-muted truncate">
                {slideNames[currentSlide]}
              </span>
            </div>

            {/* Dots (hidden on small screens) */}
            <div className="hidden md:flex items-center">
              <SlideDots />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right controls */}
            <div className="flex items-center gap-1">
              <KeyboardHelp />

              {/* Presentation mode */}
              <button
                onClick={togglePresentationMode}
                className={`p-2 rounded-lg transition-colors ${
                  isPresentationMode
                    ? "text-accent bg-accent/10"
                    : "text-ivory-dim hover:text-ivory hover:bg-ivory/5"
                }`}
                title={isPresentationMode ? "Exit presentation mode" : "Start presentation mode (P)"}
              >
                {isPresentationMode ? (
                  <Monitor className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Play className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ivory/5 transition-colors"
                title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Maximize className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Next */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-2 rounded-lg text-ivory-dim hover:text-ivory hover:bg-ivory/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
