import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

type IngredientSectionProps = {
  categories: Category[];
  ingredients: Ingredient[];
};

export default function IngredientSection({
  categories,
  ingredients,
}: IngredientSectionProps) {
  const filteredCategories = categories.filter((cat) => cat.id !== 6);
  const filteredIngredients = ingredients.filter(
    (item) => item.categoryId !== 6
  );

  return (
    <section>
      <div className="category-buttons">
        {filteredCategories.map((cat) => (
          <button key={cat.id} className="category-btn">
            {cat.name}
          </button>
        ))}
      </div>

      <div className="ingredient-grid">
        {filteredIngredients.map((item) => (
          <IngredientCard key={item.id} ingredient={item} />
        ))}
      </div>
    </section>
  );
}

