"use client";

import { CalculatorDisplay } from "@/components/CalculatorDisplay";
import { CalculatorKeypad } from "@/components/CalculatorKeypad";
import { useCalculator } from "@/hooks/useCalculator";

export function Calculator() {
  const {
    display,
    displayInputRef,
    focusDisplayInput,
    handleButtonClick,
    handleClear,
    handleDisplayChange,
    handleDisplayKeyDown,
  } = useCalculator();

  return (
    <div
      className="flex flex-1 items-center justify-center bg-white p-8 max-[450px]:fixed max-[450px]:inset-0 max-[450px]:h-dvh max-[450px]:w-full max-[450px]:items-stretch max-[450px]:bg-[#2d2f36] max-[450px]:p-0"
      onMouseDown={focusDisplayInput}
    >
      <div className="flex w-72 flex-col rounded-[28px] border-[6px] border-[#545a66] bg-[#2d2f36] p-4 shadow-[8px_8px_0_rgba(0,0,0,0.15)] max-[450px]:h-full max-[450px]:min-h-0 max-[450px]:w-full max-[450px]:flex-1 max-[450px]:rounded-none max-[450px]:border-0 max-[450px]:p-0 max-[450px]:shadow-none">
        <div aria-hidden className="hidden min-h-0 flex-1 max-[450px]:block" />

        <CalculatorDisplay
          displayInputRef={displayInputRef}
          value={display}
          onChange={handleDisplayChange}
          onKeyDown={handleDisplayKeyDown}
        />

        <div aria-hidden className="hidden min-h-0 flex-1 max-[450px]:block" />

        <CalculatorKeypad onButtonClick={handleButtonClick} onClear={handleClear} />

        <div aria-hidden className="hidden min-h-0 flex-1 max-[450px]:block" />
      </div>
    </div>
  );
}
