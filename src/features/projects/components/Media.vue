<script setup lang="ts">
import { computed, ref, onMounted, watchEffect } from "vue";
import gsap from "gsap";
import Notch from "../../../components/Notch.vue";
import { isTouch } from "../../../composables/useAgent";

const wrapperRef = ref<HTMLDivElement | null>(null);
const mediaRef = ref<HTMLVideoElement | HTMLImageElement | null>(null);
const mediaContentRef = ref<HTMLDivElement | null>(null);
const isMounted = ref(false);

export interface Props {
  type: "image" | "video" | "youtube";
  src: string;
  alt?: string;
  caption?: string;
  captionAlign?: "left" | "right";
  index: number;
}

const props = defineProps<Props>();

const wrapperClasses = computed(() => {
  return {
    "project-media": true,
  };
});

watchEffect(async (onInvalidate) => {
  if (!wrapperRef.value) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
      end: "bottom bottom",
      toggleActions: "play none none reset",
    },
  });
  tl.fromTo(mediaContentRef.value, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);
  tl.fromTo(mediaRef.value, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);

  onInvalidate(() => {
    tl.kill();
    gsap.set(mediaContentRef.value, { scale: 1 });
    gsap.set(mediaRef.value, { scale: 1 });
  });
});

const MAGNIFIER_SIZE = 240;
const ZOOM = 1.6;

const magnifierVisible = ref(false);
const magnifierStyle = ref({});

const handleMouseMove = (e: MouseEvent) => {
  if (props.type !== "image" || isTouch.value) return;
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const bgX = -(x * ZOOM - MAGNIFIER_SIZE / 2);
  const bgY = -(y * ZOOM - MAGNIFIER_SIZE / 2);

  magnifierStyle.value = {
    left: `${x - MAGNIFIER_SIZE / 2}px`,
    top: `${y - MAGNIFIER_SIZE / 2}px`,
    backgroundImage: `url(${props.src})`,
    backgroundSize: `${rect.width * ZOOM}px ${rect.height * ZOOM}px`,
    backgroundPosition: `${bgX}px ${bgY}px`,
  };
};

const handleMouseEnter = (e: MouseEvent) => {
  if (props.type !== "image" || isTouch.value) return;
  magnifierVisible.value = true;
  handleMouseMove(e);
};

const handleMouseLeave = () => {
  if (props.type !== "image" || isTouch.value) return;
  magnifierVisible.value = false;
};

onMounted(async () => {
  isMounted.value = true;
});
</script>

<template>
  <div :class="wrapperClasses" ref="wrapperRef">
    <div class="project-media-content" ref="mediaContentRef" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove">
      <img
        v-if="props.type === 'image'"
        :src="props.src"
        :alt="props.alt"
        loading="lazy"
        fetchpriority="high"
        class="project-media-image"
        ref="mediaRef"
      />
      <video
        v-else-if="props.type === 'video'"
        :src="props.src"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        class="project-media-video"
        ref="mediaRef"
      >
        <source :src="props.src" type="video/mp4" />
      </video>
      <iframe
        v-else-if="props.type === 'youtube'"
        :src="`https://www.youtube.com/embed/${props.src}?rel=0`"
        class="project-media-youtube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
      />
      <div v-if="magnifierVisible && props.type === 'image'" class="project-media-magnifier" :style="magnifierStyle"></div>
    </div>
    <div :class="['project-media-caption', props.captionAlign === 'left' && 'project-media-caption-left']" v-if="props.caption">
      <Notch class="project-media-caption-notch project-media-caption-notch-left" />
      <Notch class="project-media-caption-notch project-media-caption-notch-top" />
      <p class="project-media-caption-copy">{{ props.caption }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-media {
  width: 100%;
  height: 100%;
  grid-column: 1 / 13;
  max-width: 900px;
  justify-self: center;
  position: relative;
  aspect-ratio: 16 / 9;

  @include mixins.mq("md") {
    grid-column: 2 / 12;
  }

  @include mixins.mq("lg") {
    grid-column: 3 / 11;
  }

  &-caption {
    position: absolute;
    bottom: -1px;
    right: -1px;
    background-color: var(--color-background-400);
    padding: var(--space-xxs) var(--space-sm);
    border-radius: var(--radius-md) 0 0 0;

    @include mixins.mq("md") {
      padding: var(--space-xxs) var(--space-sm);
    }

    @include mixins.mq("lg") {
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--radius-lg) 0 0 0;
    }

    &-notch {
      position: absolute;
      color: var(--color-background-400);
      --icon-color: var(--color-background-400);
      width: var(--radius-md);

      @include mixins.mq("md") {
        width: var(--radius-lg);
      }

      &-left {
        left: 0;
        bottom: 0;
        transform: translate(-100%, 0) scale(-1) rotate(90deg);
      }

      &-top {
        top: 0;
        right: 0;
        transform: translate(0, -100%) scale(-1) rotate(90deg);
      }
    }

    &-left {
      right: auto;
      left: -1px;
      border-radius: 0 var(--radius-md) 0 0;

      @include mixins.mq("lg") {
        border-radius: 0 var(--radius-lg) 0 0;
      }

      .project-media-caption-notch-left {
        left: auto;
        right: 0;
        transform: translate(100%, 0) rotate(90deg);
      }

      .project-media-caption-notch-top {
        top: 0;
        right: auto;
        left: 0;
        transform: translate(0, -100%) rotate(90deg);
      }
    }

    &-copy {
      font-size: var(--font-size-sm);
      font-weight: 700;

      @include mixins.mq("md") {
        font-size: var(--font-size-md);
      }
    }
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-youtube {
    width: 100%;
    height: 100%;
    border: none;
  }

  &-content {
    overflow: hidden;
    border-radius: var(--radius-lg);
    background-color: var(--color-background-300);
    width: 100%;
    height: 100%;
    position: relative;
    cursor: none;
  }

  &-magnifier {
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    border: 2px solid currentColor;
    pointer-events: none;
    z-index: 10;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    background-repeat: no-repeat;
  }
}
</style>
