import { create } from "zustand";
import type { Ingredient } from "../types";


export interface Bowl {
    id: string;
    name: string;
}

interface IngredientStore {
    slots: Record <string, Ingredient | null>;
    baseType: number;
    selectedBowl: Bowl | null;


    setBaseType: (id: number) => void;
    setBowl: (bowl: Bowl | null) => void;
    clearSelection: () => void;
    addIngredient: (item: Ingredient) => void;
    removeIngredient: (id: string) => void;

}

export const useIngredientStore = create<IngredientStore>((set) => ({
    slots: {},                
    baseType: 1,              
    selectedBowl: null,

    setBaseType: (id) =>
        set(() => ({
        baseType: id,
        })),

    setBowl: (bowl) =>
        set(() => ({
        selectedBowl: bowl,
        })),

    clearSelection: () =>
        set(() => ({
        slots: {},
        baseType: 1,
        selectedBowl: null,
        })),

  addIngredient: (item) =>
  set((state) => {
    // 1) BASE (categoryId === 6)
    if (item.categoryId === 6) {
      return {
        slots: {
          ...state.slots,
          base: item,
        },
      };
    }


    const slotCount = state.selectedBowl?.slot_count ?? 0;

    // Etsi ensimmäinen tyhjä slotti
    for (let i = 1; i <= slotCount; i++) {
      const key = `slot-${i}`;

      if (!state.slots[key]) {
        return {
          slots: {
            ...state.slots,
            [key]: item,
          },
        };
      }
    }

    return {};
  })
,

removeIngredient: (id) =>
    set((state) => {
    const newSlots = { ...state.slots };
    const slotKey = Object.keys(newSlots).find(
      (key) => String(newSlots[key]?.id) === String(id)
    );

    if (slotKey) {
      newSlots[slotKey] = null;
    }

    return { slots: newSlots };
  }),

}));
