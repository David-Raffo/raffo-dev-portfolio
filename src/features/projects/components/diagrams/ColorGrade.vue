<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locale } from "../../../../i18n/store";
import { prefersReducedMotion } from "../../composables/useLoop";

type Grade = { exposure: number; contrast: number; saturation: number; temperature: number };
type Key = keyof Grade;

const copy = computed(() =>
  locale.value === "es"
    ? {
        original: "Original",
        result: "Resultado",
        looks: "Looks",
        reset: "Restablecer",
        hint: "Arrastra la imagen para comparar",
        labels: { exposure: "Exposición", contrast: "Contraste", saturation: "Saturación", temperature: "Temperatura" },
        footer: "Todo se hornea en un único LUT 33³ que FFmpeg aplica con interpolación tetraédrica en RGB de 16 bits.",
      }
    : {
        original: "Original",
        result: "Result",
        looks: "Looks",
        reset: "Reset",
        hint: "Drag the image to compare",
        labels: { exposure: "Exposure", contrast: "Contrast", saturation: "Saturation", temperature: "Temperature" },
        footer:
          "Everything is baked into a single 33³ LUT that FFmpeg applies with tetrahedral interpolation in 16-bit RGB.",
      },
);

const presets: { name: string; grade: Grade }[] = [
  { name: "Natural", grade: { exposure: 0, contrast: 0, saturation: 0, temperature: 0 } },
  { name: "Dron punch", grade: { exposure: 8, contrast: 32, saturation: 38, temperature: 12 } },
  { name: "Teal & Orange", grade: { exposure: 0, contrast: 26, saturation: 18, temperature: 34 } },
  { name: "Berry", grade: { exposure: -6, contrast: 18, saturation: 10, temperature: -38 } },
  { name: "Mono", grade: { exposure: 4, contrast: 40, saturation: -100, temperature: 0 } },
];

const keys: Key[] = ["exposure", "contrast", "saturation", "temperature"];

const grade = reactive<Grade>({ ...presets[1]!.grade });
const split = ref(50);
const active = ref("Dron punch");

const filter = computed(
  () =>
    `brightness(${1 + grade.exposure / 200}) contrast(${1 + grade.contrast / 150}) saturate(${Math.max(0, 1 + grade.saturation / 100)})`,
);

const tint = computed(() => ({
  backgroundColor: grade.temperature >= 0 ? "rgb(255, 136, 40)" : "rgb(30, 120, 255)",
  opacity: (Math.abs(grade.temperature) / 100) * 0.55,
}));

const applyPreset = (preset: (typeof presets)[number]) => {
  active.value = preset.name;
  gsap.to(grade, { ...preset.grade, duration: 0.6, ease: "power2.out", overwrite: true });
};

const handleInput = (key: Key, event: Event) => {
  active.value = "";
  grade[key] = Number((event.target as HTMLInputElement).value);
};

const previewRef = ref<HTMLDivElement | null>(null);
let dragging = false;

const updateSplit = (event: PointerEvent) => {
  const rect = previewRef.value!.getBoundingClientRect();
  split.value = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
};

const handleDown = (event: PointerEvent) => {
  dragging = true;
  gsap.killTweensOf(split);
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  updateSplit(event);
};

const handleMove = (event: PointerEvent) => {
  if (dragging) updateSplit(event);
};

const handleUp = () => {
  dragging = false;
};

const rootRef = ref<HTMLElement | null>(null);
let trigger: ScrollTrigger | null = null;

onMounted(() => {
  if (!rootRef.value || prefersReducedMotion()) return;
  Object.assign(grade, presets[0]!.grade);
  split.value = 88;
  trigger = ScrollTrigger.create({
    trigger: rootRef.value,
    start: "top 70%",
    once: true,
    onEnter: () => {
      gsap.to(split, { value: 50, duration: 1.4, ease: "power3.inOut" });
      gsap.to(grade, { ...presets[1]!.grade, duration: 1.2, delay: 0.3, ease: "power2.inOut" });
    },
  });
});

onBeforeUnmount(() => {
  trigger?.kill();
  gsap.killTweensOf(grade);
  gsap.killTweensOf(split);
});
</script>

<template>
  <div ref="rootRef" class="cg">
    <div
      ref="previewRef"
      class="cg-preview"
      @pointerdown="handleDown"
      @pointermove="handleMove"
      @pointerup="handleUp"
      @pointercancel="handleUp"
    >
      <div
        v-for="layer in ['original', 'graded']"
        :key="layer"
        :class="['cg-layer', `cg-layer-${layer}`]"
        :style="layer === 'graded' ? { clipPath: `inset(0 0 0 ${split}%)` } : undefined"
      >
        <div class="cg-image" :style="layer === 'graded' ? { filter } : undefined">
          <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" class="cg-svg">
            <defs>
              <linearGradient :id="`cg-sky-${layer}`" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#4a86c8" />
                <stop offset="0.55" stop-color="#a9c9dc" />
                <stop offset="1" stop-color="#efd9a7" />
              </linearGradient>
              <radialGradient :id="`cg-sun-${layer}`">
                <stop offset="0" stop-color="#fff6d5" />
                <stop offset="0.25" stop-color="#ffe7a3" stop-opacity="0.9" />
                <stop offset="1" stop-color="#ffd27a" stop-opacity="0" />
              </radialGradient>
              <linearGradient :id="`cg-sea-${layer}`" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#6aa0b8" />
                <stop offset="1" stop-color="#2f6d86" />
              </linearGradient>
            </defs>
            <rect width="640" height="360" :fill="`url(#cg-sky-${layer})`" />
            <circle cx="430" cy="178" r="120" :fill="`url(#cg-sun-${layer})`" />
            <circle cx="430" cy="178" r="22" fill="#fff7de" />
            <ellipse cx="150" cy="80" rx="70" ry="12" fill="#ffffff" opacity="0.55" />
            <ellipse cx="210" cy="96" rx="50" ry="9" fill="#ffffff" opacity="0.45" />
            <ellipse cx="540" cy="60" rx="60" ry="10" fill="#ffffff" opacity="0.4" />
            <path
              d="M0 200 L60 170 L120 188 L190 150 L260 184 L330 164 L400 192 L470 172 L540 190 L640 160 V214 H0Z"
              fill="#7d93a8"
              opacity="0.8"
            />
            <rect y="206" width="640" height="60" :fill="`url(#cg-sea-${layer})`" />
            <path
              d="M405 212 h50 M395 224 h70 M410 236 h40 M400 248 h60"
              stroke="#fff3c4"
              stroke-width="3"
              stroke-linecap="round"
              opacity="0.7"
            />
            <path d="M0 250 Q80 222 170 244 T340 238 T520 250 T640 236 V360 H0Z" fill="#3f8a4f" />
            <path d="M0 292 Q110 262 240 288 T460 282 T640 276 V360 H0Z" fill="#2c6a3b" />
            <path d="M0 330 Q160 304 320 326 T640 318 V360 H0Z" fill="#1d4a2a" />
            <g fill="#173d22">
              <path d="M90 300 l10 -36 l10 36z" />
              <path d="M112 304 l8 -28 l8 28z" />
              <path d="M520 296 l11 -40 l11 40z" />
              <path d="M546 300 l8 -26 l8 26z" />
            </g>
          </svg>
        </div>
        <div v-if="layer === 'graded'" class="cg-tint" :style="tint"></div>
      </div>
      <div class="cg-divider" :style="{ left: `${split}%` }">
        <span class="cg-handle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
      <span class="cg-badge cg-badge-left">{{ copy.original }}</span>
      <span class="cg-badge cg-badge-right">{{ copy.result }}</span>
      <span class="cg-hint">{{ copy.hint }}</span>
    </div>

    <div class="cg-panel">
      <div class="cg-panel-head">
        <p class="cg-panel-title">{{ copy.looks }}</p>
        <button type="button" class="cg-reset" data-hoversound="hover" @click="applyPreset(presets[0]!)">
          {{ copy.reset }}
        </button>
      </div>
      <div class="cg-presets">
        <button
          v-for="preset in presets"
          :key="preset.name"
          type="button"
          :class="['cg-preset', active === preset.name && 'cg-preset-active']"
          data-hoversound="hover"
          @click="applyPreset(preset)"
        >
          {{ preset.name }}
        </button>
      </div>
      <label v-for="key in keys" :key="key" class="cg-slider">
        <span class="cg-slider-row">
          <span class="cg-slider-label">{{ copy.labels[key] }}</span>
          <span class="cg-slider-value">{{ Math.round(grade[key]) }}</span>
        </span>
        <input
          type="range"
          min="-100"
          max="100"
          :value="grade[key]"
          :class="['cg-range', key === 'temperature' && 'cg-range-temp']"
          @input="handleInput(key, $event)"
        />
      </label>
      <p class="cg-footer">{{ copy.footer }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cg {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  padding: var(--space-sm);

  @include mixins.mq("md") {
    grid-template-columns: 1.7fr 1fr;
    padding: var(--space-md);
  }

  &-preview {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: var(--radius-md);
    cursor: ew-resize;
    touch-action: pan-y;
    user-select: none;
    align-self: center;
  }

  &-layer {
    position: absolute;
    inset: 0;
  }

  &-image,
  &-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  &-tint {
    position: absolute;
    inset: 0;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  &-divider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background-color: white;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  &-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 36px;
    height: 36px;
    padding: 8px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: #1b2530;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &-badge {
    position: absolute;
    top: var(--space-sm);
    padding: 3px 10px;
    border-radius: 999px;
    font-size: var(--font-size-xs);
    font-weight: 700;
    color: white;
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    pointer-events: none;

    &-left {
      left: var(--space-sm);
    }

    &-right {
      right: var(--space-sm);
    }
  }

  &-hint {
    position: absolute;
    bottom: var(--space-sm);
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 12px;
    border-radius: 999px;
    font-size: var(--font-size-xs);
    font-weight: 600;
    color: white;
    background-color: rgba(0, 0, 0, 0.45);
    white-space: nowrap;
    pointer-events: none;
  }

  &-panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    background-color: var(--color-background-400);

    &-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      font-weight: 800;
      color: var(--color-text-400);
    }
  }

  &-reset {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-300);
    background: none;
    border: none;
    cursor: pointer;

    @include mixins.hover {
      &:hover {
        color: var(--color-accent-400);
      }
    }
  }

  &-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &-preset {
    padding: 5px 11px;
    border-radius: 999px;
    font-size: var(--font-size-xs);
    font-weight: 700;
    color: var(--color-text-300);
    background-color: transparent;
    border: var(--stroke-sm) solid var(--color-grayscale-500);
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &-active {
      color: var(--color-accent-text-400);
      background-color: var(--color-accent-400);
      border-color: var(--color-accent-400);
    }
  }

  &-slider {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-row {
      display: flex;
      justify-content: space-between;
      font-size: var(--font-size-sm);
    }

    &-label {
      color: var(--color-text-300);
      font-weight: 600;
    }

    &-value {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      color: var(--color-text-400);
      font-variant-numeric: tabular-nums;
    }
  }

  &-range {
    width: 100%;
    height: 18px;
    accent-color: var(--color-accent-400);
    cursor: pointer;
    background: transparent;
    appearance: none;

    &::-webkit-slider-runnable-track {
      height: 4px;
      border-radius: 2px;
      background: var(--color-grayscale-500);
    }

    &::-moz-range-track {
      height: 4px;
      border-radius: 2px;
      background: var(--color-grayscale-500);
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      margin-top: -6px;
      border-radius: 50%;
      background: var(--color-accent-400);
      border: 3px solid var(--color-background-400);
      box-shadow: 0 0 0 1px var(--color-accent-400);
    }

    &::-moz-range-thumb {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--color-accent-400);
      border: 3px solid var(--color-background-400);
    }

    &-temp {
      &::-webkit-slider-runnable-track {
        background: linear-gradient(90deg, #2f7dff, var(--color-grayscale-500), #ff8a2a);
      }

      &::-moz-range-track {
        background: linear-gradient(90deg, #2f7dff, var(--color-grayscale-500), #ff8a2a);
      }
    }
  }

  &-footer {
    margin-top: auto;
    padding-top: var(--space-xs);
    font-size: var(--font-size-xs);
    line-height: 1.45;
    color: var(--color-text-300);
    border-top: var(--stroke-sm) solid var(--color-grayscale-400);
  }
}
</style>
