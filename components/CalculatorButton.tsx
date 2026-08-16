import { VARIANT_STYLES } from "@/lib/calculator/constants";
import type { CalculatorButton as CalculatorButtonType } from "@/lib/calculator/types";

type CalculatorButtonProps = {
  button: CalculatorButtonType;
  onClick: (button: CalculatorButtonType) => void;
};

export function CalculatorButton({ button, onClick }: CalculatorButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onClick(button)}
      className={`flex aspect-square w-full items-center justify-center rounded-xl text-4xl font-bold text-white max-[450px]:rounded-lg max-[450px]:text-[clamp(2rem,8vw,3rem)] ${VARIANT_STYLES[button.variant]}`}
    >
      {button.label}
    </button>
  );
}
