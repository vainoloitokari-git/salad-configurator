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
import { useIngredientStore } from "../store/UseIngredientStore";

import type { Bowl, Category, Ingredient } from "../types";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ⭐ KORJAUS: baseType tulee nyt storesta, ei local statesta
  const baseType = useIngredientStore((s) => s.baseType);
  const setBaseType = useIngredientStore((s) => s.setBaseType);

  const token = useAuthStore((s) => s.token);

  // Fetch ingredients + base ingredients
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const ingredientsData = await getIngredients();
        const baseIngredientsData = await getBaseIngredients();

        setIngredients(ingredientsData);
        setBaseIngredients(baseIngredientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
  // Fetch bowls + categories based on baseType
  useEffect(() => {
    if (!baseType) return;

    const fetchByType = async () => {
      try {
        setIsLoading(true);

        const [bowlsData, categoriesData] = await Promise.all([
          getBowls(baseType),
          getCategories(baseType),
        ]);

        setBowls(bowlsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching type-specific data:", err);
      } finally {
        setIsLoading(false);
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
        token={token ?? ""}
      />
    </div>
    
  );
}

export default Configurator;
