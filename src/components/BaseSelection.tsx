import { useIngredientStore } from "../store/UseIngredientStore";
import type { Ingredient } from "../types";

type BaseSelectionProps = {
  ingredients: Ingredient[];
};

export default function BaseSelection({ ingredients }: BaseSelectionProps) {
  const selectedBase = useIngredientStore((s) => s.baseType);
  const setBaseType = useIngredientStore((s) => s.setBaseType);

  return (
    <div className="bg-[#2f2f2f] text-white rounded-[40px] p-6 w-64 flex flex-col gap-6">
      <div className="text-center">
        <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
          2.
        </div>
        <div className="font-semibold">Valitse salaattipohja</div>
      </div>

      {ingredients.map((item) => (
        <button
          key={item.id}
          onClick={() => setBaseType(item.id)}
          className={`flex items-center gap-4 cursor-pointer transition ${
            selectedBase === item.id ? "text-lime-400" : "text-gray-300"
          }`}
        >
          {/* Pyöreä kuva */}
          <img
            src={item.image_url}
            alt={item.name}
            className="w-14 h-14 rounded-full object-cover bg-[#c2a679]"
          />

          {/* Nimi */}
          <div className="whitespace-normal break-words text-left">
            {item.name}
          </div>
        </button>
      ))}
    </div>
  );
}
