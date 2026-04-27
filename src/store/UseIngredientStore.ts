import { create } from "zustand";
import type { Ingredient } from "../types";

export interface Bowl {
  id: string;
  name: string;
  volume: number;
  slot_count: number;
}

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;

  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl | null) => void;
  clearSelection: () => void;
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: string | number) => void;
  loadRecipe: (recipe: any) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  slots: {},
  baseType: 1,
  selectedBowl: null,

  setBaseType: (id) => set({ baseType: id }),

  setBowl: (bowl) => set({ selectedBowl: bowl }),

  clearSelection: () =>
    set({
      slots: {},
      baseType: 1,
      selectedBowl: null,
    }),

  addIngredient: (item) =>
    set((state) => {
      if (!state.selectedBowl) return {};

      const slotCount = state.selectedBowl.slot_count;

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
    }),


  removeIngredient: (id) =>
    set((state) => {
      const newSlots = { ...state.slots };
      delete newSlots[String(id)];
      return { slots: newSlots };
    }),

  clearSlot: (slotId: string) =>
  set((state) => ({
    slots: {
      ...state.slots,
      [slotId]: null,
    },
  })),


  loadRecipe: (recipe) => {
    const { bowl, ingredients } = recipe;

    set({
      selectedBowl: bowl,
      slots: Object.fromEntries(
        ingredients.map((ing: Ingredient, index: number) => [String(index), ing])
      ),
      baseType: bowl.baseType ?? 1
    });
  }
}));
