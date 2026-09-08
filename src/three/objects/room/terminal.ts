import { Box3, Vector3 } from "three";
import gsap from "gsap";
import { room } from ".";
import { raycast } from "../../utils/raycast";
import { sceneWeights } from "../../../animations/scenes";
import { playSound } from "../../../features/sounds/utils/sounds";
import { openTerminal, terminalOpen } from "../../../composables/useTerminal";

import type { ClickableBox3 } from "../../types";

// desktops.ts merges both screen planes into a single mesh, so "desktop-plane-0",
// the big monitor on the right, is not an object we can pick at runtime. These are
// its bounds in the room group's local space, taken from the model and padded into
// a comfortable hit area.
const LOCAL_CENTER = new Vector3(-2, 2.56, -0.54);
const LOCAL_SIZE = new Vector3(0.6, 1.6, 2.3);

const localBox = new Box3().setFromCenterAndSize(LOCAL_CENTER, LOCAL_SIZE);

let box3: ClickableBox3 | null = null;

// the room group is animated by the scroll, so the hotspot follows its matrix
const isReachable = () => sceneWeights.hero > 0.001 && !terminalOpen.value;

const handleClick = () => {
  if (!isReachable()) return;
  playSound("keyboard");
  openTerminal();
};

const init = () => {
  box3 = new Box3();
  box3.onClick = handleClick;
  box3.hoverSound = "keyboard";
  raycast.boxesToCheck.push(box3);
  gsap.ticker.add(tick);
};

const tick = () => {
  if (!box3) return;

  // an empty box can never be hit, which keeps the monitor inert while the room
  // is off screen or the terminal is already open
  if (!isReachable()) {
    box3.makeEmpty();
    return;
  }

  box3.copy(localBox).applyMatrix4(room.group.matrixWorld);
};

const destroy = () => {
  gsap.ticker.remove(tick);
  if (box3) {
    const index = raycast.boxesToCheck.indexOf(box3);
    if (index !== -1) raycast.boxesToCheck.splice(index, 1);
  }
  box3 = null;
};

export const terminal = { init, destroy };
