"use client";

import { User } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authUser: User | null;

  setAuthUser: (user: User | null) => void;
  reset: () => void;
};


const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user: User | null) => set((state: Store) => ({ ...state, authUser: user })),
  reset: () => set({ authUser: null,  }),
}));

export default useStore;
