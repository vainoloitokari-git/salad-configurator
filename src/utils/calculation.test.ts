import { describe, it, expect } from "vitest";
import { calculateTotalWeight } from "./calculation";

describe("calculateTotalWeight", () => {
  it("calculates ingredient weights correctly", () => {
    const testIngredients = [
      {
        name: "Flour",
        weight_grams: 50,
        categoryId: 1,
        id: 1,
        diets: [],
        image_url: "1",
        barcode_url: "",
      },
      {
        name: "Sugar",
        weight_grams: 100,
        categoryId: 1,
        id: 2,
        diets: [],
        image_url: "1",
        barcode_url: "",
      },
    ];

    const result = calculateTotalWeight(testIngredients);

    expect(result).toBe(150);
  });
});