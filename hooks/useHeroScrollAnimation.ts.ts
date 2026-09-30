import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Refs = {
  section: RefObject<HTMLElement | null>;
  panel: RefObject<HTMLElement | null>;
  marquee: RefObject<HTMLElement | null>;
};

const getHeaderHeight = () =>
  document.querySelector("header")?.getBoundingClientRect().height ?? 64;

export function useHeroScrollAnimation({ section, panel, marquee }: Refs) {
  useIsomorphicLayoutEffect(() => {
    if (!section.current) return;

    const ctx = gsap.context(() => {
      const exitEls = gsap.utils.toArray<HTMLElement>(".exit-left");
      const chars = gsap.utils.toArray<HTMLElement>(".char");
      const panelItems = gsap.utils.toArray<HTMLElement>(".panel-exit-item");

      // ---------- 1) SCROLL animation (तुम्हारी पुरानी, फंक्शन में डाली) ----------
      const createScrollAnimation = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: () => `top ${getHeaderHeight()}px`,
            end: "+=70%",
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            snap: {
              snapTo: [0, 1],
              duration: { min: 0.4, max: 0.8 },
              delay: 0.05,
              ease: "power2.out",
            },
          },
        });

        tl.to(exitEls, { x: "-150vw", opacity: 0, ease: "power2.in", stagger: 0.08, duration: 0.7 }, 0);
        tl.to(chars, { x: "-150vw", opacity: 0, ease: "power2.in", stagger: 0.01, duration: 0.9 }, 0.05);
        tl.to(panelItems, { x: "100vw", opacity: 0, ease: "power2.in", stagger: 0.15, duration: 0.8 }, 0.1);
        tl.to(panel.current, { rotate: 0, scale: 1, ease: "power2.out", duration: 0.5 }, 0);
        tl.to(panel.current, { scale: 2, opacity: 0, ease: "power2.in", duration: 0.8 }, 0.5);
        tl.to(marquee.current, { opacity: 0, ease: "power2.out", duration: 0.5 }, 0.2);
      };

      // ---------- 2) INTRO animation (page load पर) ----------
      const intro = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          // intro खत्म होने के बाद ही scroll animation बनाओ
          ctx.add(() => {
            createScrollAnimation();
            ScrollTrigger.refresh();
          });
        },
      });

      // exit का उल्टा: बाहर से अंदर आओ
      intro.from(exitEls, { x: "-150vw", opacity: 0, stagger: 0.08, duration: 0.7 }, 0);
      intro.from(chars, { x: "-150vw", opacity: 0, stagger: 0.006, duration: 0.9 }, 0.05);
      intro.from(panelItems, { x: "100vw", opacity: 0, stagger: 0.15, duration: 0.8 }, 0.1);
      intro.from(panel.current, { scale: 0.6, opacity: 0, duration: 0.8 }, 0.3);
      intro.from(marquee.current, { opacity: 0, duration: 0.6 }, 0.6);
    }, section);

    return () => ctx.revert();
  }, [section, panel, marquee]);
}