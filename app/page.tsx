"use client";

import { useState } from "react";

type ButtonVariant = "number" | "operator" | "equals";

type CalculatorButton = {
  label: string;
  variant: ButtonVariant;
};

const BUTTONS: CalculatorButton[] = [
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

const variantStyles: Record<ButtonVariant, string> = {
  number: "bg-[#5c5f66]",
  operator: "bg-[#414d68]",
  equals: "bg-[#f89131]",
};

const DISALLOWED_CHARACTERS = /[^0-9.]/g;

function sanitizeDisplayValue(value: string) {
  return value.replace(DISALLOWED_CHARACTERS, "");
}

export default function Home() {
  const [display, setDisplay] = useState("");

  function handleDisplayChange(value: string) {
    setDisplay(sanitizeDisplayValue(value));
  }

  function handleDisplayKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      setDisplay("");
    }
  }

  function handleButtonClick(button: CalculatorButton) {
    if (button.variant !== "number" || !/^[\d.]$/.test(button.label)) {
      return;
    }

    setDisplay((current) => sanitizeDisplayValue(current + button.label));
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-white p-8 max-[450px]:fixed max-[450px]:inset-0 max-[450px]:h-dvh max-[450px]:w-full max-[450px]:items-stretch max-[450px]:bg-[#2d2f36] max-[450px]:p-0">
      <div className="flex w-72 flex-col rounded-[28px] border-[6px] border-[#545a66] bg-[#2d2f36] p-4 shadow-[8px_8px_0_rgba(0,0,0,0.15)] max-[450px]:h-full max-[450px]:min-h-0 max-[450px]:w-full max-[450px]:flex-1 max-[450px]:rounded-none max-[450px]:border-0 max-[450px]:px-3 max-[450px]:pt-4 max-[450px]:pb-4 max-[450px]:shadow-none">
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          value={display}
          onChange={(event) => handleDisplayChange(event.target.value)}
          onKeyDown={handleDisplayKeyDown}
          aria-label="Calculator display"
          className="mt-4 mb-4 h-16 w-full shrink-0 rounded-lg border-none bg-[#d1d1d1] px-4 text-right text-3xl font-bold text-[#2d2f36] outline-none max-[450px]:mt-0 max-[450px]:h-[18dvh] max-[450px]:min-h-16 max-[450px]:text-[clamp(2rem,8vw,3rem)]"
        />

        <div className="flex min-h-0 flex-1 flex-col max-[450px]:justify-center">
          <div className="grid grid-cols-4 gap-3">
            {BUTTONS.map((button) => (
              <button
                key={button.label}
                type="button"
                onClick={() => handleButtonClick(button)}
                className={`flex aspect-square w-full items-center justify-center rounded-xl text-4xl font-bold text-white max-[450px]:rounded-lg max-[450px]:text-[clamp(2rem,8vw,3rem)] ${variantStyles[button.variant]}`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
