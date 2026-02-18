import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  email: string;
  id: string;
  userName: string;
  isLoggedIn: boolean;
  gameUIDList: string[];
  setUser: (email: string, id: string, userName: string) => void;
  logout: () => void;
  setGameUidList: (gameUIDList: string[]) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: "",
      id: "",
      userName: "",
      gameUIDList: [],
      isLoggedIn: !!localStorage.getItem("access_token"),

      setUser: (email, id, userName) =>
        set({ email, id, userName, isLoggedIn: true }),

      setGameUidList: (gameUIDList) => set({ gameUIDList }),

      logout: () => {
        localStorage.removeItem("access_token");
        set({ email: "", id: "",userName:"",gameUIDList:[], isLoggedIn: false });
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
