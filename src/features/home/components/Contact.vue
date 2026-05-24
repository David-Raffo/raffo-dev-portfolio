<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import { locale } from "../../../i18n/store";
import Social from "../../../components/Social.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mottosByLocale: Record<string, string[]> = {
  es: [
    "Haciendo que la tecnología trabaje para las personas, y no al revés.",
    "La oratoria no es hablar bien, es lograr que las ideas se entiendan, se recuerden y se ejecuten.",
    "La productividad no está en hacer muchas cosas, sino en hacer las correctas en el momento adecuado.",
    "La IA no reemplaza el criterio humano, lo refuerza y amplifica.",
    "Delegar es el proceso de convertir confianza en rendimiento.",
  ],
  en: [
    "Making technology work for people, not the other way around.",
    "Oratory isn't about speaking well. It's about making ideas understood, remembered and acted upon.",
    "Productivity isn't about doing more things, it's about doing the right ones at the right time.",
    "AI doesn't replace human judgment. It reinforces and amplifies it.",
    "Delegation is the process of converting trust into performance.",
  ],
};

const contactElement = ref<HTMLElement | null>(null);
const mottoRef = ref<HTMLElement | null>(null);
const mottoTextRef = ref<HTMLElement | null>(null);
let mottoTrigger: ScrollTrigger | null = null;
let mottoInterval: ReturnType<typeof setInterval> | null = null;

const mottos = computed(() => mottosByLocale[locale.value ?? "es"] ?? mottosByLocale.es);
const mottoIndex = ref(0);
const currentMotto = computed(() => mottos.value[mottoIndex.value]);

const cycleMotto = () => {
  if (!mottoTextRef.value) return;
  gsap.to(mottoTextRef.value, {
    opacity: 0,
    duration: 0.8,
    onComplete: () => {
      mottoIndex.value = (mottoIndex.value + 1) % mottos.value.length;
      gsap.to(mottoTextRef.value, { opacity: 1, duration: 0.8 });
    },
  });
};

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }

  if (mottoRef.value) {
    gsap.set(mottoRef.value, { opacity: 0, scale: 0.6, transformOrigin: "top left" });
    mottoTrigger = ScrollTrigger.create({
      trigger: contactElement.value,
      start: "top 15%",
      onEnter: () => {
        gsap.to(mottoRef.value, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.8,
          onComplete: () => {
            mottoInterval = setInterval(cycleMotto, 6000);
          },
        });
      },
    });
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
  mottoTrigger?.kill();
  if (mottoInterval) clearInterval(mottoInterval);
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <Social variant="background" />
    </div>
    <div class="contact-motto" ref="mottoRef">
      <p ref="mottoTextRef">{{ currentMotto }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 6;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-motto {
    display: none;

    @include mixins.mq("md") {
      display: flex;
      align-items: flex-start;
      grid-column: 8 / 13;
      padding-top: var(--space-lg);

      p {
        position: relative;
        background: var(--color-background-400, var(--color-beige-400));
        border: var(--stroke-sm) solid currentColor;
        border-radius: var(--radius-md);
        padding: var(--space-sm) var(--space-md);
        font-size: var(--font-size-md);
        font-weight: 700;
        letter-spacing: 0.02em;
        max-width: 320px;

        &::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-radius: 50%;
          left: 14px;
          bottom: -12px;
          box-shadow:
            0px 0px 0 7px var(--color-background-400, var(--color-beige-400)),
            0px 0px 0 8px currentColor,
            -14px 14px 0 4px var(--color-background-400, var(--color-beige-400)),
            -14px 14px 0 5px currentColor,
            -26px 26px 0 2px var(--color-background-400, var(--color-beige-400)),
            -26px 26px 0 3px currentColor;
        }

        &::before {
          display: none;
        }
      }
    }

    @include mixins.mq("lg") {
      grid-column: 8 / 13;

      p {
        font-size: var(--font-size-lg);
        max-width: 360px;
      }
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }
}
</style>
