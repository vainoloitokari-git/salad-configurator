import type { Ingredient } from "../types";

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce(
    (total, ingredient) => total + (ingredient.weight_grams ?? 0),
    0
  );
}