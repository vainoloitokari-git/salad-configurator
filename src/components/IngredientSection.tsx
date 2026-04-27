import { useState, useEffect } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";
import { useIngredientStore } from "../store/useIngredientStore";

type IngredientSectionProps = {
  categories: Category[];
  ingredients: Ingredient[];
  baseType: number | null;
};

export default function IngredientSection({
  categories,
  ingredients,
  baseType,
}: IngredientSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addIngredient = useIngredientStore((state) => state.addIngredient);

  useEffect(() => {
    setActiveCategory("all");
  }, [baseType]);

  const filteredCategories = categories;

  const filteredIngredients = ingredients
    .filter((item) =>
      activeCategory === "all" ? true : item.categoryId === activeCategory
    )
    .filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <section className="space-y-6">
      <div className="bg-zinc-800 p-4 rounded-2xl flex gap-3 flex-wrap">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full font-medium ${
            activeCategory === "all"
              ? "bg-lime-400 text-black"
              : "bg-lime-300 hover:bg-lime-200"
          }`}
        >
          Kaikki
        </button>

        {filteredCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-medium ${
              activeCategory === cat.id
                ? "bg-lime-400 text-black"
                : "bg-lime-300 hover:bg-lime-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredIngredients.map((item) => (
          <IngredientCard key={item.id} ingredient={item} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
        <span className="inline-flex items-center gap-1">
          <span className="font-semibold">G</span>
          <span>Gluteeniton</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="font-semibold">L</span>
          <span>Laktoositon</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="font-semibold">V</span>
          <span>Vegaaninen</span>
        </span>
      </div>
    </section>
  );
}
