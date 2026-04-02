import {useState} from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

type IngredientSectionProps = {
  categories: Category[];
  ingredients: Ingredient[];
  baseType: number | null;

  updateSlot: (slotName: string, ingredient: Ingredient | null) => void;
};

export default function IngredientSection({
  categories,
  ingredients,
  baseType,
  updateSlot,
}: IngredientSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  const filteredCategories = categories
    .filter((cat) => cat.id !== 6)
    .filter((cat) => (baseType !== null ? cat.base_type_id === baseType : true));

  const filteredIngredients = ingredients
    .filter((item) => item.categoryId !== 6)
    .filter((item) => activeCategory === "all" ? true : item.categoryId === activeCategory);

  return (
    <section>
      <div className="category-buttons">
        {filteredCategories.map((cat) => (
          <button 
          key={cat.id} 
          className="category-btn" 
          onClick={() => setActiveCategory(cat.id)}>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="ingredient-grid">
        {filteredIngredients.map((item) => (
          <IngredientCard 
          key={item.id} 
          ingredient={item} 
          onClick={() => updateSlot("slot1", item)} />
        ))}
      </div>
    </section>
  );
}