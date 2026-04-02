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
}
