"use client";

import { calculate } from "@/lib/calculation-api";
import {
  appendCharacter,
  limitDisplayLength,
  normalizeDisplayValue,
} from "@/lib/calculator/display";
import { getButtonForKeyboardKey } from "@/lib/calculator/keyboard";
import { mapOperation } from "@/lib/calculator/operations";
import type { CalculatorButton, CalculatorState } from "@/lib/calculator/types";
import { useEffect, useRef, useState } from "react";

export function useCalculator() {
  const displayInputRef = useRef<HTMLInputElement>(null);
  const [display, setDisplay] = useState("");
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    number: "",
    operation: "",
    willClearDisplay: false,
  });

  useEffect(() => {
    displayInputRef.current?.focus();
  }, []);

  function focusDisplayInput() {
    displayInputRef.current?.focus();
  }

  function clearWillClearDisplayFlag() {
    setCalculatorState((state) => ({
      ...state,
      willClearDisplay: false,
    }));
  }

  function handleDisplayChange(value: string) {
    if (calculatorState.willClearDisplay) {
      const newPart = value.startsWith(display) ? value.slice(display.length) : value;
      clearWillClearDisplayFlag();
      setDisplay(normalizeDisplayValue(newPart));
      return;
    }

    setDisplay(normalizeDisplayValue(value));
  }

  function handleDisplayKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const operatorOrEqualsButton = getButtonForKeyboardKey(event.key);

    if (operatorOrEqualsButton) {
      event.preventDefault();
      handleOperatorOrEqualsClick(operatorOrEqualsButton);
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      setDisplay("");
      clearWillClearDisplayFlag();
    }
  }

  async function handleCalculationRequest(button: CalculatorButton) {
    try {
      const response = await calculate({
        number1: parseFloat(calculatorState.number),
        number2: parseFloat(display),
        operation: mapOperation(calculatorState.operation),
      });

      if (response.error !== null) {
        setDisplay("ERR");
        setCalculatorState({
          number: "",
          operation: "",
          willClearDisplay: false,
        });
        return;
      }

      setDisplay(limitDisplayLength(response.result));
      setCalculatorState({
        number: response.result,
        operation: button.variant === "operator" ? button.label : "",
        willClearDisplay: true,
      });
    } catch {
      setDisplay("ERR");
      setCalculatorState({
        number: "",
        operation: "",
        willClearDisplay: false,
      });
    }
  }

  async function handleOperatorOrEqualsClick(button: CalculatorButton) {
    if (display === "") {
      return;
    }

    if (calculatorState.number === "") {
      if (button.variant === "equals") {
        return;
      }

      if (button.variant === "operator") {
        setCalculatorState({
          number: display,
          operation: button.label,
          willClearDisplay: false,
        });
        setDisplay("");
      }

      return;
    }

    if (calculatorState.operation === "") {
      if (button.variant === "equals") {
        return;
      }
      if (button.variant === "operator") {
        setCalculatorState({
          number: display,
          operation: button.label,
          willClearDisplay: false,
        });
        setDisplay("");
        return;
      }
    }

    if (button.variant === "equals" || button.variant === "operator") {
      await handleCalculationRequest(button);
    }
  }

  function handleButtonClick(button: CalculatorButton) {
    if (button.variant === "operator" || button.variant === "equals") {
      handleOperatorOrEqualsClick(button);
      return;
    }

    if (button.variant !== "number" || !/^[\d.]$/.test(button.label)) {
      return;
    }

    const base = calculatorState.willClearDisplay ? "" : display;

    if (calculatorState.willClearDisplay) {
      clearWillClearDisplayFlag();
    }

    setDisplay(appendCharacter(base, button.label));
  }

  function handleClear() {
    setDisplay("");
    setCalculatorState({
      number: "",
      operation: "",
      willClearDisplay: false,
    });
  }

  return {
    display,
    displayInputRef,
    focusDisplayInput,
    handleButtonClick,
    handleClear,
    handleDisplayChange,
    handleDisplayKeyDown,
  };
}
