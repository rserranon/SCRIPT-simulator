import { getOpcodeType } from "./opcode.mjs";

export class AnimationHandler {
  constructor(uiHandler) {
    this.uiHandler = uiHandler;
    this.currentIndex = 0; // Start with the first element
  }

  clearScriptExecution() {
    this.uiHandler.scriptContainer.innerHTML = ""; // Clear the script-execution container
  }

  resetIndex() {
    this.currentIndex = 0;
  }

  onMoveToExecution({ element, index }) {
    const scriptContainer = this.uiHandler.scriptContainer;

    const step = document.createElement("div");
    step.classList.add(
      "script-step",
      `step${index + 1}`,
      `${getOpcodeType(element)}`,
    );
    step.style.setProperty("--index", index);
    step.innerText = element;

    // Store the index as a data attribute for future reference
    step.setAttribute("data-index", index);

    // Append the step to the script execution container
    scriptContainer.appendChild(step);

    // Trigger the smooth appearance by adding the 'appear' class
    requestAnimationFrame(() => {
      step.classList.add("appear");
    });
  }

  onStartScript(event) {
    const scriptContainer = this.uiHandler.scriptContainer;
    scriptContainer.innerHTML = ""; // Clear previous script
    event.script.forEach((element, index) => {
      const step = document.createElement("div");
      step.classList.add("step");
      step.innerText = element;
      scriptContainer.appendChild(step);
    });
  }

  onExecuteOpcode(event) {
    const step = this.uiHandler.scriptContainer.children[event.index];
    step.classList.add("executing");
    console.log(`Executing: ${event.element}`);
    // You can add additional animation logic here
  }

  onEndScript(event) {
    console.log("Script execution finished.");
    // Add any cleanup or end-of-execution animations here
  }

  onPush(event) {
    const step = this.uiHandler.scriptContainer.querySelector(
      `[data-index="${this.currentIndex}"]`,
    );

    if (step) {
      // Move the element to the operation-result container
      this.uiHandler.operationResultContainer.appendChild(step);

      // Apply initial styles for a smooth transition
      step.style.transition = "transform 1s ease, opacity 1s ease";
      step.style.transform = "translateY(-50px)"; // Move the element slightly up
      step.style.opacity = "1";

      // After a short delay, move the element to the stack
      setTimeout(() => {
        // Reset styles before moving to the stack
        step.style.transition = "transform 1s ease, opacity 1s ease";
        step.style.transform = "translateY(0px)"; // Reset the Y position
        step.style.opacity = "0"; // Fade out before moving to the stack

        // After the fade-out transition ends, append the element to the stack
        setTimeout(() => {
          this.uiHandler.stackContainer.appendChild(step);

          // Trigger the stack appear animation
          requestAnimationFrame(() => {
            step.classList.remove("operation-result-item");
            step.classList.add("stack-item");
            step.style.opacity = "1"; // Fade in after moving to the stack
          });
        }, 1000); // Match this timing with the fade-out transition duration
      }, 2000); // Time to display the element in the operation-result container

      this.currentIndex++;
    }
  }
  // onPush(event) {
  //   const step = this.uiHandler.scriptContainer.querySelector(
  //     `[data-index="${this.currentIndex}"]`,
  //   );
  //
  //   if (step) {
  //     // First, move the element to the operation-result container
  //     this.uiHandler.operationResultContainer.appendChild(step);
  //
  //     // Set an initial position for the transition (e.g., start from where it was in the script container)
  //     step.style.transform = "translateY(-50px)"; // Adjust this value based on your layout
  //     step.style.opacity = "0";
  //
  //     // Trigger the smooth transition
  //     requestAnimationFrame(() => {
  //       console.log("Inside requestAnimationFrame");
  //       step.classList.add("operation-result-item");
  //       step.classList.add("operation-result-item-appear");
  //       step.style.opacity = "1";
  //     });
  //
  //     // After a delay, move the element from operation-result to the stack
  //     setTimeout(() => {
  //       step.style.opacity = "0";
  //       this.uiHandler.stackContainer.appendChild(step);
  //
  //       // Trigger the stack appear animation
  //       requestAnimationFrame(() => {
  //         step.classList.remove("operation-result-item");
  //         step.classList.add("stack-item");
  //         step.classList.add("stack-item-appear");
  //         step.style.opacity = "1";
  //       });
  //     }, 2000); // Delay between moving to operation-result and stack
  //
  //     this.currentIndex++;
  //
  //     // Apply animations here
  //     console.log(
  //       `Animating push for element at index ${this.currentIndex - 1}:`,
  //       event,
  //     );
  //   }
  // }

  onPop(event) {
    // Implement the animation for the 'pop' operation
    console.log("Animating pop:", event);
    // Example: animate removing an element from the visual stack
  }

  onPeek(event) {
    // Implement the animation for the 'pop' operation
    console.log("Animating peek:", event);
    // Example: animate removing an element from the visual stack
  }

  onAccessAt(event) {
    // Implement the animation for the 'query' operation
    console.log("Animating query:", event);
    // Example: animate showing the current state of the stack
  }
}
