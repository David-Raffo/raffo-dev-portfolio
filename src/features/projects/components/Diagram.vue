<script setup lang="ts">
import { defineAsyncComponent } from "vue";

export type DiagramName = "freerouter-flow" | "video-timeline" | "color-grade" | "chat-demo" | "agents-hub";

export interface Props {
  name: DiagramName;
  caption?: string;
}

const props = defineProps<Props>();

const diagrams = {
  "freerouter-flow": defineAsyncComponent(() => import("./diagrams/FreeRouterFlow.vue")),
  "video-timeline": defineAsyncComponent(() => import("./diagrams/VideoTimeline.vue")),
  "color-grade": defineAsyncComponent(() => import("./diagrams/ColorGrade.vue")),
  "chat-demo": defineAsyncComponent(() => import("./diagrams/ChatDemo.vue")),
  "agents-hub": defineAsyncComponent(() => import("./diagrams/AgentsHub.vue")),
} as const satisfies Record<DiagramName, unknown>;
</script>

<template>
  <figure class="diagram">
    <div class="diagram-stage">
      <component :is="diagrams[props.name]" />
    </div>
    <figcaption v-if="props.caption" class="diagram-caption">
      <span class="diagram-caption-dot"></span>{{ props.caption }}
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.diagram {
  grid-column: 1 / 13;
  width: 100%;
  max-width: 1100px;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  @include mixins.mq("md") {
    grid-column: 2 / 12;
  }

  &-stage {
    position: relative;
    width: 100%;
    border-radius: var(--radius-lg);
    background-color: var(--color-background-300);
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    overflow: hidden;
  }

  &-caption {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-300);
    text-align: center;

    &-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--color-accent-400);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent-400) 25%, transparent);
      animation: diagram-caption-pulse 2s ease-in-out infinite;
    }
  }
}

@keyframes diagram-caption-pulse {
  50% {
    box-shadow: 0 0 0 7px color-mix(in srgb, var(--color-accent-400) 0%, transparent);
  }
}
</style>
