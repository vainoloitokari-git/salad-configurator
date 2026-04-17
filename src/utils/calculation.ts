type Weighable = {
    weight: number;
};
export function calculateTotalWeight(ingredients: Weighable[]): number {
  return ingredients.reduce((total, ingredient) => total + ingredient.weight, 0);
}