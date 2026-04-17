import { create } from "zustand";
import type { Ingredient } from "../types";


export interface Bowl {
    id: string;
    name: string;
    volume: number;
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
      console.log("ADD", item);
      return {
        slots: {
          ...state.slots,
          [item.id]: item,
        },
      };
    }),

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