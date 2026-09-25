<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import gsap from "gsap";
import { locale } from "../../../i18n/store";
import { prefersReducedMotion } from "../composables/useLoop";

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface Props {
  items: StatItem[];
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const shown = ref<number[]>(props.items.map((item) => item.value));

const format = (value: number, decimals = 0) =>
  value.toLocaleString(locale.value ?? "en", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!rootRef.value || prefersReducedMotion()) return;

  ctx = gsap.context(() => {
    const counters = props.items.map(() => ({ v: 0 }));
    shown.value = counters.map(() => 0);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: rootRef.value, start: "top 85%", toggleActions: "play none none reset" },
    });

    tl.fromTo(
      ".stats-item",
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      0,
    );

    counters.forEach((counter, index) => {
      tl.to(
        counter,
        {
          v: props.items[index]!.value,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            shown.value[index] = counter.v;
          },
        },
        0.1 + index * 0.08,
      );
    });
  }, rootRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
  ctx = null;
});
</script>

<template>
  <div ref="rootRef" class="stats" :style="{ '--stats-count': props.items.length }">
    <div v-for="(item, index) in props.items" :key="item.label" class="stats-item">
      <p class="stats-value">
        <span v-if="item.prefix" class="stats-affix">{{ item.prefix }}</span
        >{{ format(shown[index] ?? item.value, item.decimals)
        }}<span v-if="item.suffix" class="stats-affix">{{ item.suffix }}</span>
      </p>
      <p class="stats-label">{{ item.label }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
  width: 100%;
  max-width: 1100px;
  justify-self: center;

  @include mixins.mq("md") {
    grid-column: 2 / 12;
    grid-template-columns: repeat(var(--stats-count), 1fr);
    gap: var(--space-md);
  }

  &-item {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-xs);
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    background-color: var(--color-background-300);
    border: var(--stroke-sm) solid var(--color-grayscale-400);

    @include mixins.mq("md") {
      padding: var(--space-lg) var(--space-md);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: var(--space-md);
      width: 32px;
      height: 3px;
      border-radius: 0 0 3px 3px;
      background-color: var(--color-accent-400);
    }
  }

  &-value {
    font-size: var(--font-size-title-sm);
    font-weight: 900;
    line-height: 1;
    color: var(--color-text-400);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;

    @include mixins.mq("lg") {
      font-size: var(--font-size-title-md);
    }
  }

  &-affix {
    color: var(--color-accent-400);
  }

  &-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-300);
    line-height: var(--line-height-copy);

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }
  }
}
</style>
