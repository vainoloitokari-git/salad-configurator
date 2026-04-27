import { useEffect, useMemo } from "react";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import { useAuthStore } from "../store/useAuthStore";
import { calculateTotalWeight } from "../utils/calculation";
import type { Ingredient } from "../types";

export default function SummaryBar() {
  const slots = useIngredientStore((state) => state.slots ?? {});
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);

  const prices = usePriceStore((state) => state.prices);
  const fetchPrices = usePriceStore((state) => state.fetchPrices);

  const token = useAuthStore((state) => state.token);


  useEffect(() => {
    if (token) {
      fetchPrices(token);
    }
  }, [token, fetchPrices]);

 
  const activeIngredients = useMemo(() => {
    return Object.entries(slots)
      .filter(([, item]) => item != null)
      .map(([slotKey, item]) => ({
        slotKey,
        item: item as Ingredient,
      }));
  }, [slots]);

 
  const totalWeight = useMemo(() => {
    return calculateTotalWeight(activeIngredients.map((x) => x.item));
  }, [activeIngredients]);


  const totalPrice = useMemo(() => {
    return activeIngredients.reduce((sum, { item }) => {
      const priceItem = prices.find(
        (p: any) => Number(p.item_id) === Number(item.id)
      );

      return sum + (priceItem?.price ?? 0);
    }, 0);
  }, [activeIngredients, prices]);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">

     
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="font-semibold mb-4">Valitut ainekset</h3>

        {activeIngredients.length === 0 ? (
          <div className="text-gray-400 text-sm">
            Ei valittuja ainesosia
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {activeIngredients.map(({ item, slotKey }) => (
              <div
                key={slotKey}
                className="flex items-center gap-2 bg-zinc-700 px-4 py-2 rounded-full shadow-md"
              >
                <span>{item.name}</span>

                <button
                  onClick={() => removeIngredient(slotKey)}
                  className="text-red-300 hover:text-red-400 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6">

        <div className="text-center">
          <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md">
            {activeIngredients.length} kpl
          </div>
          <div className="text-sm text-gray-300">Ainesosat</div>
        </div>

        <div className="text-center">
          <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md">
            {totalWeight} g
          </div>
          <div className="text-sm text-gray-300">Paino</div>
        </div>

        <div className="text-center">
          <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md">
            {totalPrice.toFixed(2).replace(".", ",")} €
          </div>
          <div className="text-sm text-gray-300">Hinta</div>
        </div>

      </div>
    </div>
  );
}