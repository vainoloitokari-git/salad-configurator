import { create } from "zustand";

export interface Ingredient {
    id: string;
    name: string;
    image?: string;
}

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

  addIngredient: (item) => {
    console.warn("addIngredient not implemented yet", item);
  },

removeIngredient: (id) =>
    set((state) => {
    const newSlots = { ...state.slots };
    const slotKey = Object.keys(newSlots).find(
      (key) => newSlots[key]?.id === id
    );

    if (slotKey) {
      newSlots[slotKey] = null;
    }

    return { slots: newSlots };
  }),

}));
