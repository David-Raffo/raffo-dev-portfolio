import { onBeforeUnmount, onMounted, type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useLoop(root: Ref<Element | null>, build: () => gsap.core.Timeline) {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const el = root.value;
    if (!el || prefersReducedMotion()) return;

    ctx = gsap.context(() => {
      const tl = build();
      tl.pause();
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
      if (st.isActive) tl.play();
    }, el);
  });

  onBeforeUnmount(() => {
    ctx?.revert();
    ctx = null;
  });
}

export function useReveal(root: Ref<Element | null>, selector: string, vars: gsap.TweenVars = {}) {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const el = root.value;
    if (!el || prefersReducedMotion()) return;

    ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          ...vars,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        },
      );
    }, el);
  });

  onBeforeUnmount(() => {
    ctx?.revert();
    ctx = null;
  });
}

export function moveAlong(
  dot: SVGGraphicsElement,
  path: SVGPathElement,
  vars: { duration?: number; reverse?: boolean; ease?: string } = {},
) {
  const length = path.getTotalLength();
  const state = { t: 0 };
  const place = () => {
    const p = path.getPointAtLength((vars.reverse ? 1 - state.t : state.t) * length);
    dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
  };
  return gsap.to(state, {
    t: 1,
    duration: vars.duration ?? 0.6,
    ease: vars.ease ?? "power1.inOut",
    onStart: place,
    onUpdate: place,
  });
}
