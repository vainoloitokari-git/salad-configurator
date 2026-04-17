import { create } from "zustand";

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (token: string, userName: string) => void;
  logout: () => void;
}

const getStoredToken = () => localStorage.getItem("token");
const getStoredUserName = () => localStorage.getItem("userName");

export const useAuthStore = create<AuthState>((set) => ({
  token: getStoredToken(),
  userName: getStoredUserName(),

  login: (token, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);

    set({ token, userName });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    set({ token: null, userName: null });
  },
}));