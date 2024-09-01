import { Interpreter } from "./interpreter.mjs";
import { AnimationHandler } from "./animation.mjs";
import { UIHandler } from "./uiHandler.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const uiHandler = new UIHandler();
  const animationHandler = new AnimationHandler(uiHandler);
  const interpreter = new Interpreter(animationHandler);

  // Bind the animations to the stack events
  interpreter.bindAnimations(animationHandler);

  uiHandler.setStackPosition();
  uiHandler.setOperationPosition();
  uiHandler.updateFooter();

  // Expose parseAndExecute to the global scope
  globalThis.parseAndExecute = (script) => {
    interpreter.parseAndExecute(script);
  };
});

// OP_1 OP_2 OP_DUP OP_AND OP_SUM OP_CAT OP_HASH160 OP_CHECKLOCKTIMEVERIFY pk(A)
