import { useIngredientStore } from "../store/UseIngredientStore";
import type { Ingredient } from "../types";

type Props = {
  baseType: number | null;
  setBaseType: (id: number) => void;
  onSaveClick: () => void; // ← TÄRKEÄ
};

export default function CenterBowl({ setBaseType, onSaveClick }: Props) {
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const clearSection = useIngredientStore((state) => state.clearSelection);

  const activeIngredients = Object.values(slots).filter(Boolean) as Ingredient[];

  return (
    <div className="flex flex-col items-center justify-center">
      
      <div className="flex gap-3 mb-6 items-center">
        <button onClick={() => setBaseType(1)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
          Salaatti
        </button>

        <button onClick={() => setBaseType(2)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
          Rahka
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => {
              const confirmed = window.confirm("Are you sure you want to empty the bowl?");
              if (confirmed) clearSection();
            }}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
          >
            🗑️
          </button>

          <button 
            onClick={() => alert("Feature coming soon!")}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
          >
            ↩️
          </button>

          {/* 🔥 TÄSSÄ ON TALLENNUSNAPPI */}
          <button 
            onClick={onSaveClick}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
          >
            💾
          </button>
        </div>
      </div>

      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner">
        <div className="flex flex-wrap gap-2 justify-center px-4">
          {activeIngredients.map((ingredient) => (
            <span
              key={ingredient.id}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {ingredient.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex flex-col items-center text-gray-600">
        <span className="text-lg font-medium">100 g / 1,99 €</span>
        <span className="text-sm">
          {selectedBowl ? selectedBowl.volume : 0} ml
        </span>
      </div>

    </div>
  );
}
