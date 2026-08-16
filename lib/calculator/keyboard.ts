import { BUTTONS } from "./constants";
import type { CalculatorButton } from "./types";

const KEYBOARD_TO_BUTTON_LABEL: Record<string, string> = {
  "+": "+",
  "-": "−",
  "/": "÷",
  "*": "×",
  Enter: "=",
  NumpadEnter: "=",
};

export function getButtonForKeyboardKey(key: string): CalculatorButton | undefined {
  const label = KEYBOARD_TO_BUTTON_LABEL[key];
  if (!label) {
    return undefined;
  }

  return BUTTONS.find((button) => button.label === label);
}
