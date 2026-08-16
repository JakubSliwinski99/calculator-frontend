import { MAX_DISPLAY_LENGTH } from "@/lib/calculator/constants";
import type { RefObject } from "react";

type CalculatorDisplayProps = {
  displayInputRef: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function CalculatorDisplay({
  displayInputRef,
  value,
  onChange,
  onKeyDown,
}: CalculatorDisplayProps) {
  return (
    <div className="mt-4 mb-4 shrink-0 max-[450px]:mx-3 max-[450px]:my-0">
      <div className="relative h-16 w-full max-[450px]:h-0 max-[450px]:pb-[calc((100%-0.75rem*3)/4)]">
        <input
          ref={displayInputRef}
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          maxLength={MAX_DISPLAY_LENGTH}
          value={value}
          autoFocus
          onBlur={() => {
            requestAnimationFrame(() => displayInputRef.current?.focus());
          }}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Calculator display"
          className="absolute inset-0 rounded-lg border-none bg-[#d1d1d1] px-4 text-right text-3xl font-bold caret-transparent text-[#2d2f36] outline-none max-[450px]:text-[clamp(2rem,8vw,3rem)]"
        />
      </div>
    </div>
  );
}
