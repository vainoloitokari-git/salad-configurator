import { useState } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

type IngredientSectionProps = {
  categories: Category[];
  ingredients: Ingredient[];
  baseType: number | null;
  setSlots: React.Dispatch<React.SetStateAction<{ [key: string]: Ingredient | null}>>;
};

export default function IngredientSection({
  categories,
  ingredients,
  baseType,
  setSlots,
}: IngredientSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (ingredient: Ingredient) => {
    setSlots((prev) => ({
      ...prev,
      [ingredient.id]: ingredient,
    }));
  };

  const filteredCategories = categories
    .filter((cat) => cat.id !== 6)
    .filter((cat) =>
      baseType !== null ? cat.base_type_id === baseType : true
    );

  const filteredIngredients = ingredients
    .filter((item) => item.categoryId !== 6)
    .filter((item) =>
      activeCategory === "all" ? true : item.categoryId === activeCategory
    )
    .filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
<section className="space-y-6">

<div className="bg-zinc-800 p-4 rounded-2xl flex gap-3 flex-wrap">
  {filteredCategories.map((cat) => (
    <button
      key={cat.id}
      onClick={() => setActiveCategory(cat.id)}
      className={`
        px-4 py-2 rounded-full font-medium text-black
        ${activeCategory === cat.id
          ? "bg-lime-400"
          : "bg-lime-300 hover:bg-lime-200"}
      `}
    >
      {cat.name}
    </button>
  ))}
</div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {filteredIngredients.map((item) => (
      <IngredientCard 
      key={item.id} 
      ingredient={item}
      onClick={() => handleSelect(item)} />
    ))}
  </div>

</section>

  );
}