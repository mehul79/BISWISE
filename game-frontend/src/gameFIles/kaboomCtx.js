import kaboom from "kaboom";
import { scaleFactor } from "./constants";

// Restore default behavior for specific events
const originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  if (
    type === "touchstart" ||
    type === "touchmove" ||
    type === "wheel"
  ) {
    options = options || {};
    if (typeof options === "object") {
      options.passive = false; // Make these events non-passive
    }
  }
  originalAddEventListener.call(this, type, listener, options);
};

// Kaboom initialization
export const k = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById("game"),
  debug: false, // set to false once ready for production
});

// Fix for AudioContext warning
document.body.addEventListener("click", () => {
  if (k.audioCtx && k.audioCtx.state === "suspended") {
    k.audioCtx.resume();
  }
});
