import { describe, it, expect } from "vitest";
import { calculateTotalWeight } from "./calculation";

describe("calculateTotalWeight", () => {
  it("calculates ingredient weights correctly", () => {
    const testIngredients = [
      { name: "Flour", weight: 50 },
      { name: "Sugar", weight: 100 },
    ];

    const result = calculateTotalWeight(testIngredients);

    expect(result).toBe(150);
  });
});