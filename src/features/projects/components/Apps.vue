<script setup lang="ts">
import { ref } from "vue";
import Tag from "../../../components/Tag.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";
import Github from "../../../components/icons/Github.vue";
import { t } from "../../../i18n/utils/translate";
import { useReveal } from "../composables/useLoop";

import type { TagVariant } from "../../../components/tagVariants";

export interface AppItem {
  title: string;
  kicker: string;
  description: string;
  image: string;
  alt: string;
  tags: TagVariant[];
  live?: string;
  source?: string;
  note?: string;
}

export interface Props {
  items: AppItem[];
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);

useReveal(rootRef, ".apps-item", { stagger: 0.12 });
</script>

<template>
  <div ref="rootRef" class="apps">
    <article v-for="(item, index) in props.items" :key="item.title" class="apps-item">
      <div class="apps-image">
        <img :src="item.image" :alt="item.alt" loading="lazy" decoding="async" />
        <span class="apps-index">{{ String(index + 1).padStart(2, "0") }}</span>
      </div>
      <div class="apps-body">
        <p class="apps-kicker">{{ item.kicker }}</p>
        <h3 class="apps-title">{{ item.title }}</h3>
        <p class="apps-description" v-html="item.description"></p>
        <div class="apps-tags">
          <Tag v-for="tag in item.tags" :key="tag" :variant="tag" />
        </div>
        <div class="apps-links">
          <a
            v-if="item.live"
            :href="item.live"
            target="_blank"
            rel="noopener noreferrer"
            class="apps-link apps-link-primary"
            data-hoversound="hover"
            data-sound="click"
          >
            {{ t("live-view") }}
            <ArrowRight class="apps-link-icon" />
          </a>
          <a
            v-if="item.source"
            :href="item.source"
            target="_blank"
            rel="noopener noreferrer"
            class="apps-link"
            data-hoversound="hover"
            data-sound="click"
          >
            <Github class="apps-link-icon" />
            {{ t("source-code") }}
          </a>
          <span v-if="item.note" class="apps-note">{{ item.note }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.apps {
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  width: 100%;
  max-width: 1100px;
  justify-self: center;

  @include mixins.mq("md") {
    grid-column: 2 / 12;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  &-item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-xl);
    background-color: var(--color-background-300);
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    transition:
      transform 0.3s var(--ease-smooth),
      box-shadow 0.3s var(--ease-smooth);

    @include mixins.hover {
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 24px 48px -28px color-mix(in srgb, var(--color-accent-400) 60%, transparent);

        .apps-image img {
          transform: scale(1.04);
        }
      }
    }
  }

  &-image {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: var(--color-grayscale-400);
    border-bottom: var(--stroke-sm) solid var(--color-grayscale-400);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transition: transform 0.6s var(--ease-smooth);
    }
  }

  &-index {
    position: absolute;
    bottom: var(--space-sm);
    left: var(--space-sm);
    padding: 2px 10px;
    border-radius: 999px;
    font-size: var(--font-size-xs);
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--color-accent-text-400);
    background-color: var(--color-accent-400);
  }

  &-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md);
    flex: 1;

    @include mixins.mq("md") {
      padding: var(--space-lg);
    }
  }

  &-kicker {
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-accent-400);
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 900;
    line-height: var(--line-height-title);
    color: var(--color-text-400);
  }

  &-description {
    color: var(--color-text-300);
    line-height: 1.45;
    font-size: var(--font-size-sm);

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: var(--space-xs);
  }

  &-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-xs);
    margin-top: auto;
    padding-top: var(--space-md);
  }

  &-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 38px;
    padding: 0 var(--space-md);
    border-radius: 999px;
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-400);
    --icon-color: var(--color-text-400);
    border: var(--stroke-md) solid var(--color-grayscale-500);
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &-icon {
      width: 14px;
      height: 14px;
      --stroke-width: 2.5px;
    }

    &-primary {
      color: var(--color-accent-text-400);
      --icon-color: var(--color-accent-text-400);
      background-color: var(--color-accent-400);
      border-color: var(--color-accent-400);
    }

    @include mixins.hover {
      &:hover {
        background-color: var(--color-hover);
        border-color: var(--color-hover);
        color: var(--color-hover-text, white);
        --icon-color: var(--color-hover-text, white);
      }
    }
  }

  &-note {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-300);
  }
}
</style>
