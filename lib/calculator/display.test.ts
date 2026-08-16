import {
  appendCharacter,
  limitDisplayLength,
  normalizeDisplayValue,
} from "@/lib/calculator/display";
import { MAX_DISPLAY_LENGTH } from "@/lib/calculator/constants";
import { describe, expect, it } from "vitest";

describe("limitDisplayLength", () => {
  it("truncates strings longer than the max display length", () => {
    expect(limitDisplayLength("12345678901")).toBe("1234567890");
  });

  it("leaves shorter strings unchanged", () => {
    expect(limitDisplayLength("123")).toBe("123");
  });
});

describe("normalizeDisplayValue", () => {
  it("strips non-numeric characters except decimal points", () => {
    expect(normalizeDisplayValue("12a3")).toBe("123");
  });

  it("converts a lone decimal point to 0.", () => {
    expect(normalizeDisplayValue(".")).toBe("0.");
  });

  it("keeps only the first decimal point", () => {
    expect(normalizeDisplayValue("1.2.3")).toBe("1.23");
  });

  it("enforces the max display length", () => {
    expect(normalizeDisplayValue("12345678901")).toBe("1234567890");
  });
});

describe("appendCharacter", () => {
  it("appends digits to the current value", () => {
    expect(appendCharacter("12", "3")).toBe("123");
  });

  it("adds 0. when appending a decimal to an empty display", () => {
    expect(appendCharacter("", ".")).toBe("0.");
  });

  it("does not add a second decimal point", () => {
    expect(appendCharacter("1.2", ".")).toBe("1.2");
  });

  it("does not append when the display is already at max length", () => {
    const fullDisplay = "1".repeat(MAX_DISPLAY_LENGTH);
    expect(appendCharacter(fullDisplay, "2")).toBe(fullDisplay);
  });
});
