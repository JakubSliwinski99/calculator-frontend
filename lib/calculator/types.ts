export type ButtonVariant = "number" | "operator" | "equals";

export type CalculatorButton = {
  label: string;
  variant: ButtonVariant;
};

export type CalculatorState = {
  number: string;
  operation: string;
  willClearDisplay: boolean;
};
