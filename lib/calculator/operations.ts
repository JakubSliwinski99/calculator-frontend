const OPERATION_MAP: Record<string, string> = {
  "+": "addition",
  "−": "subtraction",
  "-": "subtraction",
  "÷": "division",
  "×": "multiplication",
  x: "multiplication",
  X: "multiplication",
};

export function mapOperation(operationLabel: string) {
  return OPERATION_MAP[operationLabel] ?? operationLabel;
}
