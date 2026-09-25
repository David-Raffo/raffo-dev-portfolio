<script setup lang="ts">
import { computed, ref } from "vue";
import gsap from "gsap";
import { locale } from "../../../../i18n/store";
import { moveAlong, useLoop } from "../../composables/useLoop";

const copy = computed(() =>
  locale.value === "es"
    ? {
        inputs: ["Catálogo", "Voz de marca", "Calendario"],
        agents: ["Blog SEO", "Redes sociales", "Imágenes", "Vídeos", "Campañas Ads"],
        core: ["AI Shop", "Helper"],
        coreSub: "n8n · LangGraph",
        columns: ["Entrada", "Agentes", "Publica en"],
      }
    : {
        inputs: ["Catalog", "Brand voice", "Schedule"],
        agents: ["SEO blog", "Social media", "Images", "Videos", "Ad campaigns"],
        core: ["AI Shop", "Helper"],
        coreSub: "n8n · LangGraph",
        columns: ["Input", "Agents", "Publishes to"],
      },
);

const platforms = [
  { name: "WordPress", color: "#21759b" },
  { name: "WooCommerce", color: "#7f54b3" },
  { name: "Shopify", color: "#5e8e3e" },
];

const inputY = [150, 230, 310];
const agentY = [70, 150, 230, 310, 390];
const platformY = [150, 230, 310];
const CX = 400;
const CY = 230;

const inPath = (i: number) => `M210 ${inputY[i]} C 270 ${inputY[i]}, 260 ${CY}, ${CX - 80} ${CY}`;
const outPath = (j: number) => `M${CX + 80} ${CY} C 520 ${CY}, 510 ${agentY[j]}, 580 ${agentY[j]}`;
const pubPath = (j: number) => {
  const k = j % 3;
  return `M770 ${agentY[j]} C 800 ${agentY[j]}, 800 ${platformY[k]}, 830 ${platformY[k]}`;
};

const rootRef = ref<SVGSVGElement | null>(null);

useLoop(rootRef, () => {
  const root = rootRef.value!;
  const accent = getComputedStyle(root).getPropertyValue("--color-accent-400").trim();
  const border = getComputedStyle(root).getPropertyValue("--color-grayscale-500").trim();
  const tl = gsap.timeline({ repeat: -1 });

  agentY.forEach((_, j) => {
    const packet = root.querySelector(`.ah-packet-${j}`) as SVGGElement;
    const input = root.querySelector(`.ah-in-${j % 3}`) as SVGPathElement;
    const out = root.querySelector(`.ah-out-${j}`) as SVGPathElement;
    const pub = root.querySelector(`.ah-pub-${j}`) as SVGPathElement;
    const at = j * 0.95;

    tl.set(packet, { autoAlpha: 1 }, at);
    tl.add(moveAlong(packet, input, { duration: 0.55 }), at);
    tl.fromTo(
      `.ah-ring-${j}`,
      { attr: { r: 80 }, autoAlpha: 0.6 },
      { attr: { r: 128 }, autoAlpha: 0, duration: 0.9, ease: "power2.out" },
      at + 0.5,
    );
    tl.add(moveAlong(packet, out, { duration: 0.55 }), at + 0.6);
    tl.to(`.ah-agent-${j}`, { stroke: accent, duration: 0.15 }, at + 1.1);
    tl.fromTo(
      `.ah-check-${j}`,
      { autoAlpha: 0, scale: 0.3, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(3)" },
      at + 1.1,
    );
    tl.add(moveAlong(packet, pub, { duration: 0.45 }), at + 1.25);
    tl.fromTo(
      `.ah-platform-${j % 3}`,
      { scale: 1 },
      { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, transformOrigin: "50% 50%" },
      at + 1.7,
    );
    tl.set(packet, { autoAlpha: 0 }, at + 1.72);
    tl.to(`.ah-agent-${j}`, { stroke: border, duration: 0.5 }, at + 2.2);
    tl.to(`.ah-check-${j}`, { autoAlpha: 0, duration: 0.4 }, at + 3.2);
  });

  tl.to({}, { duration: 0.6 });

  return tl;
});
</script>

<template>
  <div class="ah-scroll">
    <svg ref="rootRef" class="ah" viewBox="0 0 1000 460" role="img" aria-label="AI Shop Helper agents">
      <defs>
        <pattern id="ah-dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" class="ah-grid-dot" />
        </pattern>
        <radialGradient id="ah-core" cx="35%" cy="30%">
          <stop offset="0" class="ah-core-a" />
          <stop offset="1" class="ah-core-b" />
        </radialGradient>
        <filter id="ah-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect width="1000" height="460" fill="url(#ah-dots)" />

      <text v-for="(label, i) in copy.columns" :key="label" :x="[40, 580, 830][i]" y="30" class="ah-column">
        {{ label }}
      </text>

      <path v-for="(_, i) in inputY" :key="`in-${i}`" :class="['ah-line', `ah-in-${i}`]" :d="inPath(i)" />
      <path v-for="(_, j) in agentY" :key="`out-${j}`" :class="['ah-line', `ah-out-${j}`]" :d="outPath(j)" />
      <path v-for="(_, j) in agentY" :key="`pub-${j}`" :class="['ah-line', `ah-pub-${j}`]" :d="pubPath(j)" />

      <g v-for="(label, i) in copy.inputs" :key="label">
        <rect x="40" :y="inputY[i]! - 24" width="170" height="48" rx="12" class="ah-node" />
        <circle cx="64" :cy="inputY[i]" r="5" class="ah-input-dot" />
        <text x="80" :y="inputY[i]! + 5" class="ah-label">{{ label }}</text>
      </g>

      <g class="ah-orbit ah-orbit-a">
        <circle :cx="CX" :cy="CY" r="104" class="ah-orbit-ring" />
        <circle :cx="CX + 104" :cy="CY" r="5" class="ah-orbit-dot" />
      </g>
      <g class="ah-orbit ah-orbit-b">
        <circle :cx="CX" :cy="CY" r="126" class="ah-orbit-ring" />
        <circle :cx="CX" :cy="CY - 126" r="4" class="ah-orbit-dot" />
        <circle :cx="CX" :cy="CY + 126" r="3" class="ah-orbit-dot" />
      </g>
      <circle
        v-for="(_, j) in agentY"
        :key="`ring-${j}`"
        :class="['ah-ring', `ah-ring-${j}`]"
        :cx="CX"
        :cy="CY"
        r="80"
        opacity="0"
      />
      <circle :cx="CX" :cy="CY" r="80" fill="url(#ah-core)" class="ah-core" />
      <text :x="CX" :y="CY - 6" text-anchor="middle" class="ah-core-title">{{ copy.core[0] }}</text>
      <text :x="CX" :y="CY + 18" text-anchor="middle" class="ah-core-title">{{ copy.core[1] }}</text>
      <text :x="CX" :y="CY + 40" text-anchor="middle" class="ah-core-sub">{{ copy.coreSub }}</text>

      <g v-for="(label, j) in copy.agents" :key="label">
        <rect x="580" :y="agentY[j]! - 23" width="190" height="46" rx="12" :class="['ah-node', `ah-agent-${j}`]" />
        <text x="600" :y="agentY[j]! + 5" class="ah-label">{{ label }}</text>
        <g :class="['ah-check', `ah-check-${j}`]" opacity="0">
          <circle cx="748" :cy="agentY[j]" r="10" fill="#22c55e" />
          <path
            :d="`M743 ${agentY[j]} l3.5 3.5 l6 -6.5`"
            stroke="white"
            stroke-width="2.4"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>

      <g v-for="(platform, k) in platforms" :key="platform.name" :class="`ah-platform-${k}`">
        <rect x="830" :y="platformY[k]! - 22" width="140" height="44" rx="22" :fill="platform.color" />
        <text x="900" :y="platformY[k]! + 5" text-anchor="middle" class="ah-platform-label">{{ platform.name }}</text>
      </g>

      <g v-for="(_, j) in agentY" :key="`packet-${j}`" :class="['ah-packet', `ah-packet-${j}`]" opacity="0">
        <circle r="11" class="ah-packet-glow" filter="url(#ah-glow)" />
        <circle r="5.5" class="ah-packet-core" />
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.ah-scroll {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.ah {
  display: block;
  width: 100%;
  min-width: 720px;
  height: auto;
  font-family: "Urbanist", sans-serif;

  &-grid-dot {
    fill: var(--color-grayscale-400);
  }

  &-column {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    fill: var(--color-accent-400);
  }

  &-line {
    fill: none;
    stroke: var(--color-grayscale-500);
    stroke-width: 2;
    stroke-dasharray: 4 7;
    animation: ah-flow 1.2s linear infinite;
  }

  &-node {
    fill: var(--color-background-400);
    stroke: var(--color-grayscale-500);
    stroke-width: 2;
  }

  &-input-dot {
    fill: var(--color-accent-400);
  }

  &-label {
    font-size: 15px;
    font-weight: 700;
    fill: var(--color-text-400);
  }

  &-core {
    filter: drop-shadow(0 16px 30px color-mix(in srgb, var(--color-accent-400) 45%, transparent));
  }

  &-core-a {
    stop-color: color-mix(in srgb, var(--color-accent-400) 60%, white);
  }

  &-core-b {
    stop-color: var(--color-accent-400);
  }

  &-core-title {
    font-size: 19px;
    font-weight: 900;
    fill: white;
  }

  &-core-sub {
    font-size: 11px;
    font-weight: 700;
    fill: rgba(255, 255, 255, 0.85);
  }

  &-ring {
    fill: none;
    stroke: var(--color-accent-400);
    stroke-width: 2;
  }

  &-orbit {
    transform-box: view-box;
    transform-origin: 400px 230px;
    animation: ah-spin 14s linear infinite;

    &-b {
      animation-duration: 22s;
      animation-direction: reverse;
    }

    &-ring {
      fill: none;
      stroke: color-mix(in srgb, var(--color-accent-400) 35%, transparent);
      stroke-width: 1.5;
      stroke-dasharray: 3 8;
    }

    &-dot {
      fill: var(--color-accent-400);
    }
  }

  &-platform-label {
    font-size: 14px;
    font-weight: 800;
    fill: white;
  }

  &-packet-glow {
    fill: var(--color-accent-400);
    opacity: 0.55;
  }

  &-packet-core {
    fill: var(--color-accent-400);
  }
}

@keyframes ah-flow {
  to {
    stroke-dashoffset: -22;
  }
}

@keyframes ah-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ah-line,
  .ah-orbit {
    animation: none;
  }
}
</style>
