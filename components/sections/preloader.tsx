"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface PreloaderProps {
  name?: string;
}

export default function Preloader({ name = "PORTFOLIO" }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [hidden, setHidden] = useState(false);
  const mix = (cssVar: string, percent: number) =>
    `color-mix(in oklab, var(${cssVar}) ${percent}%, transparent)`;

  useIsomorphicLayoutEffect(() => {
    if (hidden) return;

    try {
      if (sessionStorage.getItem("preloader-seen")) {
        setHidden(true);
        return;
      }
    } catch {
      /* storage blocked */
    }

    const root = rootRef.current!;
    const counter = { val: 0 };
    let loadComplete = false;
    let rafId = 0;
    let resourceCount = 0;
    const startTime = performance.now();
    const circumference = 2 * Math.PI * 90;

    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        resourceCount += list.getEntries().length;
      });
      observer.observe({ type: "resource", buffered: true });
    } catch {
      /* not supported */
    }

    const updateVisuals = () => {
      const val = Math.floor(counter.val);
      if (counterRef.current)
        counterRef.current.textContent = String(val).padStart(3, "0");
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${counter.val / 100})`;
      if (ringRef.current)
        ringRef.current.style.strokeDashoffset = String(
          circumference - (counter.val / 100) * circumference,
        );
      if (glowRef.current)
        glowRef.current.style.opacity = String(
          Math.min(counter.val / 100, 1) * 0.8,
        );
    };

    // rAF loop — tracks real resource loading, no setTimeout
    const tick = () => {
      if (loadComplete) return;
      const resourceProgress = (1 - Math.exp(-resourceCount / 8)) * 70;
      const elapsed = performance.now() - startTime;
      const timeProgress = Math.min(elapsed / 4000, 1) * 20;
      counter.val = Math.min(resourceProgress + timeProgress, 90);
      updateVisuals();
      rafId = requestAnimationFrame(tick);
    };

    // Set initial states before paint to prevent flash
    gsap.set(".pl-corner", { scale: 0, opacity: 0 });
    gsap.set(".pl-ring-wrap", { scale: 0.85, opacity: 0 });
    gsap.set(".pl-char", { yPercent: 120 });
    gsap.set(".pl-label", { opacity: 0, y: 10 });

    // Continuous rotating rings
    const rot1 = gsap.to(".pl-rotator", {
      rotation: 360,
      svgOrigin: "100 100",
      duration: 12,
      repeat: -1,
      ease: "none",
    });
    const rot2 = gsap.to(".pl-rotator-rev", {
      rotation: -360,
      svgOrigin: "100 100",
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Entry timeline
    const entryTl = gsap.timeline();
    entryTl.fromTo(
      root,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    entryTl.to(
      ".pl-corner",
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      0.1,
    );
    entryTl.to(
      ".pl-ring-wrap",
      { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
      0.15,
    );
    entryTl.to(
      ".pl-char",
      { yPercent: 0, stagger: 0.04, duration: 0.6, ease: "power4.out" },
      0.3,
    );
    entryTl.to(
      ".pl-label",
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      0.45,
    );

    rafId = requestAnimationFrame(tick);

    // Exit animation
    const startExit = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          try {
            sessionStorage.setItem("preloader-seen", "1");
          } catch {}
          setHidden(true);
        },
      });
      exitTl.to(
        ".pl-char",
        { yPercent: -120, stagger: 0.02, duration: 0.4, ease: "power3.in" },
        0,
      );
      exitTl.to(
        ".pl-label",
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        0,
      );
      exitTl.to(
        ".pl-ring-wrap",
        { scale: 1.15, opacity: 0, duration: 0.5, ease: "power3.in" },
        0.1,
      );
      exitTl.to(root, { opacity: 0, duration: 1, ease: "power4.inOut" }, 0.35);
      exitTl.to(
        barRef.current,
        {
          scaleX: 0,
          duration: 0.3,
          ease: "power3.in",
          transformOrigin: "right center",
        },
        0.3,
      );
    };

    const finishProgress = () => {
      gsap.to(counter, {
        val: 100,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: updateVisuals,
        onComplete: startExit,
      });
    };

    const completeLoading = () => {
      if (loadComplete) return;
      loadComplete = true;
      cancelAnimationFrame(rafId);
      if (entryTl.isActive()) {
        entryTl.eventCallback("onComplete", finishProgress);
      } else {
        finishProgress();
      }
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(() => requestAnimationFrame(completeLoading));
    } else {
      window.addEventListener("load", completeLoading, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", completeLoading);
      document.documentElement.style.overflow = "";
      observer?.disconnect();
      entryTl.kill();
      rot1.kill();
      rot2.kill();
    };
  }, [hidden]);

  if (hidden) return null;

  const chars = name.split("");
  const circumference = 2 * Math.PI * 90;

  return (
    <div
      ref={rootRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-background text-foreground will-change-transform"
    >
      {/* Colored blobs (what the glass blurs) */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-sky/40 blur-3xl fr-float" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-violet/40 blur-3xl fr-float" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan/30 blur-3xl fr-float" />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-7 px-6">
        {/* Progress ring + counter */}
        <div className="pl-ring-wrap relative flex items-center justify-center will-change-transform">
          <svg
            viewBox="0 0 200 200"
            className="h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52"
          >
            <defs>
              <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "var(--sky)" }} />
                <stop offset="50%" style={{ stopColor: "var(--icecyan)" }} />
                <stop offset="100%" style={{ stopColor: "var(--violet)" }} />
              </linearGradient>
            </defs>

            {/* Outer rotating ring */}
            <circle
              className="pl-rotator"
              cx="100"
              cy="100"
              r="96"
              fill="none"
              strokeWidth="0.75"
              strokeDasharray="2 6"
              style={{ stroke: mix("--sky", 35) }}
            />
            {/* Inner counter-rotating ring */}
            <circle
              className="pl-rotator-rev"
              cx="100"
              cy="100"
              r="83"
              fill="none"
              strokeWidth="0.75"
              strokeDasharray="1 4"
              style={{ stroke: mix("--foreground", 15) }}
            />
            {/* Progress track */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              strokeWidth="2"
              style={{ stroke: mix("--foreground", 10) }}
            />
            {/* Progress arc */}
            <circle
              ref={ringRef}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#pl-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              transform="rotate(-90 100 100)"
              style={{ filter: `drop-shadow(0 0 4px ${mix("--sky", 50)})` }}
            />
          </svg>

          {/* Counter centered in ring */}
          <div className="absolute flex items-baseline gap-1">
            <span
              ref={counterRef}
              className="font-mono text-3xl font-light tabular-nums tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              00
            </span>
            <span className="font-mono text-sm text-sky sm:text-lg md:text-xl">
              %
            </span>
          </div>
        </div>

        {/* Name — letter reveal */}
        <div className="flex overflow-hidden">
          {chars.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="pl-char inline-block text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs md:text-sm">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </div>

        {/* Loading label */}
        <div className="pl-label flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-sky/70 sm:text-[10px]">
          <span className="h-1 w-1 animate-pulse rounded-full bg-sky" />
          <span>Loading Experience</span>
        </div>
      </div>

      {/* Linear progress bar */}
      <div className="absolute top-0 left-0 h-0.5 w-full bg-foreground/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-linear-to-r from-sky via-cyan to-violet"
          style={{
            transform: "scaleX(0)",
            boxShadow: `0 0 8px ${mix("--sky", 40)}`,
          }}
        />
      </div>
    </div>
  );
}
