<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, shallowRef, watch } from "vue";
import Robot from "./icons/Robot.vue";
import X from "./icons/X.vue";
import { t } from "../i18n/utils/translate";
import { locale } from "../i18n/store";
import { preloaderVisible } from "../composables/usePreloader";

const WEBHOOK_URL = "https://n8n.raffo.dev/webhook/abe098fb-3fc4-4ca3-bf58-3fc49d28fae6/chat";

const NUDGE_DELAY = 3000;
const NUDGE_DURATION = 9000;
// breathing room left above an incoming message when it is anchored
const MESSAGE_TOP_GAP = 12;

type ChatApp = { unmount: () => void };

const isOpen = ref(false);
const isLoading = ref(false);
const hasFailed = ref(false);
const showNudge = ref(false);
const hasInteracted = ref(false);
const toggleRef = ref<HTMLButtonElement | null>(null);
const mountRef = ref<HTMLElement | null>(null);
const chatApp = shallowRef<ChatApp | null>(null);

let messageObserver: MutationObserver | null = null;

/* --- chat --- */

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

    await nextTick();
    anchorIncomingMessages();
  } catch {
    hasFailed.value = true;
  } finally {
    isLoading.value = false;
  }
};

// @n8n/chat scrolls every incoming message into view, which parks the viewport at
// the end of a long answer and forces the reader back up to its first line. Anchor
// the top of the message instead, and only when it is too tall to fit: a short one
// still settles at the bottom, where it belongs.
const anchorIncomingMessages = () => {
  const body = mountRef.value?.querySelector<HTMLElement>(".chat-body");
  if (!body) return;

  messageObserver = new MutationObserver((records) => {
    const message = records
      .flatMap((record) => [...record.addedNodes])
      .find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement && node.classList.contains("chat-message-from-bot"),
      );

    if (!message) return;

    requestAnimationFrame(() => {
      const bodyRect = body.getBoundingClientRect();
      const messageRect = message.getBoundingClientRect();
      if (messageRect.height <= bodyRect.height - MESSAGE_TOP_GAP * 2) return;
      body.scrollTop += messageRect.top - bodyRect.top - MESSAGE_TOP_GAP;
    });
  });

  messageObserver.observe(body, { childList: true, subtree: true });
};

const destroyChat = () => {
  messageObserver?.disconnect();
  messageObserver = null;
  chatApp.value?.unmount();
  chatApp.value = null;
};

/* --- nudge --- */

let nudgeShowTimer: number | undefined;
let nudgeHideTimer: number | undefined;

const clearNudgeTimers = () => {
  window.clearTimeout(nudgeShowTimer);
  window.clearTimeout(nudgeHideTimer);
};

const dismissNudge = () => {
  showNudge.value = false;
  clearNudgeTimers();
};

watch(
  preloaderVisible,
  (visible) => {
    if (visible || hasInteracted.value) return;

    clearNudgeTimers();
    nudgeShowTimer = window.setTimeout(() => {
      if (hasInteracted.value) return;
      showNudge.value = true;
      nudgeHideTimer = window.setTimeout(dismissNudge, NUDGE_DURATION);
    }, NUDGE_DELAY);
  },
  { immediate: true },
);

/* --- open / close --- */

const open = () => {
  hasInteracted.value = true;
  dismissNudge();
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
  clearNudgeTimers();
  destroyChat();
});
</script>

<template>
  <Transition name="chatbot">
    <div v-if="!preloaderVisible" class="chatbot">
      <!-- data-lenis-prevent: without it lenis swallows the wheel and scrolls the page -->
      <div
        class="chatbot-panel"
        :class="{ 'chatbot-panel-open': isOpen }"
        :inert="!isOpen"
        :aria-hidden="!isOpen"
        data-lenis-prevent
      >
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

      <Transition name="chatbot-nudge">
        <button
          v-if="showNudge && !isOpen"
          type="button"
          class="chatbot-nudge"
          data-sound="click"
          data-hoversound="hover"
          @click="open"
        >
          {{ t("chat-nudge") }}
        </button>
      </Transition>

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

.chatbot-nudge-enter-active {
  transition:
    opacity 0.35s ease-out,
    transform 0.35s var(--ease-power2-out);
}

.chatbot-nudge-leave-active {
  transition:
    opacity 0.25s ease-in,
    transform 0.25s ease-in;
}

.chatbot-nudge-enter-from,
.chatbot-nudge-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.94);
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
  // the closed panel still occupies its box, so the wrapper must not swallow
  // clicks meant for the page underneath it
  pointer-events: none;

  &-toggle {
    position: relative;
    width: 58px;
    height: 58px;
    padding: 11px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    background-color: var(--color-accent-400, var(--color-orange-400));
    --icon-color: var(--color-accent-text-400, var(--color-white-400));
    box-shadow: 0 6px 20px rgb(0 0 0 / 18%);
    transition:
      transform 0.2s var(--ease-power2-out),
      box-shadow 0.2s ease-in-out;

    @include mixins.hover {
      // keeps the accent colour on hover, a halo instead of a colour swap
      &:hover {
        transform: scale(1.08);
        box-shadow:
          0 6px 20px rgb(0 0 0 / 18%),
          0 0 0 6px color-mix(in srgb, var(--color-accent-400, var(--color-orange-400)) 24%, transparent);
      }
    }

    &:active {
      transform: scale(0.96);
    }

    &-icon {
      width: 100%;
      height: 100%;
      --stroke-width: var(--stroke-md);
      transition:
        transform 0.25s var(--ease-power2-out),
        opacity 0.25s ease-in-out;
    }

    // the robot's antenna blinks, just enough to catch the eye
    :deep(.robot-antenna) {
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

  &-nudge {
    position: relative;
    max-width: min(calc(var(--svw) * 100 - var(--space-outer) * 2), 250px);
    margin-bottom: var(--space-xxs);
    padding: var(--space-xs) var(--space-sm);
    border: var(--stroke-md) solid var(--color-grayscale-400);
    border-radius: var(--radius-md);
    cursor: pointer;
    pointer-events: auto;
    text-align: left;
    font-size: var(--font-size-sm);
    font-weight: 700;
    line-height: var(--line-height-copy);
    color: var(--color-text-400);
    background-color: var(--color-background-400);
    box-shadow: 0 6px 20px rgb(0 0 0 / 12%);
    transition:
      transform 0.2s var(--ease-power2-out),
      border-color 0.15s ease-in-out;

    // little tail pointing down at the bubble
    &::after {
      content: "";
      position: absolute;
      right: 20px;
      bottom: calc(var(--stroke-md) * -1);
      width: 12px;
      height: 12px;
      transform: translateY(50%) rotate(45deg);
      border: var(--stroke-md) solid var(--color-grayscale-400);
      border-top: none;
      border-left: none;
      border-bottom-right-radius: 2px;
      background-color: var(--color-background-400);
    }

    @include mixins.hover {
      &:hover {
        transform: translateY(-2px);
        border-color: var(--color-accent-400, var(--color-orange-400));

        &::after {
          border-color: var(--color-accent-400, var(--color-orange-400));
        }
      }
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
      pointer-events: auto;
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
        --stroke-width: var(--stroke-sm);
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
      --chat--color--primary: var(--color-accent-400, var(--color-orange-400));
      --chat--color--primary-shade-50: var(--color-accent-400, var(--color-orange-400));
      --chat--color--primary--shade-100: var(--color-accent-400, var(--color-orange-400));
      --chat--color--secondary: var(--color-text-400);
      --chat--color-white: var(--color-background-400);
      --chat--color-light: var(--color-background-400);
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
      --chat--message--user--background: var(--color-accent-400, var(--color-orange-400));
      --chat--message--user--color: var(--color-accent-text-400, var(--color-white-400));
      // the footer would otherwise draw a light rule across the top of the input
      --chat--footer--background: var(--color-background-400);
      --chat--footer--border-top: none;
      --chat--input--font-size: var(--font-size-sm);
      --chat--input--background: var(--color-background-400);
      --chat--input--container--background: var(--color-background-400);
      --chat--input--text-color: var(--color-text-400);
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
