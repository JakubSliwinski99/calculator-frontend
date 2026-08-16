import type { ButtonVariant, CalculatorButton } from "./types";

export const MAX_DISPLAY_LENGTH = 10;

export const BUTTONS: CalculatorButton[] = [
  { label: "7", variant: "number" },
  { label: "8", variant: "number" },
  { label: "9", variant: "number" },
  { label: "÷", variant: "operator" },
  { label: "4", variant: "number" },
  { label: "5", variant: "number" },
  { label: "6", variant: "number" },
  { label: "×", variant: "operator" },
  { label: "1", variant: "number" },
  { label: "2", variant: "number" },
  { label: "3", variant: "number" },
  { label: "−", variant: "operator" },
  { label: "0", variant: "number" },
  { label: ".", variant: "number" },
  { label: "=", variant: "equals" },
  { label: "+", variant: "operator" },
];

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  number: "bg-[#5c5f66]",
  operator: "bg-[#414d68]",
  equals: "bg-[#f89131]",
};
