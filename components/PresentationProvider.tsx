"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface PresentationContextType {
  currentSlide: number;
  totalSlides: number;
  isFullscreen: boolean;
  isPresentationMode: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  toggleFullscreen: () => void;
  togglePresentationMode: () => void;
  slideNames: string[];
}

const PresentationContext = createContext<PresentationContextType | null>(null);

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
  return ctx;
}

const SLIDE_NAMES = [
  "Title",
  "Problem",
  "Solution",
  "Architecture",
  "Flow",
  "ML Pipeline",
  "Scoring",
  "Security",
  "Token",
  "Performance",
  "Use Cases",
  "Stats",
  "Closing",
];

export default function PresentationProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const totalSlides = SLIDE_NAMES.length;

  // ---- Fullscreen ----
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // silently fail if fullscreen not supported
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ---- Slide navigation ----
  const goToSlide = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      setCurrentSlide(clamped);

      if (isPresentationMode) {
        const slides = containerRef.current?.querySelectorAll("[data-slide]");
        if (slides?.[clamped]) {
          isScrolling.current = true;
          slides[clamped].scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        }
      } else {
        const slides = document.querySelectorAll("[data-slide]");
        if (slides?.[clamped]) {
          isScrolling.current = true;
          slides[clamped].scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        }
      }
    },
    [isPresentationMode, totalSlides]
  );

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // ---- Presentation mode toggle ----
  const togglePresentationMode = useCallback(() => {
    setIsPresentationMode((prev) => {
      const next = !prev;
      if (next && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      }
      return next;
    });
  }, []);

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case "f":
        case "F":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        case "p":
        case "P":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            togglePresentationMode();
          }
          break;
        case "Escape":
          if (isPresentationMode) {
            setIsPresentationMode(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nextSlide, prevSlide, goToSlide, toggleFullscreen, togglePresentationMode, isPresentationMode, totalSlides]);

  // ---- Intersection Observer to track current slide ----
  useEffect(() => {
    const slides = document.querySelectorAll("[data-slide]");
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.slide);
            if (!isNaN(idx)) setCurrentSlide(idx);
          }
        });
      },
      { threshold: 0.45 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [isPresentationMode]);

  return (
    <PresentationContext.Provider
      value={{
        currentSlide,
        totalSlides,
        isFullscreen,
        isPresentationMode,
        goToSlide,
        nextSlide,
        prevSlide,
        toggleFullscreen,
        togglePresentationMode,
        slideNames: SLIDE_NAMES,
      }}
    >
      <div
        ref={containerRef}
        className={isPresentationMode ? "presentation-mode" : ""}
      >
        {children}
      </div>
    </PresentationContext.Provider>
  );
}
