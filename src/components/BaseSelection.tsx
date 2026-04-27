import type { Ingredient } from "../types";

type BaseSelectionProps = {
  ingredients: Ingredient[];
  baseType: number | null;
  setBaseType: (id: number) => void;
};

export default function BaseSelection({
  ingredients,
  baseType,
  setBaseType,
}: BaseSelectionProps) {
  return (
    <div className="bg-[#2f2f2f] text-white rounded-[40px] p-6 w-64 flex flex-col gap-6">
      <div className="text-center">
        <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
          2.
        </div>
        <div className="font-semibold">Valitse pohja</div>
      </div>

      {ingredients.map((item) => (
        <div
          key={String(item.id)}
          onClick={() => setBaseType(Number(item.id))}
          className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition
            ${
              baseType === Number(item.id)
                ? "bg-lime-500 text-black"
                : "text-gray-300 hover:bg-[#3a3a3a]"
            }`}
        >
          <img
            src={item.image_url}
            alt={item.name}
            className="w-14 h-14 rounded-full object-cover bg-[#c2a679]"
          />

          <div className="whitespace-normal break-words text-left">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}
