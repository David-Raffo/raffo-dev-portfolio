<script setup lang="ts">
import { computed, ref } from "vue";
import gsap from "gsap";
import { locale } from "../../../../i18n/store";
import { moveAlong, useLoop } from "../../composables/useLoop";

const copy = computed(() =>
  locale.value === "es"
    ? {
        app: "Tu app",
        profile: "perfil: balanceado",
        filter: "cuota ✓ · contexto ✓ · capacidades ✓",
        more: "+18 proveedores más",
        ok: "200 OK",
        failover: "1 reintento invisible",
        direct: "directo",
        penalty: "penalización ×2",
      }
    : {
        app: "Your app",
        profile: "profile: balanced",
        filter: "quota ✓ · context ✓ · capabilities ✓",
        more: "+18 more providers",
        ok: "200 OK",
        failover: "1 silent failover",
        direct: "direct hit",
        penalty: "penalty ×2",
      },
);

const providers = ["Groq", "NVIDIA NIM", "Gemini", "Cloudflare", "Mistral", "OpenRouter"];
const rows = [
  { label: "groq · llama-4", provider: 0 },
  { label: "nim · qwen3", provider: 1 },
  { label: "gemini · flash", provider: 2 },
];

const providerY = (index: number) => 30 + index * 62;
const providerPath = (index: number) => {
  const y = providerY(index) + 23;
  return `M620 230 C 690 230, 690 ${y}, 750 ${y}`;
};

const rootRef = ref<SVGSVGElement | null>(null);

useLoop(rootRef, () => {
  const root = rootRef.value!;
  const q = <T extends Element>(selector: string) => root.querySelector(selector) as T;
  const entry = q<SVGPathElement>(".fr-entry");
  const req = q<SVGGElement>(".fr-packet-req");
  const err = q<SVGGElement>(".fr-packet-err");
  const res = q<SVGGElement>(".fr-packet-res");
  const paths = providers.map((_, index) => q<SVGPathElement>(`.fr-path-${index}`));
  const css = getComputedStyle(root);
  const accent = css.getPropertyValue("--color-accent-400").trim();
  const muted = css.getPropertyValue("--color-text-300").trim();
  const border = css.getPropertyValue("--color-grayscale-500").trim();

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "power2.out" } });

  const score = (values: number[], best: number) => {
    values.forEach((value, index) => {
      tl.to(`.fr-bar-${index}`, { attr: { width: 240 * value }, duration: 0.5 }, "<");
    });
    tl.to(".fr-row-label", { fill: muted, duration: 0.2 }, "<");
    tl.to(`.fr-row-label-${best}`, { fill: accent, duration: 0.2 }, "<");
  };

  const cycle = (values: number[], best: number, fail: number | null, ok: number, quota: number) => {
    tl.set([req, err, res], { autoAlpha: 0 });
    tl.set(".fr-status", { autoAlpha: 0, y: 8 });
    tl.set(req, { autoAlpha: 1 });
    tl.add(moveAlong(req, entry, { duration: 0.55 }));
    tl.fromTo(".fr-router", { stroke: accent }, { stroke: border, duration: 0.8 });
    tl.addLabel("score", "<");
    score(values, best);

    if (fail !== null) {
      tl.add(moveAlong(req, paths[fail]!, { duration: 0.55 }));
      tl.to(`.fr-trace-${fail}`, { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" }, "<");
      tl.set(req, { autoAlpha: 0 });
      tl.to(`.fr-node-${fail}`, { stroke: "#ef4444", duration: 0.15 });
      tl.to(`.fr-dot-${fail}`, { fill: "#ef4444", duration: 0.15 }, "<");
      tl.fromTo(
        ".fr-badge-429",
        { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" },
        "<",
      );
      tl.set(err, { autoAlpha: 1 });
      tl.add(moveAlong(err, paths[fail]!, { duration: 0.45, reverse: true }));
      tl.to(`.fr-trace-${fail}`, { strokeDashoffset: 400, duration: 0.3 }, "<");
      tl.set(err, { autoAlpha: 0 });
      tl.fromTo(".fr-penalty", { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.3 });
      tl.to(`.fr-bar-${fail}`, { attr: { width: 240 * 0.28 }, duration: 0.4 }, "<");
      tl.to(".fr-row-label", { fill: muted, duration: 0.2 }, "<");
      tl.to(`.fr-row-label-${ok}`, { fill: accent, duration: 0.2 }, "<");
      tl.to(".fr-badge-429", { autoAlpha: 0, duration: 0.3 }, "+=0.2");
      tl.set(req, { autoAlpha: 1 });
    } else {
      tl.set(req, { autoAlpha: 1 }, "+=0.1");
    }

    tl.add(moveAlong(req, paths[ok]!, { duration: 0.55 }));
    tl.to(`.fr-trace-${ok}`, { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" }, "<");
    tl.set(req, { autoAlpha: 0 });
    tl.to(`.fr-node-${ok}`, { stroke: "#22c55e", duration: 0.15 });
    tl.to(`.fr-dot-${ok}`, { fill: "#22c55e", duration: 0.15 }, "<");
    tl.to(`.fr-quota-${ok}`, { attr: { width: 64 * quota }, duration: 0.4 }, "<");
    tl.set(res, { autoAlpha: 1 });
    tl.add(moveAlong(res, paths[ok]!, { duration: 0.5, reverse: true }));
    tl.add(moveAlong(res, entry, { duration: 0.4, reverse: true }));
    tl.set(res, { autoAlpha: 0 });
    tl.to(`.fr-trace-${ok}`, { strokeDashoffset: 400, duration: 0.4 }, "<");
    tl.to(".fr-app", { stroke: "#22c55e", duration: 0.15 }, "<");
    tl.to(fail !== null ? ".fr-status-failover" : ".fr-status-direct", { autoAlpha: 1, y: 0, duration: 0.35 }, "<");
    tl.to(".fr-app", { stroke: border, duration: 0.6 }, "+=1.1");
    tl.to(".fr-node", { stroke: border, duration: 0.4 }, "<");
    tl.to(".fr-dot", { fill: muted, duration: 0.4 }, "<");
    tl.to(".fr-status", { autoAlpha: 0, duration: 0.3 }, "<");
  };

  cycle([0.92, 0.78, 0.7], 0, 0, 1, 0.62);
  cycle([0.28, 0.72, 0.81], 2, null, 2, 0.7);
  tl.to(".fr-penalty", { autoAlpha: 0, duration: 0.3 });
  cycle([0.9, 0.74, 0.77], 0, null, 0, 0.52);

  return tl;
});
</script>

<template>
  <div class="fr-scroll">
    <svg ref="rootRef" class="fr" viewBox="0 0 1000 460" role="img" aria-label="FreeRouter routing flow">
      <defs>
        <pattern id="fr-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" class="fr-grid-dot" />
        </pattern>
        <filter id="fr-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect width="1000" height="460" fill="url(#fr-dots)" />

      <path class="fr-line fr-entry" d="M230 230 L340 230" />
      <template v-for="(name, index) in providers" :key="`path-${name}`">
        <path :class="['fr-line', `fr-path-${index}`]" :d="providerPath(index)" />
        <path :class="['fr-trace', `fr-trace-${index}`]" :d="providerPath(index)" />
      </template>

      <g>
        <rect class="fr-card fr-app" x="30" y="175" width="200" height="110" rx="14" />
        <text class="fr-title" x="50" y="208">{{ copy.app }}</text>
        <text class="fr-mono fr-accent" x="50" y="236">model: "auto"</text>
        <text class="fr-mono fr-muted" x="50" y="260">{{ copy.profile }}</text>
        <g class="fr-status fr-status-failover" opacity="0">
          <rect x="30" y="300" width="200" height="54" rx="12" class="fr-chip-ok" />
          <text class="fr-chip-title" x="48" y="323">✓ {{ copy.ok }}</text>
          <text class="fr-chip-text" x="48" y="342">{{ copy.failover }}</text>
        </g>
        <g class="fr-status fr-status-direct" opacity="0">
          <rect x="30" y="300" width="200" height="54" rx="12" class="fr-chip-ok" />
          <text class="fr-chip-title" x="48" y="323">✓ {{ copy.ok }}</text>
          <text class="fr-chip-text" x="48" y="342">{{ copy.direct }}</text>
        </g>
      </g>

      <g>
        <rect class="fr-card fr-router" x="340" y="110" width="280" height="240" rx="18" />
        <text class="fr-title fr-title-lg" x="362" y="146">FreeRouter</text>
        <text class="fr-mono fr-muted" x="362" y="168">score = q·w₁ + s·w₂</text>
        <g v-for="(row, index) in rows" :key="row.label">
          <text :class="['fr-mono', 'fr-row-label', `fr-row-label-${index}`]" x="362" :y="198 + index * 44">
            {{ row.label }}
          </text>
          <rect class="fr-track" x="362" :y="206 + index * 44" width="240" height="8" rx="4" />
          <rect
            :class="['fr-bar', `fr-bar-${index}`]"
            x="362"
            :y="206 + index * 44"
            :width="240 * [0.92, 0.78, 0.7][index]!"
            height="8"
            rx="4"
          />
        </g>
        <g class="fr-penalty" opacity="0">
          <rect x="484" y="184" width="118" height="20" rx="10" class="fr-penalty-bg" />
          <text x="543" y="198" class="fr-penalty-text" text-anchor="middle">{{ copy.penalty }}</text>
        </g>
        <text class="fr-mono fr-muted fr-small" x="362" y="334">{{ copy.filter }}</text>
      </g>

      <g v-for="(name, index) in providers" :key="name">
        <rect
          :class="['fr-card', 'fr-node', `fr-node-${index}`]"
          x="750"
          :y="providerY(index)"
          width="220"
          height="46"
          rx="12"
        />
        <text class="fr-provider" x="768" :y="providerY(index) + 28">{{ name }}</text>
        <rect class="fr-track" x="870" :y="providerY(index) + 20" width="64" height="6" rx="3" />
        <rect
          :class="['fr-quota', `fr-quota-${index}`]"
          x="870"
          :y="providerY(index) + 20"
          :width="64 * [0.7, 0.8, 0.85, 0.9, 0.6, 0.4][index]!"
          height="6"
          rx="3"
        />
        <circle :class="['fr-dot', `fr-dot-${index}`]" cx="952" :cy="providerY(index) + 23" r="5" />
      </g>
      <text class="fr-muted fr-more" x="860" y="420" text-anchor="middle">{{ copy.more }}</text>

      <g class="fr-badge-429" opacity="0">
        <rect x="690" y="8" width="58" height="26" rx="13" fill="#ef4444" />
        <text x="719" y="26" text-anchor="middle" class="fr-badge-text">429</text>
      </g>

      <g class="fr-packet-req" opacity="0">
        <circle r="13" class="fr-packet-glow" filter="url(#fr-glow)" />
        <circle r="6" class="fr-packet-core" />
      </g>
      <g class="fr-packet-err" opacity="0">
        <circle r="13" fill="#ef4444" opacity="0.5" filter="url(#fr-glow)" />
        <circle r="6" fill="#ef4444" />
      </g>
      <g class="fr-packet-res" opacity="0">
        <circle r="13" fill="#22c55e" opacity="0.5" filter="url(#fr-glow)" />
        <circle r="6" fill="#22c55e" />
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.fr-scroll {
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.fr {
  display: block;
  width: 100%;
  min-width: 720px;
  height: auto;
  font-family: "Urbanist", sans-serif;

  &-grid-dot {
    fill: var(--color-grayscale-400);
  }

  &-line {
    fill: none;
    stroke: var(--color-grayscale-500);
    stroke-width: 2;
    stroke-dasharray: 4 7;
    animation: fr-flow 1.2s linear infinite;
  }

  &-trace {
    fill: none;
    stroke: var(--color-accent-400);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
  }

  &-card {
    fill: var(--color-background-400);
    stroke: var(--color-grayscale-500);
    stroke-width: 2;
  }

  &-router {
    stroke-width: 2.5;
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    fill: var(--color-text-400);

    &-lg {
      font-size: 22px;
      font-weight: 900;
    }
  }

  &-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 13px;
  }

  &-small {
    font-size: 11.5px;
  }

  &-accent {
    fill: var(--color-accent-400);
  }

  &-muted,
  &-row-label {
    fill: var(--color-text-300);
  }

  &-more {
    font-size: 14px;
    font-weight: 600;
  }

  &-track {
    fill: var(--color-grayscale-400);
  }

  &-bar {
    fill: var(--color-accent-400);
  }

  &-quota {
    fill: var(--color-text-300);
  }

  &-dot {
    fill: var(--color-text-300);
  }

  &-provider {
    font-size: 15px;
    font-weight: 700;
    fill: var(--color-text-400);
  }

  &-penalty-bg {
    fill: color-mix(in srgb, #ef4444 20%, transparent);
    stroke: #ef4444;
    stroke-width: 1;
  }

  &-penalty-text {
    font-size: 11px;
    font-weight: 700;
    fill: #ef4444;
  }

  &-badge-text {
    font-size: 14px;
    font-weight: 900;
    fill: white;
  }

  &-chip-ok {
    fill: color-mix(in srgb, #22c55e 14%, transparent);
    stroke: #22c55e;
    stroke-width: 1.5;
  }

  &-chip-title {
    font-size: 15px;
    font-weight: 800;
    fill: #22c55e;
  }

  &-chip-text {
    font-size: 12.5px;
    fill: var(--color-text-300);
  }

  &-packet-glow {
    fill: var(--color-accent-400);
    opacity: 0.6;
  }

  &-packet-core {
    fill: var(--color-accent-400);
  }
}

@keyframes fr-flow {
  to {
    stroke-dashoffset: -22;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fr-line {
    animation: none;
  }
}
</style>
