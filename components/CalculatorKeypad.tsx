import { CalculatorButton } from "@/components/CalculatorButton";
import { BUTTONS, VARIANT_STYLES } from "@/lib/calculator/constants";
import type { CalculatorButton as CalculatorButtonType } from "@/lib/calculator/types";

type CalculatorKeypadProps = {
  onButtonClick: (button: CalculatorButtonType) => void;
  onClear: () => void;
};

export function CalculatorKeypad({ onButtonClick, onClear }: CalculatorKeypadProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center max-[450px]:mx-3 max-[450px]:flex-none">
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClear}
        className={`mb-3 flex h-14 w-full items-center justify-center rounded-xl text-2xl font-bold text-white max-[450px]:rounded-lg max-[450px]:text-[clamp(1.5rem,6vw,2rem)] ${VARIANT_STYLES.equals}`}
      >
        CLEAR
      </button>
      <div className="grid grid-cols-4 gap-3">
        {BUTTONS.map((button) => (
          <CalculatorButton key={button.label} button={button} onClick={onButtonClick} />
        ))}
      </div>
    </div>
  );
}
