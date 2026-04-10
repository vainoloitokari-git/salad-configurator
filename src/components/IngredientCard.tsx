import React from "react";
import type { Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

interface Props {
    ingredient: Ingredient;
    onClick?: () => void;
}

export default function IngredientCard({ ingredient, onClick, }: Props) {
  const { addIngredient } = useIngredientStore();
  const handleClick = () => {
    if(onClick) {
      onClick();
    } else {
      addIngredient(ingredient);
    }
  };
    
  return (
    <div
      onClick={handleClick}
      className="border border-gray-200 rounded-lg p-4 w-[150px] min-h-[150px] flex flex-col gap-2 shadow cursor-pointer transition hover:shadow-md hover:scale-[1.02]">

      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>{ingredient.name}</h3>

      <div className="flex gap-1.5 flex-wrap">
        {ingredient.diets.map((diet) => (
          <span
          key={diet}
          className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-medium">{diet}</span>
        ))}
      </div>
    </div>
  );
}