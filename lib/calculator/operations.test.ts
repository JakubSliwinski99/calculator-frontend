import { mapOperation } from "@/lib/calculator/operations";
import { describe, expect, it } from "vitest";

describe("mapOperation", () => {
  it("maps calculator operator labels to API operation names", () => {
    expect(mapOperation("+")).toBe("addition");
    expect(mapOperation("−")).toBe("subtraction");
    expect(mapOperation("-")).toBe("subtraction");
    expect(mapOperation("÷")).toBe("division");
    expect(mapOperation("×")).toBe("multiplication");
    expect(mapOperation("x")).toBe("multiplication");
  });

  it("returns unknown labels unchanged", () => {
    expect(mapOperation("custom")).toBe("custom");
  });
});
