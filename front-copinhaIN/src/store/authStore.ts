import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface authState {
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      login: (token, role) => set({ token: null, role: null }),
      logout: () => set({ token: null, role: null }),
    }),
    { name: "auth-storage" },
  ),
);
