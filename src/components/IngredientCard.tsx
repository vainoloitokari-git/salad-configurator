import React from "react";
import type { Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

interface Props {
    ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: Props) {
  const { addIngredient } = useIngredientStore();
    return (
      
<div
onClick={() => addIngredient(ingredient)}
    style={{
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    width: "150px",
    minHeight: "150px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    cursor: "pointer"
}}
>
  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>
    {ingredient.name}
  </h3>
  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
    {ingredient.diets.map((diet) => (
    <span
    key={diet}
    style={{
    background: "#f3f4f6",
    padding: "4px 6px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: 500,
}}
    >
    {diet}
    </span>
))}
</div>
</div>
  );
}
