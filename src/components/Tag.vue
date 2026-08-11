<script setup lang="ts">
import { computed } from "vue";
import { tagLabels, type TagVariant } from "./tagVariants";

const props = defineProps<{
  variant: TagVariant;
}>();

const classes = computed(() => ["tag", `tag-variant-${props.variant}`]);
</script>

<template>
  <div :class="classes">
    <p class="tag-copy">{{ tagLabels[props.variant] }}</p>
  </div>
</template>

<style scoped lang="scss">
.tag {
  border-radius: var(--radius-md);
  padding: calc(var(--space-xxs) - var(--stroke-md)) calc(var(--space-sm  ) - var(--stroke-md));
  border: var(--stroke-md) solid transparent;

  &-copy {
    font-size: var(--font-size-xs);
    font-weight: 700;
  }

  &-variant {
    &-three {
      background-color: #ed9c55;
      color: #492708;
    }

    &-react {
      background-color: #61dafb;
      color: #0f2e36;
    }

    &-websockets {
      background-color: #2674a4;
      color: white;
    }

    &-redis {
      background-color: #ce4036;
      color: white;
    }

    &-html {
      background-color: #e34f26;
      color: white;
    }

    &-css {
      background-color: #1572b6;
      color: white;
    }

    &-javascript {
      background-color: #ffdf4f;
      color: #362d03;
    }

    &-node {
      background-color: #237d23;
      color: white;
    }

    &-next {
      background-color: white;
      color: black;
    }

    &-kubernetes {
      background-color: #326ce5;
      color: white;
    }

    &-postgresql {
      background-color: #2f6c92;
      color: white;
    }

    &-ogl {
      background-color: #0e5495;
      color: white;
    }

    &-glsl {
      background-color: #95630e;
      color: white;
    }

    &-docker {
      background-color: #2496ed;
      color: white;
    }

    &-wordpress {
      background-color: #21759b;
      color: white;
    }

    &-prestashop {
      background-color: #df0067;
      color: white;
    }

    &-shopify {
      background-color: #96bf48;
      color: white;
    }

    &-php {
      background-color: #777bb4;
      color: white;
    }

    &-seo {
      background-color: #f59e0b;
      color: white;
    }

    &-openrouter {
      background-color: #6366f1;
      color: white;
    }

    &-api {
      background-color: #059669;
      color: white;
    }

    &-python {
      background-color: #3776ab;
      color: white;
    }

    &-n8n {
      background-color: #ea4b71;
      color: white;
    }

    &-rag {
      background-color: #0d9488;
      color: white;
    }

    &-langgraph {
      background-color: #1a1a1a;
      color: white;
    }

    &-typescript {
      background-color: #3178c6;
      color: white;
    }

    &-pokeapi {
      background-color: #ef5350;
      color: white;
    }

    &-godot {
      background-color: #478cbf;
      color: white;
    }

    &-pixelart {
      background-color: #FFE082;
      color: #35016D;
    }

    &-aseprite {
      background-color: #7d4cdb;
      color: white;
    }

    &-gimp {
      background-color: #57595c;
      color: white;
    }

    &-gdscript {
      background-color: #478cbf;
      color: white;
    }
  }
}
</style>
