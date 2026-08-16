import { getButtonForKeyboardKey } from "@/lib/calculator/keyboard";
import { describe, expect, it } from "vitest";

describe("getButtonForKeyboardKey", () => {
  it("maps keyboard keys to calculator buttons", () => {
    expect(getButtonForKeyboardKey("+")?.label).toBe("+");
    expect(getButtonForKeyboardKey("-")?.label).toBe("−");
    expect(getButtonForKeyboardKey("/")?.label).toBe("÷");
    expect(getButtonForKeyboardKey("*")?.label).toBe("×");
    expect(getButtonForKeyboardKey("Enter")?.label).toBe("=");
    expect(getButtonForKeyboardKey("NumpadEnter")?.label).toBe("=");
  });

  it("returns undefined for unsupported keys", () => {
    expect(getButtonForKeyboardKey("a")).toBeUndefined();
    expect(getButtonForKeyboardKey("7")).toBeUndefined();
  });
});
