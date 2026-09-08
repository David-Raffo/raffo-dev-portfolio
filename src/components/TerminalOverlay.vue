<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import X from "./icons/X.vue";
import { t } from "../i18n/utils/translate";
import { locale } from "../i18n/store";
import { terminalOpen, closeTerminal } from "../composables/useTerminal";
import { lenis } from "../composables/useScroll";
import { useRouter } from "../composables/useRouter";
import { playSound } from "../features/sounds/utils/sounds";
import { previews } from "../content/projects/previews";
import { social } from "../content/social";

// a line is plain text, or a plain prefix plus a clickable label plus a dim suffix
type Line = {
  text?: string;
  kind?: "command" | "error" | "muted";
  prefix?: string;
  label?: string;
  suffix?: string;
  href?: string;
  to?: string;
};

const COMMANDS = ["help", "whoami", "stack", "projects", "contact", "clear", "exit"] as const;

const lines = ref<Line[]>([]);
const draft = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const outputRef = ref<HTMLElement | null>(null);
const isBusy = ref(false);

const history: string[] = [];
let historyIndex = -1;

const { push } = useRouter();

/* --- output --- */

const write = (text: string, kind?: Line["kind"]) => {
  for (const text_ of text.split("\n")) lines.value.push({ text: text_, kind });
};

const scrollToEnd = async () => {
  await nextTick();
  const output = outputRef.value;
  if (output) output.scrollTop = output.scrollHeight;
};

/* --- commands --- */

const runProjects = async () => {
  isBusy.value = true;
  write(t("term-projects"), "muted");

  try {
    const load = previews[locale.value as keyof typeof previews];
    const module = await load();
    const width = Math.max(...module.default.map((preview) => preview.title.length));

    for (const preview of module.default) {
      lines.value.push({
        prefix: "  ",
        label: preview.title.padEnd(width),
        suffix: `   ${preview.description}`,
        to: `/project/${preview.slug}`,
      });
    }
  } finally {
    isBusy.value = false;
  }
};

const runContact = () => {
  write(t("term-contact"), "muted");
  for (const item of social) {
    const label = item.url.startsWith("mailto:") ? item.url.replace("mailto:", "") : item.url;
    lines.value.push({ prefix: `  ${item.name.padEnd(8)}   `, label, href: item.url });
  }
};

const run = async (raw: string) => {
  const input = raw.trim();
  lines.value.push({ text: input, kind: "command" });

  if (!input) return;

  history.unshift(input);
  historyIndex = -1;

  const [command] = input.toLowerCase().split(/\s+/);

  switch (command) {
    case "help":
      write(t("term-help"));
      break;
    case "whoami":
      write(t("term-whoami"));
      break;
    case "stack":
      write(t("term-stack"));
      break;
    case "projects":
      await runProjects();
      break;
    case "contact":
      runContact();
      break;
    case "sudo":
      write(t("term-sudo"), "muted");
      break;
    case "clear":
      lines.value = [];
      break;
    case "exit":
      close();
      break;
    default:
      write(t("term-unknown", { command }), "error");
      write(t("term-unknown-hint"), "muted");
  }
};

const submit = async () => {
  if (isBusy.value) return;
  const raw = draft.value;
  draft.value = "";
  await run(raw);
  await scrollToEnd();
};

/* --- input --- */

const complete = () => {
  const partial = draft.value.trim().toLowerCase();
  if (!partial) return;
  const matches = COMMANDS.filter((command) => command.startsWith(partial));
  if (matches.length === 1) draft.value = matches[0] as string;
  else if (matches.length > 1) write(matches.join("  "), "muted");
};

const recall = (direction: 1 | -1) => {
  if (!history.length) return;
  historyIndex = Math.min(history.length - 1, Math.max(-1, historyIndex + direction));
  draft.value = historyIndex === -1 ? "" : (history[historyIndex] as string);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Tab") {
    event.preventDefault();
    complete();
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    recall(1);
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    recall(-1);
  }
};

const handleWindowKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

const focusInput = () => inputRef.value?.focus();

/* --- navigation out of the terminal --- */

const openProject = (path: string) => {
  close();
  push(path);
};

/* --- lifecycle --- */

const close = () => {
  playSound("click");
  closeTerminal();
};

watch(terminalOpen, async (open) => {
  if (open) {
    lenis.value?.stop();
    window.addEventListener("keydown", handleWindowKeydown);
    lines.value = [];
    draft.value = "";
    historyIndex = -1;
    write(t("term-boot"), "muted");
    write(t("term-hint"), "muted");
    await nextTick();
    focusInput();
    return;
  }

  lenis.value?.start();
  window.removeEventListener("keydown", handleWindowKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleWindowKeydown);
  lenis.value?.start();
});
</script>

<template>
  <Transition name="terminal">
    <!-- the 3D raycast listens on window, so overlay clicks must not reach it -->
    <div v-if="terminalOpen" class="terminal" @click.stop>
      <div class="terminal-backdrop" @click="close"></div>

      <div class="terminal-window" data-lenis-prevent @click="focusInput">
        <div class="terminal-bar">
          <span class="terminal-bar-dot terminal-bar-dot-close"></span>
          <span class="terminal-bar-dot terminal-bar-dot-minimise"></span>
          <span class="terminal-bar-dot terminal-bar-dot-zoom"></span>
          <p class="terminal-bar-title">{{ t("term-title") }}</p>
          <button type="button" class="terminal-bar-close" :aria-label="t('term-close')" @click.stop="close">
            <X class="terminal-bar-close-icon" />
          </button>
        </div>

        <div ref="outputRef" class="terminal-output">
          <p v-for="(line, index) in lines" :key="index" :class="['terminal-line', `terminal-line-${line.kind ?? 'plain'}`]">
            <span v-if="line.kind === 'command'" class="terminal-prompt">{{ t("term-title") }}:~$&nbsp;</span>
            <template v-if="line.label">
              <span>{{ line.prefix }}</span>
              <a
                v-if="line.href"
                :href="line.href"
                target="_blank"
                rel="noopener noreferrer"
                class="terminal-link"
                @click.stop
                >{{ line.label }}</a
              >
              <button v-else-if="line.to" type="button" class="terminal-link" @click.stop="openProject(line.to)">
                {{ line.label }}
              </button>
              <span class="terminal-dim">{{ line.suffix }}</span>
            </template>
            <template v-else>{{ line.text }}</template>
          </p>

          <p v-if="isBusy" class="terminal-line terminal-line-muted">{{ t("term-loading") }}</p>

          <form class="terminal-input-line" @submit.prevent="submit">
            <label class="terminal-prompt" for="terminal-input">{{ t("term-title") }}:~$&nbsp;</label>
            <input
              id="terminal-input"
              ref="inputRef"
              v-model="draft"
              class="terminal-input"
              type="text"
              autocomplete="off"
              autocapitalize="off"
              autocorrect="off"
              spellcheck="false"
              @keydown="handleKeydown"
            />
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.terminal-enter-active,
.terminal-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.terminal-enter-from,
.terminal-leave-to {
  opacity: 0;
}

.terminal {
  position: fixed;
  inset: 0;
  z-index: var(--z-index-terminal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-outer);

  &-backdrop {
    position: absolute;
    inset: 0;
    background-color: rgb(20 22 27 / 78%);
    backdrop-filter: blur(6px);
  }

  &-window {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(100%, 760px);
    height: min(calc(100dvh - var(--space-outer) * 2), 540px);
    overflow: hidden;
    border-radius: var(--radius-md);
    background-color: #14161b;
    box-shadow: 0 24px 70px rgb(0 0 0 / 45%);
    cursor: text;
  }

  &-bar {
    display: flex;
    align-items: center;
    gap: var(--space-xxs);
    padding: var(--space-xs) var(--space-sm);
    background-color: #1e222a;

    &-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;

      &-close {
        background-color: #ff5f57;
      }
      &-minimise {
        background-color: #febc2e;
      }
      &-zoom {
        background-color: #28c840;
      }
    }

    &-title {
      flex: 1;
      text-align: center;
      font-family: "ProFontWindows", monospace;
      font-size: var(--font-size-sm);
      color: #6b7280;
    }

    &-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      padding: 6px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      background-color: transparent;
      --icon-color: #6b7280;
      transition: background-color 0.15s ease-in-out;

      @include mixins.hover {
        &:hover {
          background-color: #2b313b;
          --icon-color: #f5efe6;
        }
      }

      &-icon {
        width: 100%;
      }
    }
  }

  &-output {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    // the padded columns are aligned with spaces, so on a narrow screen they
    // scroll sideways rather than wrapping into nonsense
    overflow-x: auto;
    padding: var(--space-md);
    font-family: "ProFontWindows", monospace;
    font-size: var(--font-size-sm);
    line-height: 1.5;
    color: #e6e9ef;

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }
  }

  &-line {
    white-space: pre-wrap;
    word-break: break-word;

    &-error {
      color: #ff7a70;
    }

    &-muted {
      color: #7b8492;
    }
  }

  &-prompt {
    color: var(--color-orange-400);
    white-space: pre;
  }

  &-dim {
    color: #99a1af;
    white-space: pre-wrap;
  }

  &-link {
    padding: 0;
    border: none;
    font: inherit;
    text-align: left;
    cursor: pointer;
    white-space: pre;
    color: #e6e9ef;
    background-color: transparent;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 3px;
    transition:
      color 0.15s ease-in-out,
      text-decoration-color 0.15s ease-in-out;

    @include mixins.hover {
      &:hover {
        color: var(--color-orange-400);
        text-decoration-color: var(--color-orange-400);
      }
    }
  }

  &-input-line {
    display: flex;
    align-items: baseline;
  }

  &-input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    font: inherit;
    color: #e6e9ef;
    background-color: transparent;
    caret-color: var(--color-orange-400);
  }
}
</style>
