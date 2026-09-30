"use client";

import { useRef } from "react";
import { skills } from "@/theme/appConstants";
import { splitText } from "../ui/splitText";
import { useHeroScrollAnimation } from "@/hooks/useHeroScrollAnimation.ts";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useHeroScrollAnimation({
    section: sectionRef,
    panel: panelRef,
    marquee: marqueeRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100vh-4rem)] flex flex-col overflow-hidden"
    >
      <div className="flex-1 px-6 pt-16 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <div className="mx-auto grid max-w-300 items-center  lg:grid-cols-[1.05fr_0.85fr]">
          <div>
            <div className="hero-reveal flex flex-wrap items-center gap-4">
              <div className="exit-left flex items-center gap-2 font-mono text-3xs uppercase tracking-[0.2em] text-deep/50">
                <span className="size-1.5 rounded-full bg-cyan" />
                Web & Mobile Developer
              </div>
              <span className="exit-left rounded-full border border-sky/30 bg-sky/10 px-3 py-1 font-mono text-3xs uppercase tracking-[0.15em] text-deep/70">
                ● Available — Immediate Joiner
              </span>
            </div>

            <h1 className="mt-6 max-w-[11ch] text-balance font-semibold leading-none tracking-[-0.045em] text-[clamp(2.6rem,9.5vw,7rem)]">
              {splitText("Nee")}
              <span className="text-sky">{splitText("raj")}</span>
            </h1>

            <p className="mt-5 max-w-[46ch] text-pretty text-lg text-deep/60 sm:text-xl">
              {splitText(
                "Frontend engineer building interfaces that feel alive. I craft responsive web apps with React & Next.js, and cross-platform mobile experiences with React Native — with real-time chat, audio/video calling, and payments woven in.",
              )}
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="exit-left rounded-full bg-deep px-5 py-2.5 text-sm font-medium text-frost ring-1 ring-white/20 transition-colors hover:bg-abyss"
              >
                View the reel
              </a>
              <a
                href="#about"
                className="exit-left rounded-full bg-ice/60 px-5 py-2.5 text-sm font-medium text-deep/70 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-ice/80"
              >
                Read the brief
              </a>
            </div>
          </div>

          <div className="hero-panel relative hidden lg:block">
            <div
              ref={panelRef}
              className="rotate-6 rounded-2xl bg-ice p-6 text-deep shadow-[0_24px_60px_-20px_oklch(0.65_0.19_260/0.35)] ring-1 ring-white/10"
            >
              <div className="panel-exit-item flex items-center justify-between font-mono text-2xs uppercase tracking-[0.2em] text-deep/50">
                <span>ship.run()</span>
                <span className="fr-pulse size-1.5 rounded-full bg-cyan" />
              </div>
              <pre className="panel-exit-item mt-4 overflow-x-auto font-mono text-xs leading-relaxed text-deep/85">
                <code>
                  {`const stack = {\n`}
                  {`  web: "React, Next.js",\n`}
                  {`  mobile: "React Native",\n`}
                  {`  realtime: "WebSocket, Stream",\n`}
                  {`}\n\n`}
                  {`function ship(idea) {\n`}
                  {`  return interface.render(idea, stack)\n`}
                  {`}`}
                </code>
              </pre>
              <div className="panel-exit-item panel-exit-item mt-5 flex items-center justify-between font-mono text-2xs text-deep/50">
                <span>react · react native</span>
                <span>2+ years</span>
              </div>
              <div className="panel-exit-item mt-2 h-1 w-full rounded-full bg-white/10">
                <div className="h-full w-[58%] rounded-full bg-linear-to-r from-sky to-cyan" />
              </div>
            </div>
            <div className="panel-exit-item absolute -bottom-5 -left-6">
              <div
              className="fr-float rounded-xl bg-mist/80 px-4 py-3 font-mono text-2xs uppercase tracking-[0.15em] text-deep/70 shadow-lg ring-1 ring-white/10 backdrop-blur-md">
                websocket · connected
              </div>
            </div>
            <div className="panel-exit-item absolute -top-4 -right-4">
              <div
                className="fr-float rounded-xl bg-mist/80 px-4 py-3 font-mono text-2xs uppercase tracking-[0.15em] text-deep/70 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
              >
                build · production
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={marqueeRef}
        className="w-full overflow-hidden border-y border-white/10 bg-ice/40 py-3 backdrop-blur-md absolute bottom-0"
      >
        <div className="marquee-track fr-marquee flex w-max items-center gap-8 whitespace-nowrap text-2xl font-semibold tracking-tight text-deep/25 sm:text-3xl">
          <span className="fr-float">
            {skills.join("\u00A0·\u00A0")}&nbsp;·&nbsp;
          </span>
          <span className="fr-float" style={{ animationDelay: "-4s" }}>
            {skills.join("\u00A0·\u00A0")}&nbsp;·&nbsp;
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
