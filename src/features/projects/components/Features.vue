<script setup lang="ts">
import { ref } from "vue";
import FeatureIcon, { type FeatureIconName } from "./FeatureIcon.vue";
import { useReveal } from "../composables/useLoop";

export interface FeatureItem {
  icon: FeatureIconName;
  title: string;
  text: string;
}

export interface Props {
  items: FeatureItem[];
  columns?: 2 | 3;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);

useReveal(rootRef, ".features-item");

const handleMove = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
};
</script>

<template>
  <div ref="rootRef" :class="['features', `features-columns-${props.columns ?? 3}`]">
    <article v-for="item in props.items" :key="item.title" class="features-item" @mousemove="handleMove">
      <div class="features-icon">
        <FeatureIcon :name="item.icon" />
      </div>
      <h3 class="features-title">{{ item.title }}</h3>
      <p class="features-text" v-html="item.text"></p>
    </article>
  </div>
</template>

<style scoped lang="scss">
.features {
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
  width: 100%;
  max-width: 1100px;
  justify-self: center;

  @include mixins.mq("md") {
    grid-column: 2 / 12;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }

  &-columns-3 {
    @include mixins.mq("lg") {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &-item {
    --mx: 50%;
    --my: 0%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    background-color: var(--color-background-300);
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;

    @include mixins.mq("md") {
      padding: var(--space-lg);
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(
        320px circle at var(--mx) var(--my),
        color-mix(in srgb, var(--color-accent-400) 14%, transparent),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }

    @include mixins.hover {
      &:hover {
        border-color: color-mix(in srgb, var(--color-accent-400) 55%, transparent);
        transform: translateY(-2px);

        &::before {
          opacity: 1;
        }

        .features-icon {
          transform: rotate(-6deg) scale(1.06);
        }
      }
    }
  }

  &-icon {
    width: 44px;
    height: 44px;
    padding: 10px;
    margin-bottom: var(--space-xs);
    border-radius: var(--radius-md);
    color: var(--color-accent-400);
    background-color: color-mix(in srgb, var(--color-accent-400) 14%, transparent);
    transition: transform 0.25s var(--ease-smooth);
  }

  &-title {
    position: relative;
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--color-text-400);
    line-height: var(--line-height-title);
  }

  &-text {
    position: relative;
    font-size: var(--font-size-sm);
    color: var(--color-text-300);
    line-height: 1.45;

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }

    :deep(code) {
      font-size: 0.88em;
      padding: 0 4px;
      border-radius: 4px;
      background-color: var(--color-grayscale-400);
      color: var(--color-text-400);
    }
  }
}
</style>
