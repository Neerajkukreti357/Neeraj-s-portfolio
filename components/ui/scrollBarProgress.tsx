"use client";

import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger);


const ScrollBarProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
  gsap.set(barRef.current, { scaleX: 0 });

  const tween = gsap.to(barRef.current, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3, // smooth catch-up, higher number = ज़्यादा lag/smoothness
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}, []);

  return (
    <div className="h-0.75 w-full bg-white/5">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-sky via-cyan to-violet"
      ></div>
    </div>
  );
};

export default ScrollBarProgress;
