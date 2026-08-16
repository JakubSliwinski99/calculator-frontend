import { calculate } from "@/lib/calculation-api";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("calculate", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends a POST request with the calculation payload", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ result: "8", error: null }),
    } as Response);

    const response = await calculate({
      number1: 5,
      number2: 3,
      operation: "addition",
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8080/api/v1/calculation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number1: 5,
        number2: 3,
        operation: "addition",
      }),
    });
    expect(response).toEqual({ result: "8", error: null });
  });

  it("throws when the API responds with a non-OK status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(
      calculate({
        number1: 1,
        number2: 2,
        operation: "addition",
      }),
    ).rejects.toThrow("Calculation request failed with status 500");
  });
});
