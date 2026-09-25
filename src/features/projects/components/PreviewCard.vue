<script setup lang="ts">
import Link from "../../../components/Link.vue";
import Notch from "../../../components/Notch.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonRound from "../../../components/ButtonRound.vue";
import { t } from "../../../i18n/utils/translate";
import { social } from "../../../content/social";
import Plus from "../../../components/icons/Plus.vue";

import type { ProjectPreview } from "../../../content/types";

const tlRef = ref<gsap.core.Timeline | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

const props = defineProps<{
  preview?: ProjectPreview;
  index?: number;
  featured?: boolean;
}>();

onMounted(async () => {
  if (!wrapperRef.value || ScrollTrigger.isInViewport(wrapperRef.value)) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
    },
  });
  tl.fromTo(wrapperRef.value, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);
  tl.fromTo(imageRef.value, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);

  tlRef.value = tl;
});

onUnmounted(() => {
  if (tlRef.value) {
    tlRef.value.kill();
    tlRef.value = null;
  }
});
</script>

<template>
  <Link
    :class="['preview-card', 'children-unclickable', props.featured && 'preview-card-featured']"
    :to="`/project/${props.preview.slug}`"
    :aria-label="t('switch-to-project', { project: props.preview.title })"
    data-cursor="arrow"
    data-sound="click"
    data-hoversound="hover"
    v-if="props.preview"
  >
    <div class="preview-card-top" ref="wrapperRef">
      <div class="preview-card-image-wrapper">
        <div class="preview-card-image-container">
          <img
            :src="props.preview.thumbnail"
            :alt="props.preview.title"
            loading="lazy"
            decoding="async"
            class="preview-card-image"
            ref="imageRef"
          />
          <span class="preview-card-shine"></span>
        </div>
        <span v-if="props.preview.category" class="preview-card-category">{{ props.preview.category }}</span>
      </div>
      <div class="preview-card-overlay">
        <div class="preview-card-edge">
          <ButtonRound class="preview-card-button" variant="accent" renderAs="div">
            <ArrowRightLong class="preview-card-button-arrow" />
          </ButtonRound>
        </div>
        <Notch class="preview-card-notch preview-card-notch-left" />
        <Notch class="preview-card-notch preview-card-notch-right" />
      </div>
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">
          <span v-if="props.index !== undefined" class="preview-card-index">{{
            String(props.index + 1).padStart(2, "0")
          }}</span>
          {{ props.preview.title }}
        </h3>
        <p class="preview-card-description">{{ props.preview.description }}</p>
        <span v-if="props.featured" class="preview-card-cta">
          {{ t("view-project") }}
          <ArrowRightLong class="preview-card-cta-arrow" />
        </span>
      </div>
    </div>
  </Link>

  <Link
    v-else
    class="preview-card children-unclickable"
    data-cursor="arrow-external"
    data-hoversound="hover"
    external
    :href="social[0].url"
  >
    <div class="preview-card-top preview-card-top-empty">
      <Plus class="preview-card-top-empty-icon" />
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">{{ t("start-a-new-project") }}</h3>
      </div>
    </div>
  </Link>
</template>

<style scoped lang="scss">
.preview-card {
  --hover: 0;
  position: relative;
  border-radius: var(--radius-xl);
  z-index: var(--z-index-layout);

  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    background-color: var(--color-grayscale-400);
    border-radius: var(--radius-xl);
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease-in-out;
  }

  @include mixins.hover {
    &:hover {
      --hover: 1;

      &::after {
        opacity: 1;
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-top: var(--space-xs);
  }

  &-cta {
    display: none;
  }

  &-featured {
    @include mixins.mq("md") {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
      align-items: center;
      gap: var(--space-xl);

      .preview-card-content {
        padding-top: 0;
        padding-right: var(--space-md);
      }

      .preview-card-copys {
        gap: var(--space-sm);
      }

      .preview-card-title {
        font-size: var(--font-size-title-sm);
        line-height: var(--line-height-title);
      }

      .preview-card-description {
        font-size: var(--font-size-lg);
      }

      .preview-card-cta {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        margin-top: var(--space-sm);
        font-size: var(--font-size-sm);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-text-400);
        --icon-color: var(--color-text-400);

        &-arrow {
          width: 22px;
          transition: transform 0.2s var(--ease-smooth);
          transform: translateX(calc(var(--hover) * 6px));
        }
      }
    }
  }

  &-overlay {
    @include mixins.hover {
      display: none;
    }
  }

  &-notch {
    position: absolute;
    color: var(--color-beige-400);
    --icon-color: var(--color-beige-400);
    transform: scale(-1) rotate(90deg);
    height: var(--radius-lg);

    &-left {
      bottom: 0;
      right: 50px;
    }

    &-right {
      bottom: 50px;
      right: 0;
    }
  }

  &-edge {
    position: absolute;
    bottom: -1px;
    right: -1px;
    background-color: var(--color-beige-400);
    padding-left: 6px;
    padding-top: 6px;
    border-radius: 32px 0 0 0;
    padding-right: 1px;
    padding-bottom: 1px;
  }

  &-button {
    &-arrow {
      transition: transform 0.1s ease-in-out;
      width: 100%;
      transform: rotate(calc(var(--hover) * -45deg));
    }
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-container {
      position: relative;
      overflow: hidden;
      transition: transform 0.4s var(--ease-smooth);
      transform: scale(calc(1 + var(--hover) * 0.03));
      aspect-ratio: 16/9;
    }

    &-wrapper {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background-color: var(--color-beige-500);
    }
  }

  &-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.35) 50%, transparent 65%);
    transform: translateX(-100%);
    pointer-events: none;
  }

  @include mixins.hover {
    &:hover &-shine {
      transform: translateX(100%);
      transition: transform 0.9s var(--ease-smooth);
    }
  }

  &-category {
    position: absolute;
    top: var(--space-sm);
    left: var(--space-sm);
    padding: 4px 12px;
    border-radius: 999px;
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.04em;
    color: white;
    background-color: rgba(20, 16, 12, 0.62);
    backdrop-filter: blur(8px);
    pointer-events: none;
  }

  &-index {
    display: inline-block;
    margin-right: 6px;
    font-size: 0.7em;
    font-weight: 900;
    letter-spacing: 0.08em;
    vertical-align: 0.2em;
    color: var(--color-text-300);
  }

  &-top {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;

    &-empty {
      border: 4px dashed var(--color-grayscale-500);
      border-radius: var(--radius-lg);
      background-color: var(--color-grayscale-400);
      display: flex;
      align-items: center;
      justify-content: center;

      &-icon {
        width: var(--icon-size-lg);
        color: var(--color-text-300);
        --icon-color: var(--color-text-300);
        --stroke-width: 4px;
      }
    }
  }

  &-copys {
    display: flex;
    flex-direction: column;
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-text-400);
  }

  &-description {
    font-size: var(--font-size-md);
    color: var(--color-text-300);
    font-weight: 500;
  }
}
</style>
