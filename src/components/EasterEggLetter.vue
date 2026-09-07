<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import gsap from "gsap";
import X from "./icons/X.vue";
import { t } from "../i18n/utils/translate";
import { easterEggOpen, closeEasterEgg } from "../composables/useEasterEgg";
import { lenis } from "../composables/useScroll";
import { playSound } from "../features/sounds/utils/sounds";
import { useTetris, PIECE_NAMES, COLUMNS } from "../features/tetris/useTetris";

const backRef = ref<HTMLElement | null>(null);
const frontRef = ref<HTMLElement | null>(null);
const flapRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const isRevealed = ref(false);

const game = useTetris();

let timeline: gsap.core.Timeline | null = null;

const pieceClass = (value: number) => (value ? `egg-cell-${PIECE_NAMES[value]}` : "");
const rowOf = (index: number) => Math.floor(index / COLUMNS);

/* --- the envelope opening --- */

const reveal = () => {
  timeline?.kill();
  isRevealed.value = false;

  const pockets = [backRef.value, frontRef.value];

  timeline = gsap.timeline({
    onComplete: () => {
      isRevealed.value = true;
      game.start();
    },
  });

  timeline.fromTo(
    pockets,
    { scale: 0.6, y: 60, opacity: 0 },
    { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)" },
    0,
  );
  timeline.fromTo(flapRef.value, { rotateX: 0 }, { rotateX: -168, duration: 0.5, ease: "power2.inOut" }, 0.4);
  // the card starts tucked inside, and the front pocket sits above it in z
  timeline.fromTo(
    cardRef.value,
    { y: 170, scale: 0.5, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
    0.85,
  );
  timeline.to([...pockets, flapRef.value], { y: 260, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.1);
};

const close = () => {
  playSound("click");
  closeEasterEgg();
};

/* --- keyboard --- */

const KEYS: Record<string, () => void> = {
  ArrowLeft: () => game.moveLeft(),
  ArrowRight: () => game.moveRight(),
  ArrowUp: () => game.rotate(),
  ArrowDown: () => game.softDrop(),
  " ": () => game.hardDrop(),
  p: () => game.togglePause(),
  P: () => game.togglePause(),
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    close();
    return;
  }

  const action = KEYS[event.key];
  if (!action) return;

  // arrows and space would otherwise scroll the page behind the overlay
  event.preventDefault();
  action();
};

/* --- lifecycle --- */

watch(easterEggOpen, async (open) => {
  if (open) {
    lenis.value?.stop();
    window.addEventListener("keydown", handleKeydown);
    await nextTick();
    reveal();
    return;
  }

  lenis.value?.start();
  window.removeEventListener("keydown", handleKeydown);
  timeline?.kill();
  timeline = null;
  isRevealed.value = false;
  game.stop();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  lenis.value?.start();
  timeline?.kill();
  game.destroy();
});
</script>

<template>
  <Transition name="egg">
    <!-- the 3D raycast listens on window, so overlay clicks must not reach it -->
    <div v-if="easterEggOpen" class="egg" @click.stop>
      <div class="egg-backdrop" @click="close"></div>

      <button type="button" class="egg-close" :aria-label="t('egg-close')" @click="close">
        <X class="egg-close-icon" />
      </button>

      <div class="egg-stage">
        <div ref="backRef" class="egg-envelope-back" aria-hidden="true">
          <div ref="flapRef" class="egg-envelope-flap"></div>
        </div>

        <div ref="cardRef" class="egg-card">
          <div class="egg-card-header">
            <p class="egg-card-title">{{ t("egg-title") }}</p>
            <div class="egg-next" :aria-label="t('egg-next')">
              <span
                v-for="(value, index) in game.nextCells.value"
                :key="index"
                :class="['egg-next-cell', pieceClass(value)]"
              ></span>
            </div>
          </div>

          <div class="egg-stats">
            <div class="egg-stat">
              <span class="egg-stat-label">{{ t("egg-score") }}</span>
              <span class="egg-stat-value">{{ game.score.value }}</span>
            </div>
            <div class="egg-stat">
              <span class="egg-stat-label">{{ t("egg-lines") }}</span>
              <span class="egg-stat-value">{{ game.lines.value }}</span>
            </div>
            <div class="egg-stat">
              <span class="egg-stat-label">{{ t("egg-level") }}</span>
              <span class="egg-stat-value">{{ game.level.value }}</span>
            </div>
          </div>

          <div class="egg-board-wrapper">
            <div class="egg-board">
              <span
                v-for="(value, index) in game.cells.value"
                :key="index"
                :class="[
                  'egg-cell',
                  pieceClass(value),
                  { 'egg-cell-clearing': game.clearingRows.value.includes(rowOf(index)) },
                ]"
              ></span>
            </div>

            <div v-if="isRevealed && (game.isGameOver.value || game.isPaused.value)" class="egg-overlay">
              <p class="egg-overlay-copy">{{ game.isGameOver.value ? t("egg-over") : t("egg-paused") }}</p>
              <button
                type="button"
                class="egg-button"
                @click="game.isGameOver.value ? game.start() : game.togglePause()"
              >
                {{ game.isGameOver.value ? t("egg-again") : t("egg-resume") }}
              </button>
            </div>
          </div>

          <div class="egg-touch">
            <button type="button" class="egg-touch-button" aria-label="←" @click="game.moveLeft()">←</button>
            <button type="button" class="egg-touch-button" aria-label="↻" @click="game.rotate()">↻</button>
            <button type="button" class="egg-touch-button" aria-label="↓" @click="game.softDrop()">↓</button>
            <button type="button" class="egg-touch-button" aria-label="⤓" @click="game.hardDrop()">⤓</button>
          </div>

          <p class="egg-hint">{{ t("egg-controls") }}</p>
        </div>

        <div ref="frontRef" class="egg-envelope-front" aria-hidden="true"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.egg-enter-active,
.egg-leave-active {
  transition: opacity 0.35s ease-in-out;
}

.egg-enter-from,
.egg-leave-to {
  opacity: 0;
}

.egg {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-easter-egg);
  display: flex;
  align-items: center;
  justify-content: center;

  &-backdrop {
    position: absolute;
    inset: 0;
    background-color: rgb(45 42 36 / 72%);
    backdrop-filter: blur(6px);
  }

  &-close {
    position: absolute;
    top: var(--space-outer);
    right: var(--space-outer);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 15px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--color-background-400);
    --icon-color: var(--color-text-400);
    transition: transform 0.2s var(--ease-power2-out);

    @include mixins.hover {
      &:hover {
        transform: scale(1.08);
      }
    }

    &-icon {
      width: 100%;
    }
  }

  /* --- envelope: two pockets with the card sandwiched between them --- */

  &-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 900px;
  }

  &-envelope {
    &-back,
    &-front {
      position: absolute;
      bottom: -46px;
      left: 50%;
      width: 268px;
      height: 176px;
      margin-left: -134px;
      pointer-events: none;
      transform-style: preserve-3d;
    }

    &-back {
      z-index: 0;
      border-radius: var(--radius-sm);
      background-color: var(--color-beige-600);
      box-shadow: 0 18px 50px rgb(0 0 0 / 35%);
    }

    &-flap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 108px;
      transform-origin: top center;
      background-color: var(--color-beige-700);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }

    // drawn over the card, so the card looks like it slides out from inside
    &-front {
      z-index: 2;
      border-radius: var(--radius-sm);
      background-color: var(--color-beige-500);
      clip-path: polygon(0 0, 50% 42%, 100% 0, 100% 100%, 0 100%);
    }
  }

  /* --- game card --- */

  &-card {
    // shrinks with both axes so the whole card always fits on screen
    --cell: clamp(11px, min(calc((100vw - 88px) / 10), calc((100dvh - 300px) / 18)), 24px);

    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-md);
    border: var(--stroke-md) solid var(--color-grayscale-400);
    border-radius: var(--radius-lg);
    background-color: var(--color-background-400);
    box-shadow: 0 24px 70px rgb(0 0 0 / 35%);

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
    }

    &-title {
      font-size: var(--font-size-md);
      font-weight: 900;
      color: var(--color-text-400);
    }
  }

  &-next {
    display: grid;
    grid-template-columns: repeat(4, 8px);
    grid-auto-rows: 8px;
    gap: 1px;

    &-cell {
      border-radius: 1px;
      background-color: transparent;
    }
  }

  &-stats {
    display: flex;
    gap: var(--space-md);
  }

  &-stat {
    display: flex;
    flex-direction: column;

    &-label {
      font-size: var(--font-size-xxs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-text-300);
    }

    &-value {
      font-family: "ProFontWindows", monospace;
      font-size: var(--font-size-xl);
      line-height: 1;
      color: var(--color-text-400);
    }
  }

  &-board-wrapper {
    position: relative;
  }

  &-board {
    display: grid;
    grid-template-columns: repeat(10, var(--cell));
    grid-auto-rows: var(--cell);
    gap: 2px;
    padding: 6px;
    border-radius: var(--radius-sm);
    background-color: var(--color-beige-700);
  }

  &-cell {
    border-radius: 2px;
    background-color: rgb(0 0 0 / 5%);
    transition: background-color 0.08s linear;

    &-clearing {
      background-color: var(--color-white-400);
    }

    &-i {
      background-color: #34bfff;
    }
    &-o {
      background-color: #ffc107;
    }
    &-t {
      background-color: #a855f7;
    }
    &-s {
      background-color: #16a34a;
    }
    &-z {
      background-color: #e5484d;
    }
    &-j {
      background-color: #1f81f9;
    }
    &-l {
      background-color: #f97316;
    }
  }

  &-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    border-radius: var(--radius-sm);
    background-color: rgb(245 239 230 / 92%);

    &-copy {
      font-size: var(--font-size-lg);
      font-weight: 900;
      color: var(--color-text-400);
    }
  }

  &-button {
    padding: var(--space-xs) var(--space-lg);
    border: none;
    border-radius: 100px;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: 800;
    text-transform: uppercase;
    color: var(--color-accent-text-400, var(--color-white-400));
    background-color: var(--color-accent-400, var(--color-orange-400));
    transition: transform 0.15s var(--ease-power2-out);

    @include mixins.hover {
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  &-touch {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-xs);

    &-button {
      padding: var(--space-xs) 0;
      border: var(--stroke-md) solid var(--color-grayscale-400);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: var(--font-size-lg);
      line-height: 1;
      color: var(--color-text-400);
      background-color: transparent;

      &:active {
        background-color: var(--color-grayscale-400);
      }
    }

    // pointer users get the keyboard, so the pad only shows on touch
    @include mixins.hover {
      display: none;
    }
  }

  &-hint {
    font-size: var(--font-size-xxs);
    text-align: center;
    color: var(--color-text-300);

    @media (hover: none), (pointer: coarse) {
      display: none;
    }
  }
}
</style>
