import { useEffect, useState } from "react";
import CenterBowl from "../components/CenterBowl";
import BowlSelection from "../components/BowlSelection";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import SaveRecipeModal from "../components/SaveRecipeModal";

import {
  getBowls,
  getCategories,
  getIngredients,
  getBaseIngredients,
} from "../services/api";

import { useAuthStore } from "../store/useAuthStore";
import { useIngredientStore } from "../store/useIngredientStore";

import type { Bowl, Category, Ingredient } from "../types";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTypeLoading, setIsTypeLoading] = useState(false);

  const baseType = useIngredientStore((s) => s.baseType);
  const setBaseType = useIngredientStore((s) => s.setBaseType);

  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const [ingredientsData, baseIngredientsData, categoriesData] =
          await Promise.all([
            getIngredients(),
            getBaseIngredients(),
            getCategories(), // 🔥 aina kaikki kategoriat
          ]);

        setIngredients(ingredientsData);
        setBaseIngredients(baseIngredientsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!baseType) return;

    const fetchByType = async () => {
      try {
        setIsTypeLoading(true);

        const bowlsData = await getBowls(baseType);

        setBowls(bowlsData);
      } catch (err) {
        console.error("Error fetching type-specific data:", err);
      } finally {
        setIsTypeLoading(false);
      }
    };

    fetchByType();
  }, [baseType]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium">Ladataan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">

        <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr_256px] gap-6 items-center">

          <div className="flex justify-center">
            <BowlSelection bowls={bowls} />
          </div>

          <div className="flex justify-center items-center">
            <CenterBowl
              baseType={baseType}
              setBaseType={setBaseType}
              baseIngredients={baseIngredients}
              onSaveClick={() => setIsSaveModalOpen(true)}
            />
          </div>

          <div className="flex justify-center">
            <BaseSelection
              ingredients={baseIngredients}
              baseType={baseType}
              setBaseType={setBaseType}
            />
          </div>
        </div>

        {isTypeLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <IngredientSection
            categories={categories}
            ingredients={ingredients}
            baseType={baseType}
          />
        )}

        <SummaryBar />
      </main>

      <SaveRecipeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        token={token ?? ""}
      />
    </div>
  );
}

export default Configurator;
