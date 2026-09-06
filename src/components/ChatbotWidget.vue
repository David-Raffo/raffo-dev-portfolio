<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, shallowRef, watch } from "vue";
import Robot from "./icons/Robot.vue";
import X from "./icons/X.vue";
import { t } from "../i18n/utils/translate";
import { locale } from "../i18n/store";
import { preloaderVisible } from "../composables/usePreloader";

const WEBHOOK_URL = "https://n8n.raffo.dev/webhook/abe098fb-3fc4-4ca3-bf58-3fc49d28fae6/chat";

type ChatApp = { unmount: () => void };

const isOpen = ref(false);
const isLoading = ref(false);
const hasFailed = ref(false);
const toggleRef = ref<HTMLButtonElement | null>(null);
const mountRef = ref<HTMLElement | null>(null);
const chatApp = shallowRef<ChatApp | null>(null);

const mountChat = async () => {
  if (chatApp.value || isLoading.value) return;

  isLoading.value = true;
  hasFailed.value = false;

  try {
    // pulled in on the first open only, so none of it lands in the initial bundle
    const [{ createChat }] = await Promise.all([import("@n8n/chat"), import("@n8n/chat/style.css")]);

    await nextTick();
    if (!mountRef.value) return;

    chatApp.value = createChat({
      webhookUrl: WEBHOOK_URL,
      target: mountRef.value,
      mode: "fullscreen",
      showWelcomeScreen: false,
      initialMessages: [t("chat-greeting")],
      i18n: {
        // the package only accepts "en" as a language key, so the strings for the
        // active locale go in under that key
        en: {
          title: "",
          subtitle: "",
          footer: "",
          getStarted: "",
          inputPlaceholder: t("chat-placeholder"),
          closeButtonTooltip: t("chat-close"),
        },
      },
    });
  } catch {
    hasFailed.value = true;
  } finally {
    isLoading.value = false;
  }
};

const destroyChat = () => {
  chatApp.value?.unmount();
  chatApp.value = null;
};

const open = () => {
  isOpen.value = true;
  mountChat();
};

const close = () => {
  isOpen.value = false;
  toggleRef.value?.focus();
};

const toggle = () => (isOpen.value ? close() : open());

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isOpen.value) close();
};

watch(isOpen, (value) => {
  if (value) {
    window.addEventListener("keydown", handleKeydown);
  } else {
    window.removeEventListener("keydown", handleKeydown);
  }
});

// the chat bakes its strings in at creation time, so a language switch needs a rebuild
watch(locale, () => {
  if (!chatApp.value) return;
  destroyChat();
  if (isOpen.value) mountChat();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  destroyChat();
});
</script>

<template>
  <Transition name="chatbot">
    <div v-if="!preloaderVisible" class="chatbot">
      <div class="chatbot-panel" :class="{ 'chatbot-panel-open': isOpen }" :inert="!isOpen" :aria-hidden="!isOpen">
        <div class="chatbot-panel-header">
          <Robot class="chatbot-panel-header-icon" />
          <p class="chatbot-panel-header-title">{{ t("chat-title") }}</p>
          <button
            type="button"
            class="chatbot-panel-header-close"
            :aria-label="t('chat-close')"
            data-sound="click"
            data-hoversound="hover"
            @click="close"
          >
            <X class="chatbot-panel-header-close-icon" />
          </button>
        </div>

        <div class="chatbot-panel-body">
          <div ref="mountRef" class="chatbot-panel-mount"></div>

          <div v-if="isLoading || hasFailed" class="chatbot-panel-state">
            <p class="chatbot-panel-state-copy">{{ hasFailed ? t("chat-error") : t("chat-loading") }}</p>
            <button
              v-if="hasFailed"
              type="button"
              class="chatbot-panel-state-retry"
              data-sound="click"
              data-hoversound="hover"
              @click="mountChat"
            >
              {{ t("chat-retry") }}
            </button>
          </div>
        </div>
      </div>

      <button
        ref="toggleRef"
        type="button"
        class="chatbot-toggle"
        :class="{ 'chatbot-toggle-open': isOpen }"
        :aria-label="isOpen ? t('chat-close') : t('chat-open')"
        :aria-expanded="isOpen"
        data-sound="click"
        data-hoversound="hover"
        @click="toggle"
      >
        <Robot class="chatbot-toggle-icon" />
      </button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.chatbot-enter-active,
.chatbot-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.chatbot-enter-from,
.chatbot-leave-to {
  opacity: 0;
}

.chatbot {
  position: fixed;
  right: var(--space-outer);
  bottom: var(--space-outer);
  z-index: var(--z-index-chatbot);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-xs);

  &-toggle {
    position: relative;
    width: 58px;
    height: 58px;
    padding: 13px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--color-text-400);
    --icon-color: var(--color-background-400);
    box-shadow: 0 6px 20px rgb(0 0 0 / 18%);
    transition:
      transform 0.2s var(--ease-power2-out),
      background-color 0.2s ease-in-out;

    @include mixins.hover {
      &:hover {
        transform: scale(1.08);
        background-color: var(--color-accent-400, var(--color-orange-400));
        --icon-color: var(--color-accent-text-400, var(--color-white-400));
      }
    }

    &:active {
      transform: scale(0.96);
    }

    &-icon {
      width: 100%;
      height: 100%;
      --stroke-width: var(--stroke-lg);
      transition:
        transform 0.25s var(--ease-power2-out),
        opacity 0.25s ease-in-out;
    }

    // the robot's antenna blinks, just enough to catch the eye
    :deep(.chatbot-antenna) {
      animation: chatbot-blink 2.4s var(--ease-smooth) infinite;
    }

    &-open &-icon {
      transform: scale(0.86);
      opacity: 0.55;
    }
  }

  @keyframes chatbot-blink {
    0%,
    70%,
    100% {
      opacity: 1;
    }
    80%,
    90% {
      opacity: 0.2;
    }
  }

  &-panel {
    display: flex;
    flex-direction: column;
    width: min(calc(var(--svw) * 100 - var(--space-outer) * 2), 384px);
    height: min(calc(var(--svh) * 100 - var(--space-outer) * 2 - 74px), 560px);
    overflow: hidden;
    border: var(--stroke-md) solid var(--color-grayscale-400);
    border-radius: var(--radius-lg);
    background-color: var(--color-background-400);
    box-shadow: 0 12px 40px rgb(0 0 0 / 18%);
    transform-origin: bottom right;
    transform: translateY(12px) scale(0.96);
    opacity: 0;
    visibility: hidden;
    transition:
      transform 0.28s var(--ease-power2-out),
      opacity 0.28s ease-in-out,
      visibility 0.28s;

    &-open {
      transform: translateY(0) scale(1);
      opacity: 1;
      visibility: visible;
    }

    &-header {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      border-bottom: var(--stroke-md) solid var(--color-grayscale-400);
      color: var(--color-text-400);
      --icon-color: var(--color-text-400);

      &-icon {
        width: var(--icon-size-sm);
        flex-shrink: 0;
      }

      &-title {
        flex: 1;
        font-size: var(--font-size-sm);
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        padding: 7px;
        flex-shrink: 0;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        background-color: transparent;
        transition: background-color 0.15s ease-in-out;

        @include mixins.hover {
          &:hover {
            background-color: var(--color-grayscale-400);
          }
        }

        &-icon {
          width: 100%;
        }
      }
    }

    &-body {
      position: relative;
      flex: 1;
      min-height: 0;
    }

    &-mount {
      width: 100%;
      height: 100%;

      // theme the embedded chat with the portfolio palette
      --chat--color--primary: var(--color-text-400);
      --chat--color--primary-shade-50: var(--color-text-300);
      --chat--color--primary--shade-100: var(--color-text-300);
      --chat--color--secondary: var(--color-text-400);
      --chat--color-white: var(--color-background-400);
      --chat--color-light: var(--color-beige-500);
      --chat--color-light-shade-50: var(--color-beige-600);
      --chat--color-light-shade-100: var(--color-grayscale-400);
      --chat--color-medium: var(--color-grayscale-500);
      --chat--color-dark: var(--color-text-400);
      --chat--font-family: "Urbanist", sans-serif;
      --chat--body--background: var(--color-background-400);
      --chat--header-height: 0;
      --chat--header--padding: 0;
      --chat--message--font-size: var(--font-size-sm);
      --chat--message--border-radius: var(--radius-md);
      --chat--message--bot--background: var(--color-beige-600);
      --chat--message--bot--color: var(--color-text-400);
      --chat--message--user--background: var(--color-text-400);
      --chat--message--user--color: var(--color-background-400);
      --chat--input--font-size: var(--font-size-sm);
      --chat--input--background: var(--color-background-400);
      --chat--input--text-color: var(--color-text-400);
      --chat--input--border: var(--stroke-md) solid var(--color-grayscale-400);
      --chat--input--send--button--background: transparent;
      --chat--input--send--button--color: var(--color-text-400);
      --chat--input--send--button--background-hover: transparent;
      --chat--input--send--button--color-hover: var(--color-accent-400, var(--color-orange-400));
      --chat--textarea--max-height: 120px;
    }

    &-state {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      padding: var(--space-md);
      text-align: center;
      background-color: var(--color-background-400);

      &-copy {
        font-size: var(--font-size-sm);
        color: var(--color-text-300);
      }

      &-retry {
        border: var(--stroke-md) solid var(--color-grayscale-400);
        border-radius: 100px;
        padding: var(--space-xxs) var(--space-md);
        font-size: var(--font-size-xs);
        font-weight: 800;
        text-transform: uppercase;
        cursor: pointer;
        color: var(--color-text-400);
        background-color: transparent;
        transition:
          background-color 0.15s ease-in-out,
          color 0.15s ease-in-out;

        @include mixins.hover {
          &:hover {
            background-color: var(--color-text-400);
            color: var(--color-background-400);
          }
        }
      }
    }
  }
}
</style>
