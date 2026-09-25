<script setup lang="ts">
import { computed, ref } from "vue";
import gsap from "gsap";
import { locale } from "../../../../i18n/store";
import { useLoop } from "../../composables/useLoop";

type Motif = "moon" | "house" | "star" | "wave" | "mountain" | "sun";

const posters: { title: string; a: string; b: string; motif: Motif }[] = [
  { title: "HOLLOW", a: "#1b1b2f", b: "#5b2333", motif: "house" },
  { title: "PIXEL PALS", a: "#ffbe0b", b: "#fb5607", motif: "star" },
  { title: "LUNA", a: "#3a0ca3", b: "#f72585", motif: "moon" },
  { title: "ECHO", a: "#0b132b", b: "#3a506b", motif: "moon" },
  { title: "KITE", a: "#48cae4", b: "#0077b6", motif: "sun" },
  { title: "MAREA", a: "#023e8a", b: "#00b4d8", motif: "wave" },
  { title: "THE LAST HOUSE", a: "#2b2d42", b: "#8d0801", motif: "house" },
  { title: "ROBOTINA", a: "#06d6a0", b: "#118ab2", motif: "star" },
  { title: "NORTE", a: "#e9c46a", b: "#264653", motif: "mountain" },
  { title: "FROST", a: "#caf0f8", b: "#023047", motif: "mountain" },
  { title: "BLOOM", a: "#ff99c8", b: "#a0c4ff", motif: "sun" },
  { title: "SOLACE", a: "#f4a261", b: "#6d597a", motif: "sun" },
  { title: "NOIR", a: "#111111", b: "#444444", motif: "moon" },
  { title: "ORBIT", a: "#7209b7", b: "#4cc9f0", motif: "star" },
  { title: "VELVET", a: "#9d0208", b: "#370617", motif: "wave" },
  { title: "DUNAS", a: "#ee9b00", b: "#9b2226", motif: "mountain" },
];

const pile = posters.map((_, i) => {
  const r = (n: number) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
  return {
    left: 3 + Math.abs(r(1)) * 22,
    top: 16 + Math.abs(r(2)) * 30,
    rotation: (r(3) * 2 - 1) * 20,
  };
});

const searches = [
  { picks: [0, 3, 6, 12, 9], fit: [96, 91, 88, 83, 74] },
  { picks: [1, 7, 4, 13, 10], fit: [97, 93, 90, 86, 79] },
  { picks: [2, 11, 5, 14, 8], fit: [94, 90, 87, 84, 80] },
];

const queries = computed(() =>
  locale.value === "es"
    ? ["pelis de miedo con fantasmas", "algo para ver con niños", "dramas con buena nota después de 2000"]
    : ["scary movies with ghosts", "something to watch with kids", "well rated dramas after 2000"],
);

const copy = computed(() =>
  locale.value === "es"
    ? { searching: "Jev puntúa ~1.000 películas en 4 lotes", results: "Encajan contigo" }
    : { searching: "Jev scores ~1,000 movies in 4 batches", results: "Your matches" },
);

const SLOT_LEFT = 38;
const SLOT_STEP = 11.8;
const ROW_TOP = 22;

const rootRef = ref<HTMLElement | null>(null);

useLoop(rootRef, () => {
  const root = rootRef.value!;
  const field = root.querySelector(".pp-query") as HTMLElement;
  const tl = gsap.timeline({ repeat: -1 });

  searches.forEach((search, s) => {
    const query = queries.value[s]!;
    const typed = { n: 0 };

    tl.call(() => {
      field.textContent = "";
    });
    tl.to(typed, {
      n: query.length,
      duration: query.length * 0.045,
      ease: "none",
      onUpdate: () => {
        field.textContent = query.slice(0, Math.round(typed.n));
      },
    });
    tl.to(".pp-status", { autoAlpha: 1, duration: 0.2 });
    tl.to(".pp-bar-fill", { scaleX: 1, duration: 0.9, ease: "power1.inOut" }, "<");
    tl.to(
      ".pp-poster",
      { rotation: `+=${4}`, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut", stagger: 0.01 },
      "<",
    );
    tl.to(".pp-status", { autoAlpha: 0, duration: 0.2 });
    tl.set(".pp-bar-fill", { scaleX: 0 });
    tl.to(".pp-results-label", { autoAlpha: 1, duration: 0.3 }, "<");

    search.picks.forEach((index, slot) => {
      const el = `.pp-poster-${index}`;
      tl.set(el, { zIndex: 30 + slot }, "<");
      tl.to(
        el,
        {
          left: `${SLOT_LEFT + slot * SLOT_STEP}%`,
          top: `${ROW_TOP}%`,
          rotation: 0,
          scale: 1.08,
          duration: 0.75,
          ease: "power3.out",
        },
        slot === 0 ? "<" : "<+=0.1",
      );
      tl.call(() => {
        const badge = root.querySelector(`${el} .pp-fit`) as HTMLElement;
        badge.textContent = `${search.fit[slot]}%`;
      });
      tl.fromTo(`${el} .pp-fit`, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "<");
    });

    tl.to({}, { duration: 1.8 });
    tl.to(".pp-results-label", { autoAlpha: 0, duration: 0.25 });
    search.picks.forEach((index, slot) => {
      const el = `.pp-poster-${index}`;
      const home = pile[index]!;
      tl.to(`${el} .pp-fit`, { autoAlpha: 0, duration: 0.15 }, slot === 0 ? "<" : "<+=0.04");
      tl.to(
        el,
        {
          left: `${home.left}%`,
          top: `${home.top}%`,
          rotation: home.rotation,
          scale: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<",
      );
      tl.set(el, { zIndex: index + 1 }, ">");
    });
    tl.to(
      typed,
      {
        n: 0,
        duration: 0.4,
        ease: "none",
        onUpdate: () => {
          field.textContent = query.slice(0, Math.round(typed.n));
        },
      },
      "-=0.3",
    );
  });

  return tl;
});
</script>

<template>
  <div ref="rootRef" class="pp">
    <div class="pp-search">
      <svg
        class="pp-search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
      <span class="pp-query">{{ queries[0] }}</span
      ><span class="pp-caret"></span>
      <span class="pp-status">
        {{ copy.searching }}
        <span class="pp-bar"><span class="pp-bar-fill"></span></span>
      </span>
    </div>

    <div class="pp-stage">
      <span class="pp-results-label">{{ copy.results }}</span>
      <span
        v-for="slot in 5"
        :key="`slot-${slot}`"
        class="pp-slot"
        :style="{ left: `${SLOT_LEFT + (slot - 1) * SLOT_STEP}%`, top: `${ROW_TOP}%` }"
      ></span>
      <div
        v-for="(poster, index) in posters"
        :key="poster.title"
        :class="['pp-poster', `pp-poster-${index}`]"
        :style="{
          left: `${pile[index]!.left}%`,
          top: `${pile[index]!.top}%`,
          transform: `rotate(${pile[index]!.rotation}deg)`,
          zIndex: index + 1,
          '--a': poster.a,
          '--b': poster.b,
        }"
      >
        <svg class="pp-motif" viewBox="0 0 60 60" aria-hidden="true">
          <template v-if="poster.motif === 'moon'">
            <circle cx="32" cy="26" r="16" fill="rgba(255,255,255,0.85)" />
            <circle cx="40" cy="20" r="14" :fill="poster.a" />
          </template>
          <template v-else-if="poster.motif === 'house'">
            <path d="M14 46V28l16-12 16 12v18z" fill="rgba(0,0,0,0.55)" />
            <rect x="26" y="34" width="8" height="12" fill="#ffd166" />
          </template>
          <template v-else-if="poster.motif === 'star'">
            <path d="M30 8l6 14 15 1-11 10 4 15-14-8-14 8 4-15-11-10 15-1z" fill="rgba(255,255,255,0.85)" />
          </template>
          <template v-else-if="poster.motif === 'wave'">
            <path d="M4 36q8-8 16 0t16 0 16 0 8-2v24H4z" fill="rgba(255,255,255,0.5)" />
            <path d="M4 44q8-8 16 0t16 0 16 0 8-2v16H4z" fill="rgba(255,255,255,0.75)" />
          </template>
          <template v-else-if="poster.motif === 'mountain'">
            <path d="M2 50l18-26 10 12 8-10 20 24z" fill="rgba(255,255,255,0.8)" />
          </template>
          <template v-else>
            <circle cx="30" cy="28" r="13" fill="rgba(255,255,255,0.85)" />
            <path
              d="M30 6v6M30 44v6M8 28h6M46 28h6"
              stroke="rgba(255,255,255,0.6)"
              stroke-width="3"
              stroke-linecap="round"
            />
          </template>
        </svg>
        <span class="pp-title">{{ poster.title }}</span>
        <span class="pp-fit">0%</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pp {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-md);
  background: radial-gradient(120% 90% at 70% 0%, #26263a 0%, #101016 60%);
  color: #f4f4f5;

  @include mixins.mq("md") {
    padding: var(--space-lg);
  }

  &-search {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 52px;
    padding: 0 18px;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.14);
    font-size: var(--font-size-md);
    font-weight: 600;

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }

    &-icon {
      width: 20px;
      height: 20px;
      flex: none;
      color: #a1a1aa;
    }
  }

  &-query {
    white-space: nowrap;
    overflow: hidden;
  }

  &-caret {
    width: 2px;
    height: 22px;
    margin-left: 2px;
    background-color: var(--color-accent-400);
    animation: pp-blink 1s steps(1) infinite;
  }

  &-status {
    position: absolute;
    right: 18px;
    display: none;
    align-items: center;
    gap: 10px;
    font-size: var(--font-size-xs);
    font-weight: 600;
    color: #a1a1aa;
    opacity: 0;
    visibility: hidden;

    @include mixins.mq("md") {
      display: flex;
    }
  }

  &-bar {
    width: 70px;
    height: 4px;
    border-radius: 2px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.12);

    &-fill {
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--color-accent-400);
      transform: scaleX(0);
      transform-origin: left;
    }
  }

  &-stage {
    position: relative;
    aspect-ratio: 16 / 8;
    overflow: hidden;
  }

  &-results-label {
    position: absolute;
    left: 38%;
    top: 6%;
    font-size: var(--font-size-xs);
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-accent-400);
    opacity: 0;
    visibility: hidden;
  }

  &-slot {
    position: absolute;
    width: 12.5%;
    aspect-ratio: 2 / 3;
    border-radius: 6px;
    border: 1.5px dashed rgba(255, 255, 255, 0.14);
    background-color: rgba(255, 255, 255, 0.02);
  }

  &-poster {
    position: absolute;
    width: 12.5%;
    aspect-ratio: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(3px, 0.8vw, 10px);
    border-radius: 6px;
    background: linear-gradient(160deg, var(--a), var(--b));
    box-shadow:
      0 12px 24px -10px rgba(0, 0, 0, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  }

  &-motif {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    flex: none;
  }

  &-title {
    font-size: clamp(6px, 1vw, 12px);
    font-weight: 900;
    letter-spacing: 0.06em;
    line-height: 1;
    color: white;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  }

  &-fit {
    position: absolute;
    left: 50%;
    bottom: -14%;
    transform: translateX(-50%);
    padding: 2px 8px;
    border-radius: 999px;
    font-size: clamp(8px, 1vw, 12px);
    font-weight: 800;
    white-space: nowrap;
    color: var(--color-accent-text-400);
    background-color: var(--color-accent-400);
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes pp-blink {
  50% {
    opacity: 0;
  }
}
</style>
