import { create } from "zustand";
import { getPrices} from "../services/api";

export interface PriceListItem {

    id: string;
    name: string;
    price: number;
}

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