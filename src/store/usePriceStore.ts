import { create } from "zustand";
import { getPrices } from "../services/api";
import type { PriceListItem } from "../types";

interface PriceStore {
  prices: PriceListItem[];
  fetchPrices: (token: string) => Promise<void>;
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: [],

  fetchPrices: async (token: string) => {
    try {
      const data = await getPrices(token);
      set({ prices: data });
    } catch (err) {
      console.error("Failed to fetch prices", err);
    }
  },
}));