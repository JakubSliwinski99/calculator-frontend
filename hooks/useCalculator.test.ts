import { BUTTONS } from "@/lib/calculator/constants";
import type { CalculatorButton } from "@/lib/calculator/types";
import { useCalculator } from "@/hooks/useCalculator";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/calculation-api", () => ({
  calculate: vi.fn(),
}));

import { calculate } from "@/lib/calculation-api";

const mockedCalculate = vi.mocked(calculate);

function getButton(label: string): CalculatorButton {
  const button = BUTTONS.find((item) => item.label === label);
  if (!button) {
    throw new Error(`Button "${label}" not found`);
  }
  return button;
}

function createKeyboardEvent(key: string) {
  return {
    key,
    preventDefault: vi.fn(),
  } as unknown as React.KeyboardEvent<HTMLInputElement>;
}

describe("useCalculator", () => {
  beforeEach(() => {
    mockedCalculate.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("appends digits when number buttons are clicked", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("1"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("2"));
    });

    expect(result.current.display).toBe("12");
  });

  it("starts decimal input with 0.", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("."));
    });

    expect(result.current.display).toBe("0.");
  });

  it("stores the first operand when an operator is pressed", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("+"));
    });

    expect(result.current.display).toBe("");
  });

  it("does nothing when equals is pressed with only one operand", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("="));
    });

    expect(mockedCalculate).not.toHaveBeenCalled();
    expect(result.current.display).toBe("5");
  });

  it("calls the API and shows the result after a full calculation", async () => {
    mockedCalculate.mockResolvedValue({ result: "8", error: null });

    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("+"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("3"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("="));
    });

    await waitFor(() => {
      expect(mockedCalculate).toHaveBeenCalledWith({
        number1: 5,
        number2: 3,
        operation: "addition",
      });
    });
    await waitFor(() => {
      expect(result.current.display).toBe("8");
    });
  });

  it("shows ERR when the API returns an error", async () => {
    mockedCalculate.mockResolvedValue({ result: "", error: "invalid" });

    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("+"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("3"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("="));
    });

    await waitFor(() => {
      expect(result.current.display).toBe("ERR");
    });
  });

  it("shows ERR when the API request fails", async () => {
    mockedCalculate.mockRejectedValue(new Error("network error"));

    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("+"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("3"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("="));
    });

    await waitFor(() => {
      expect(result.current.display).toBe("ERR");
    });
  });

  it("clears the display and state when CLEAR is pressed", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("9"));
    });
    act(() => {
      result.current.handleClear();
    });

    expect(result.current.display).toBe("");
  });

  it("clears the entire display on backspace", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("9"));
    });
    act(() => {
      result.current.handleDisplayKeyDown(createKeyboardEvent("Backspace"));
    });

    expect(result.current.display).toBe("");
  });

  it("replaces the display on the next digit when willClearDisplay is set", async () => {
    mockedCalculate.mockResolvedValue({ result: "8", error: null });

    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("+"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("3"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("="));
    });

    await waitFor(() => {
      expect(result.current.display).toBe("8");
    });

    act(() => {
      result.current.handleButtonClick(getButton("2"));
    });

    expect(result.current.display).toBe("2");
  });

  it("handles Enter the same way as the equals button", async () => {
    mockedCalculate.mockResolvedValue({ result: "8", error: null });

    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleButtonClick(getButton("5"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("+"));
    });
    act(() => {
      result.current.handleButtonClick(getButton("3"));
    });
    act(() => {
      result.current.handleDisplayKeyDown(createKeyboardEvent("Enter"));
    });

    await waitFor(() => {
      expect(mockedCalculate).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(result.current.display).toBe("8");
    });
  });
});
