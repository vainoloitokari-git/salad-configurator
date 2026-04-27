import { create } from "zustand";
import type { Ingredient, Bowl } from "../types";

interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;

  setBaseType: (id: number | string) => void;
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

  setBaseType: (id) =>
    set({
      baseType: Number(id),
    }),

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

  loadRecipe: (recipe) => {
    const { bowl, ingredients } = recipe;

    set({
      selectedBowl: bowl,
      slots: Object.fromEntries(
        ingredients.map((ing: Ingredient, index: number) => [
          `slot-${index + 1}`,
          ing,
        ])
      ),
      baseType: Number(bowl.baseType) || 1,
    });
  },
}));
