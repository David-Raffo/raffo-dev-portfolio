<script setup lang="ts">
import { computed, ref } from "vue";
import gsap from "gsap";
import { locale } from "../../../../i18n/store";
import { useLoop } from "../../composables/useLoop";

const copy = computed(() =>
  locale.value === "es"
    ? {
        project: "Vuelo costa · 3 clips · 0:11",
        music: "banda_sonora.mp3 · 80%",
        rendering: "Renderizando desde el original",
        done: "Listo",
      }
    : {
        project: "Coast flight · 3 clips · 0:11",
        music: "soundtrack.mp3 · 80%",
        rendering: "Rendering from the original",
        done: "Done",
      },
);

const X0 = 80;
const X1 = 960;
const SECONDS = 11;
const PX = (X1 - X0) / SECONDS;

const ticks = Array.from({ length: SECONDS * 2 + 1 }, (_, i) => ({
  x: X0 + (i * PX) / 2,
  major: i % 2 === 0,
  label: `0:${String(i / 2).padStart(2, "0")}`,
}));

const clips = [
  { x: 80, w: 316, pattern: "vt-day", label: "0:04.0" },
  { x: 400, w: 156, pattern: "vt-day", label: "0:02.0", speed: "2×" },
  { x: 560, w: 400, pattern: "vt-dusk", label: "0:05.0" },
];

const bars = Array.from({ length: 177 }, (_, i) => {
  const x = X0 + i * 5;
  const n = Math.abs(Math.sin(i * 0.37) * 0.55 + Math.sin(i * 0.11 + 1.3) * 0.35 + Math.sin(i * 1.7) * 0.18);
  const quiet = x >= 400 && x <= 556 ? 0.45 : 1;
  const h = Math.max(3, n * 44 * quiet);
  return { x, y: 194 - h / 2, h };
});

const stages = ["trim", "tonemap", "crop", "scale", "lut3d", "atempo", "amix", "libx264"];
const stageX = (i: number) => 150 + i * 104;

const rootRef = ref<SVGSVGElement | null>(null);

useLoop(rootRef, () => {
  const root = rootRef.value!;
  const time = root.querySelector(".vt-time") as SVGTextElement;
  const percent = root.querySelector(".vt-percent") as SVGTextElement;
  const css = getComputedStyle(root);
  const accent = css.getPropertyValue("--color-accent-400").trim();
  const accentText = css.getPropertyValue("--color-accent-text-400").trim();
  const state = { t: 0 };
  const render = { p: 0 };

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

  tl.to(state, {
    t: 1,
    duration: 8,
    ease: "none",
    onUpdate: () => {
      const seconds = state.t * SECONDS;
      time.textContent = `0:${Math.floor(seconds).toString().padStart(2, "0")}.${Math.floor((seconds % 1) * 10)}`;
    },
  });
  tl.fromTo(".vt-playhead", { x: 0 }, { x: X1 - X0, duration: 8, ease: "none" }, 0);
  tl.fromTo(".vt-played", { attr: { width: 0 } }, { attr: { width: X1 - X0 }, duration: 8, ease: "none" }, 0);
  tl.to(
    ".vt-speed",
    { scale: 1.3, transformOrigin: "50% 50%", yoyo: true, repeat: 1, duration: 0.2 },
    ((400 - X0) / (X1 - X0)) * 8,
  );
  tl.set(".vt-render", { autoAlpha: 0 }, 0);

  tl.set(".vt-render", { autoAlpha: 1 }, 8);
  tl.fromTo(".vt-render", { y: 10 }, { y: 0, duration: 0.3 });
  stages.forEach((_, i) => {
    tl.to(`.vt-stage-${i}`, { fill: accent, duration: 0.15 }, `>-0.02`);
    tl.to(`.vt-stage-text-${i}`, { fill: accentText, duration: 0.15 }, "<");
  });
  tl.to(
    render,
    {
      p: 1,
      duration: 1.6,
      ease: "power1.inOut",
      onUpdate: () => {
        percent.textContent = `${Math.round(render.p * 100)}%`;
      },
    },
    "<",
  );
  tl.fromTo(".vt-progress", { attr: { width: 0 } }, { attr: { width: 700 }, duration: 1.6, ease: "power1.inOut" }, "<");
  tl.to(".vt-done", { autoAlpha: 1, duration: 0.3 });
  tl.to({}, { duration: 1.4 });

  return tl;
});
</script>

<template>
  <div class="vt-scroll">
    <svg ref="rootRef" class="vt" viewBox="0 0 1000 420" role="img" aria-label="Video Tools timeline">
      <defs>
        <linearGradient id="vt-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3f7fd0" />
          <stop offset="0.7" stop-color="#bcd9e6" />
          <stop offset="1" stop-color="#f3dca0" />
        </linearGradient>
        <linearGradient id="vt-sky-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2d3a8c" />
          <stop offset="0.6" stop-color="#e86a4a" />
          <stop offset="1" stop-color="#f7b267" />
        </linearGradient>
        <pattern id="vt-day" width="80" height="70" patternUnits="userSpaceOnUse" y="84">
          <rect width="80" height="70" fill="url(#vt-sky-day)" />
          <circle cx="52" cy="40" r="9" fill="#fff4c2" />
          <path d="M0 52 Q20 40 40 50 T80 46 V70 H0Z" fill="#2f7a4a" />
          <path d="M0 60 Q25 52 50 60 T80 58 V70 H0Z" fill="#1f5a36" />
          <line x1="79.5" y1="0" x2="79.5" y2="70" stroke="rgba(0,0,0,0.25)" />
        </pattern>
        <pattern id="vt-dusk" width="80" height="70" patternUnits="userSpaceOnUse" y="84">
          <rect width="80" height="70" fill="url(#vt-sky-dusk)" />
          <circle cx="30" cy="46" r="10" fill="#ffd28a" />
          <path d="M0 54 Q20 44 40 52 T80 48 V70 H0Z" fill="#6b2f3f" />
          <path d="M0 62 Q25 55 50 62 T80 60 V70 H0Z" fill="#3b1b2d" />
          <line x1="79.5" y1="0" x2="79.5" y2="70" stroke="rgba(0,0,0,0.25)" />
        </pattern>
        <clipPath id="vt-played-clip">
          <rect class="vt-played" :x="X0" y="160" :width="0" height="70" />
        </clipPath>
      </defs>

      <text class="vt-project" x="20" y="28">{{ copy.project }}</text>
      <rect x="872" y="10" width="108" height="28" rx="8" class="vt-chip" />
      <text class="vt-time vt-mono" x="926" y="30" text-anchor="middle">0:00.0</text>

      <g v-for="tick in ticks" :key="tick.x">
        <line :x1="tick.x" :x2="tick.x" :y1="tick.major ? 56 : 64" y2="72" class="vt-tick" />
        <text v-if="tick.major" :x="tick.x + 3" y="62" class="vt-mono vt-tick-label">{{ tick.label }}</text>
      </g>

      <g v-for="(lane, index) in ['V1', 'A1', 'M1']" :key="lane">
        <rect x="20" :y="[104, 180, 242][index]" width="40" height="28" rx="7" class="vt-chip" />
        <text x="40" :y="[123, 199, 261][index]" text-anchor="middle" class="vt-mono vt-lane">{{ lane }}</text>
      </g>

      <g v-for="(clip, index) in clips" :key="clip.x">
        <rect :x="clip.x" y="84" :width="clip.w" height="70" rx="8" :fill="`url(#${clip.pattern})`" />
        <rect
          :class="['vt-clip-border', `vt-clip-${index}`, clip.speed && 'vt-clip-selected']"
          :x="clip.x"
          y="84"
          :width="clip.w"
          height="70"
          rx="8"
        />
        <rect :x="clip.x + 6" y="128" width="52" height="20" rx="5" class="vt-clip-chip" />
        <text :x="clip.x + 32" y="142" text-anchor="middle" class="vt-mono vt-clip-label">{{ clip.label }}</text>
        <g v-if="clip.speed" class="vt-speed">
          <rect :x="clip.x + 6" y="90" width="30" height="18" rx="5" class="vt-speed-bg" />
          <text :x="clip.x + 21" y="103" text-anchor="middle" class="vt-speed-text">{{ clip.speed }}</text>
        </g>
      </g>

      <rect :x="X0" y="164" :width="X1 - X0" height="60" rx="8" class="vt-lane-bg" />
      <rect x="400" y="164" width="156" height="60" class="vt-region" />
      <g class="vt-wave">
        <rect v-for="bar in bars" :key="bar.x" :x="bar.x" :y="bar.y" width="3" :height="bar.h" rx="1.5" />
      </g>
      <g class="vt-wave vt-wave-played" clip-path="url(#vt-played-clip)">
        <rect v-for="bar in bars" :key="`p-${bar.x}`" :x="bar.x" :y="bar.y" width="3" :height="bar.h" rx="1.5" />
      </g>
      <polyline class="vt-envelope" points="80,170 396,170 404,196 552,196 560,170 960,170" />
      <circle cx="404" cy="196" r="4" class="vt-envelope-dot" />
      <circle cx="552" cy="196" r="4" class="vt-envelope-dot" />
      <text x="478" y="214" text-anchor="middle" class="vt-mono vt-region-label">45%</text>

      <rect x="150" y="236" width="770" height="44" rx="8" class="vt-music" />
      <polyline class="vt-music-env" points="150,278 232,240 838,240 920,278" />
      <text x="244" y="263" class="vt-music-label">{{ copy.music }}</text>

      <g class="vt-playhead">
        <line :x1="X0" :x2="X0" y1="48" y2="290" class="vt-playhead-line" />
        <path :d="`M${X0 - 7} 44 H${X0 + 7} V52 L${X0} 59 L${X0 - 7} 52Z`" class="vt-playhead-head" />
      </g>

      <g class="vt-render">
        <text x="20" y="324" class="vt-mono vt-muted">filter_complex</text>
        <g v-for="(stage, i) in stages" :key="stage">
          <rect :class="['vt-stage', `vt-stage-${i}`]" :x="stageX(i)" y="306" width="92" height="28" rx="14" />
          <text
            :class="['vt-mono', 'vt-stage-text', `vt-stage-text-${i}`]"
            :x="stageX(i) + 46"
            y="325"
            text-anchor="middle"
          >
            {{ stage }}
          </text>
          <path v-if="i < stages.length - 1" :d="`M${stageX(i) + 94} 320 h8`" class="vt-arrow" />
        </g>
        <text x="20" y="370" class="vt-render-label">{{ copy.rendering }}</text>
        <rect x="260" y="360" width="700" height="10" rx="5" class="vt-progress-track" />
        <rect class="vt-progress" x="260" y="360" width="0" height="10" rx="5" />
        <text x="960" y="396" text-anchor="end" class="vt-mono vt-percent">0%</text>
        <g class="vt-done" opacity="0">
          <text x="260" y="396" class="vt-done-text">✓ {{ copy.done }} · MP4 H.264 · CRF 23</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.vt-scroll {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.vt {
  display: block;
  width: 100%;
  min-width: 720px;
  height: auto;
  padding: 8px;
  font-family: "Urbanist", sans-serif;

  &-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  &-project {
    font-size: 17px;
    font-weight: 800;
    fill: var(--color-text-400);
  }

  &-chip {
    fill: var(--color-background-400);
    stroke: var(--color-grayscale-500);
  }

  &-time {
    font-size: 15px;
    font-weight: 700;
    fill: var(--color-accent-400);
  }

  &-tick {
    stroke: var(--color-grayscale-500);
  }

  &-tick-label {
    font-size: 10px;
    fill: var(--color-text-300);
  }

  &-lane {
    font-size: 12px;
    font-weight: 700;
    fill: var(--color-text-300);
  }

  &-clip-border {
    fill: none;
    stroke: rgba(0, 0, 0, 0.35);
    stroke-width: 2;
  }

  &-clip-selected {
    stroke: #f5c542;
    stroke-width: 3;
  }

  &-clip-chip {
    fill: rgba(0, 0, 0, 0.6);
  }

  &-clip-label {
    font-size: 11px;
    font-weight: 700;
    fill: white;
  }

  &-speed-bg {
    fill: #f5c542;
  }

  &-speed-text {
    font-size: 12px;
    font-weight: 900;
    fill: #2a2000;
  }

  &-lane-bg {
    fill: var(--color-background-400);
  }

  &-region {
    fill: color-mix(in srgb, #f5c542 12%, transparent);
  }

  &-wave rect {
    fill: var(--color-text-300);
    opacity: 0.45;
  }

  &-wave-played rect {
    fill: var(--color-accent-400);
    opacity: 1;
  }

  &-envelope {
    fill: none;
    stroke: #f5c542;
    stroke-width: 2;
  }

  &-envelope-dot {
    fill: #f5c542;
  }

  &-region-label {
    font-size: 11px;
    font-weight: 700;
    fill: #f5c542;
  }

  &-music {
    fill: color-mix(in srgb, var(--color-accent-400) 18%, transparent);
    stroke: color-mix(in srgb, var(--color-accent-400) 60%, transparent);
  }

  &-music-env {
    fill: none;
    stroke: var(--color-accent-400);
    stroke-width: 2;
  }

  &-music-label {
    font-size: 13px;
    font-weight: 700;
    fill: var(--color-text-400);
  }

  &-playhead-line {
    stroke: #ef4444;
    stroke-width: 2;
  }

  &-playhead-head {
    fill: #ef4444;
  }

  &-muted {
    font-size: 12px;
    fill: var(--color-text-300);
  }

  &-stage {
    fill: var(--color-background-400);
    stroke: var(--color-grayscale-500);
  }

  &-stage-text {
    font-size: 12px;
    font-weight: 700;
    fill: var(--color-text-300);
  }

  &-arrow {
    stroke: var(--color-grayscale-500);
    stroke-width: 2;
  }

  &-render-label {
    font-size: 14px;
    font-weight: 700;
    fill: var(--color-text-400);
  }

  &-progress-track {
    fill: var(--color-grayscale-400);
  }

  &-progress {
    fill: var(--color-accent-400);
  }

  &-percent {
    font-size: 13px;
    font-weight: 700;
    fill: var(--color-accent-400);
  }

  &-done-text {
    font-size: 13px;
    font-weight: 700;
    fill: #22c55e;
  }
}
</style>
