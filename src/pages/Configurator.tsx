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
  getBaseIngredients 
} from "../services/api";

import { useAuthStore } from "../store/useAuthStore";

import type { Bowl, Category, Ingredient } from "../types";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);
  const [baseType, setBaseType] = useState<number | null>(1);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const token = useAuthStore((s) => s.token);

  // Hae vain ainesosat ja pohja-ainesosat kerran
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredientsData = await getIngredients();
        const baseIngredientsData = await getBaseIngredients();

        setIngredients(ingredientsData);
        setBaseIngredients(baseIngredientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Hae rasiat ja kategoriat aina kun baseType vaihtuu (Salaatti / Rahka)
  useEffect(() => {
    if (!baseType) return;

    const fetchByType = async () => {
      try {
        const [bowlsData, categoriesData] = await Promise.all([
          getBowls(baseType),
          getCategories(baseType),
        ]);

        setBowls(bowlsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching type-specific data:", err);
      }
    };

    fetchByType();
  }, [baseType]);

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
            <BaseSelection ingredients={baseIngredients} />
          </div>
        </div>

        <IngredientSection 
          categories={categories}
          ingredients={ingredients}
          baseType={baseType}
        />

        <SummaryBar />
      </main>

      <SaveRecipeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        token={token}
      />
    </div>
  );
}

export default Configurator;
