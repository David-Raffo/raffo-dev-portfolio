import { ref } from "vue";

// Shared between the 3D letter hotspot in the contact scene and the overlay that
// renders the game, so the three side never needs to know about the DOM side.
export const easterEggOpen = ref(false);
export const easterEggFound = ref(false);

export const openEasterEgg = () => {
  easterEggOpen.value = true;
  easterEggFound.value = true;
};

export const closeEasterEgg = () => {
  easterEggOpen.value = false;
};
