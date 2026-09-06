// @n8n/chat 1.36.4 declares "types": "./dist/index.d.ts", a file it does not ship.
// Re-declare the entry point against the declarations it does ship, one level deeper.
declare module "@n8n/chat" {
  import type { App } from "vue";
  import type { ChatOptions } from "@n8n/chat/dist/src/types";

  export function createChat(options?: Partial<ChatOptions>): App<Element>;
}
