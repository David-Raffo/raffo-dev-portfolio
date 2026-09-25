<script setup lang="ts">
import { ref } from "vue";
import { useReveal } from "../composables/useLoop";

export interface Props {
  eyebrow?: string;
  title: string;
  text?: string;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);

useReveal(rootRef, ".heading-reveal");
</script>

<template>
  <header ref="rootRef" class="heading">
    <p v-if="props.eyebrow" class="heading-eyebrow heading-reveal">
      <span class="heading-eyebrow-line"></span>{{ props.eyebrow }}
    </p>
    <h2 class="heading-title heading-reveal" v-html="props.title"></h2>
    <p v-if="props.text" class="heading-text heading-reveal" v-html="props.text"></p>
  </header>
</template>

<style scoped lang="scss">
.heading {
  grid-column: 1 / 13;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
  padding-top: var(--space-xl);

  @include mixins.mq("md") {
    grid-column: 3 / 11;
    padding-top: var(--space-xxxl);
  }

  @include mixins.mq("lg") {
    grid-column: 4 / 10;
  }

  &-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-accent-400);

    &-line {
      width: 24px;
      height: 2px;
      border-radius: 2px;
      background-color: currentColor;
    }
  }

  &-title {
    font-size: var(--font-size-title-sm);
    line-height: var(--line-height-title);
    font-weight: 900;
    color: var(--color-text-400);
    text-wrap: balance;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-md);
    }

    :deep(em) {
      font-style: normal;
      color: var(--color-accent-400);
    }
  }

  &-text {
    color: var(--color-text-300);
    line-height: var(--line-height-copy);
    font-size: var(--font-size-md);
    max-width: 60ch;
    text-wrap: pretty;

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }

    :deep(code) {
      font-size: 0.9em;
      padding: 1px 6px;
      border-radius: var(--radius-sm);
      background-color: var(--color-grayscale-400);
      color: var(--color-text-400);
    }
  }
}
</style>
