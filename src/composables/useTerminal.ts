import { ref } from "vue";

// Shared between the monitor hotspot in the room scene and the overlay that draws
// the terminal, so the three side never needs to know about the DOM side.
export const terminalOpen = ref(false);

export const openTerminal = () => {
  terminalOpen.value = true;
};

export const closeTerminal = () => {
  terminalOpen.value = false;
};
