import { useEffect, useState } from "react";
import { getPublicRecipes } from "../services/api"; 
import type { Recipe } from "../types";

function Community() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const data = await getPublicRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching public recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium">Ladataan reseptejä...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Yhteisön reseptit</h1>

      {recipes.length === 0 && (
        <p className="text-gray-600">Ei vielä julkisia reseptejä.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>

            <p className="text-sm text-gray-500 mb-3">
              Bowl: {recipe.bowl?.name ?? "Tuntematon"}
            </p>

            <div className="flex flex-wrap gap-2">
              {recipe.ingredients?.map((ing) => (
                <span 
                  key={ing.id}
                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                >
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
