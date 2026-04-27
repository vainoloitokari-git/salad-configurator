import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";

import divider4 from "../assets/divider-4.png";
import divider6 from "../assets/divider-6.png";

type Props = {
  baseType: number | null;
  setBaseType: (id: number) => void;
  onSaveClick: () => void;
  baseIngredients: Ingredient[];
};

export default function CenterBowl({
  baseType,
  setBaseType,
  onSaveClick,
  baseIngredients,
}: Props) {
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);
  const clearSelection = useIngredientStore((state) => state.clearSelection);

  const activeSlots = Object.entries(slots).filter(
    ([_, item]) => item != null
  ) as [string, Ingredient][];

  const selectedBase = baseIngredients.find((b) => b.id === baseType);

  const slotCount =
    selectedBowl?.slot_count ??
    activeSlots.length ??
    4;

  const dividerImage =
    slotCount === 4
      ? divider4
      : slotCount === 6
      ? divider6
      : null;

  const radius = 30; // % ympyrän säde

  return (
    <div className="flex flex-col items-center justify-center">

      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          Salaatti
        </button>

        <button
          onClick={() => setBaseType(2)}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          Rahka
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to empty the bowl?")) {
                clearSelection();
              }
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

          <button
            onClick={onSaveClick}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded hover:bg-gray-400"
          >
            💾
          </button>
        </div>
      </div>

      <div className="relative w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 shadow-inner overflow-hidden flex items-center justify-center">

        {selectedBase && (
          <img
            src={selectedBase.image_url}
            alt={selectedBase.name}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {dividerImage && (
          <img
            src={dividerImage}
            alt="divider"
            className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
          />
        )}

        <div className="absolute inset-0 z-30">
          {activeSlots.map(([slotKey, ingredient], index) => {
           const angleStep = (2 * Math.PI) / slotCount;
           const angle = index * angleStep - Math.PI / 2;

            const x =50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            return (
              <div
                key={slotKey}
                className="absolute flex flex-col items-center"
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
            
                <img
                  src={ingredient.wedge_image_url}
                  alt={ingredient.name}
                  className="w-14 h- object-contain z-30"
                />

               
                <button
                  onClick={() => removeIngredient(slotKey)}
                  className="text-xs bg-red-500 text-white rounded-full px-2 mt-1 hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center text-gray-600">
        <span className="text-lg font-medium">
          {selectedBowl?.volume ?? 0} ml
        </span>
      </div>
    </div>
  );
}