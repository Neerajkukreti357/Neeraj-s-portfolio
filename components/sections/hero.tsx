"use client";

import { useRef } from "react";
import { skills } from "@/theme/appConstants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // every element with this class exits, in DOM order, one after another
      const exitEls = gsap.utils.toArray<HTMLElement>(".exit-left");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(exitEls, {
        x: "-120%",
        opacity: 0,
        ease: "none",
        stagger: 0.15, // delay between each element's exit
      }, 0);

      tl.to(panelRef.current, { x: "60%", opacity: 0, ease: "none" }, 0);
      tl.to(marqueeRef.current, { opacity:0, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      <div className="flex-1 px-6 pt-16 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <div className="mx-auto grid max-w-300 items-center  lg:grid-cols-[1.05fr_0.85fr]">
          <div>
            <div className="exit-left hero-reveal flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-3xs uppercase tracking-[0.2em] text-deep/50">
                <span className="size-1.5 rounded-full bg-cyan" />
                Web & Mobile Developer
              </div>
              <span className="rounded-full border border-sky/30 bg-sky/10 px-3 py-1 font-mono text-3xs uppercase tracking-[0.15em] text-deep/70">
                ● Available — Immediate Joiner
              </span>
            </div>

            <h1 className="exit-left hero-reveal mt-6 max-w-[11ch] text-balance font-semibold leading-none tracking-[-0.045em] text-[clamp(2.6rem,9.5vw,7rem)]">
              Nee<span className="text-sky">raj</span>
            </h1>

            <p className="exit-left hero-reveal mt-5 max-w-[46ch] text-pretty text-lg text-deep/60 sm:text-xl">
              Frontend engineer building interfaces that feel alive. I craft
              responsive web apps with React & Next.js, and cross-platform
              mobile experiences with React Native — with real-time chat,
              audio/video calling, and payments woven in.
            </p>

            <div className="exit-left hero-reveal mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-deep px-5 py-2.5 text-sm font-medium text-frost ring-1 ring-white/20 transition-colors hover:bg-abyss"
              >
                View the reel
              </a>
              <a
                href="#about"
                className="rounded-full bg-ice/60 px-5 py-2.5 text-sm font-medium text-deep/70 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-ice/80"
              >
                Read the brief
              </a>
            </div>
          </div>

          <div ref={panelRef} className="hero-panel relative hidden lg:block">
            <div className="rotate-6 rounded-2xl bg-ice p-6 text-deep shadow-[0_24px_60px_-20px_oklch(0.65_0.19_260/0.35)] ring-1 ring-white/10">
              <div className="flex items-center justify-between font-mono text-2xs uppercase tracking-[0.2em] text-deep/50">
                <span>ship.run()</span>
                <span className="fr-pulse size-1.5 rounded-full bg-cyan" />
              </div>
              <pre className="mt-4 overflow-x-auto font-mono text-xs leading-relaxed text-deep/85">
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
              <div className="mt-5 flex items-center justify-between font-mono text-2xs text-deep/50">
                <span>react · react native</span>
                <span>2+ years</span>
              </div>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                <div className="h-full w-[58%] rounded-full bg-linear-to-r from-sky to-cyan" />
              </div>
            </div>
            <div className="fr-float absolute -bottom-5 -left-6 rounded-xl bg-mist/80 px-4 py-3 font-mono text-2xs uppercase tracking-[0.15em] text-deep/70 shadow-lg ring-1 ring-white/10 backdrop-blur-md">
              websocket · connected
            </div>
            <div
              className="fr-float absolute -top-4 -right-4 rounded-xl bg-mist/80 px-4 py-3 font-mono text-2xs uppercase tracking-[0.15em] text-deep/70 shadow-lg ring-1 ring-white/10 backdrop-blur-md"
              style={{ animationDelay: "-4s" }}
            >
              build · production
            </div>
          </div>
        </div>
      </div>

      
    </section>
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
      </>
  );
};

export default Hero;