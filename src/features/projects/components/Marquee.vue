<script setup lang="ts">
import { computed } from "vue";

export interface MarqueeItem {
  src: string;
  label: string;
}

export interface Props {
  items: MarqueeItem[];
}

const props = defineProps<Props>();

const rows = computed(() => {
  const half = Math.ceil(props.items.length / 2);
  return [props.items.slice(0, half), props.items.slice(half)];
});
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-tilt">
      <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        :class="['marquee-row', rowIndex % 2 && 'marquee-row-reverse']"
      >
        <div class="marquee-track">
          <template v-for="copy in 2" :key="copy">
            <figure v-for="item in row" :key="`${copy}-${item.label}`" class="marquee-card">
              <div class="marquee-card-bar">
                <span class="marquee-card-dots"><i></i><i></i><i></i></span>
                <span class="marquee-card-label">{{ item.label }}</span>
              </div>
              <img :src="item.src" alt="" decoding="async" class="marquee-card-image" />
            </figure>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  grid-column: 1 / 13;
  width: calc(100% + var(--space-outer) * 2);
  margin: 0 calc(var(--space-outer) * -1);
  overflow: hidden;
  padding: var(--space-xxl) 0;
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);

  &-tilt {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    transform: rotate(-3deg) scale(1.06);

    @include mixins.mq("md") {
      gap: var(--space-lg);
    }
  }

  &-row {
    display: flex;
    overflow: hidden;

    &-reverse .marquee-track {
      animation-direction: reverse;
      animation-duration: 60s;
    }

    @include mixins.hover {
      &:hover .marquee-track {
        animation-play-state: paused;
      }
    }
  }

  &-track {
    display: flex;
    gap: var(--space-md);
    padding-right: var(--space-md);
    width: max-content;
    animation: marquee-scroll 48s linear infinite;

    @include mixins.mq("md") {
      gap: var(--space-lg);
      padding-right: var(--space-lg);
    }
  }

  &-card {
    flex: none;
    width: 260px;
    overflow: hidden;
    border-radius: var(--radius-md);
    background-color: var(--color-background-300);
    border: var(--stroke-sm) solid var(--color-grayscale-500);
    box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s var(--ease-smooth);

    @include mixins.mq("md") {
      width: 380px;
      border-radius: var(--radius-lg);
    }

    @include mixins.hover {
      &:hover {
        transform: translateY(-6px) scale(1.02);
      }
    }

    &-bar {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      height: 26px;
      padding: 0 var(--space-sm);
      border-bottom: var(--stroke-sm) solid var(--color-grayscale-400);
    }

    &-dots {
      display: flex;
      gap: 5px;

      i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: var(--color-grayscale-500);
      }
    }

    &-label {
      font-size: var(--font-size-xxs);
      font-weight: 700;
      color: var(--color-text-300);
      white-space: nowrap;
    }

    &-image {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      object-position: top center;
    }
  }
}

@keyframes marquee-scroll {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
