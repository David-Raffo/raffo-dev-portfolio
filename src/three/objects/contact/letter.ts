import { Box3, Vector3 } from "three";
import gsap from "gsap";
import { raycast } from "../../utils/raycast";
import { sceneWeights } from "../../../animations/scenes";
import { playSound } from "../../../features/sounds/utils/sounds";
import { easterEggOpen, openEasterEgg } from "../../../composables/useEasterEgg";

import type { ClickableBox3 } from "../../types";

// The contact model is a single baked mesh, so the letter is not an object we can
// pick. These are the world bounds of the geometry island that draws the letter
// lying on the floor to the left of the avatar, padded to a comfortable hit area.
const CENTER = new Vector3(-2.4, -12.85, 0.67);
const SIZE = new Vector3(1.3, 0.5, 1.2);

let box3: ClickableBox3 | null = null;

// same threshold the contact group uses to show itself, so the letter is
// clickable for exactly as long as it is on screen. Scrolling to the very
// bottom raises contact.out, which pulls the weight down without hiding the
// scene, so anything stricter kills the hotspot while the letter is still there.
const isReachable = () => sceneWeights.contact > 0.001 && !easterEggOpen.value;

const handleClick = () => {
  if (!isReachable()) return;
  playSound("click");
  openEasterEgg();
};

const init = () => {
  box3 = new Box3().setFromCenterAndSize(CENTER, SIZE);
  box3.onClick = handleClick;
  box3.hoverSound = "notification";
  raycast.boxesToCheck.push(box3);
  gsap.ticker.add(tick);
};

const tick = () => {
  if (!box3) return;

  // an empty box can never be hit, which keeps the letter inert while the
  // contact scene is off screen or the game is already open
  if (isReachable()) {
    box3.setFromCenterAndSize(CENTER, SIZE);
  } else {
    box3.makeEmpty();
  }
};

const destroy = () => {
  gsap.ticker.remove(tick);
  if (box3) {
    const index = raycast.boxesToCheck.indexOf(box3);
    if (index !== -1) raycast.boxesToCheck.splice(index, 1);
  }
  box3 = null;
};

export const letter = { init, destroy };
