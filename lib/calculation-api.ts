const API_PATH = "/api/v1/calculation";

export type CalculationRequest = {
  number1: number;
  number2: number;
  operation: string;
};

export type CalculationResponse = {
  result: string;
  error: string;
};

export async function calculate(
  request: CalculationRequest,
): Promise<CalculationResponse> {
  const response = await fetch(API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Calculation request failed with status ${response.status}`);
  }

  return response.json() as Promise<CalculationResponse>;
}
