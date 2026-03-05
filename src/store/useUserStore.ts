import { create } from "zustand";
import { persist } from "zustand/middleware";
import api, { setAccessToken } from "@/services/api";
import { isAxiosError } from "axios";

interface UserState {
  email: string;
  id: string;
  userName: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  gameUIDList: string[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setUser: (userData: {
    email: string;
    id: string;
    userName: string;
    gameUIDList?: string[];
  }) => void;
  logout: () => void;
  setGameUidList: (gameUIDList: string[]) => void;
  setLoggedIn: (status: boolean) => void;
  initAuth: () => Promise<void>; // ← thêm
}

let isInitialAuthing = false;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      email: "",
      id: "",
      userName: "",
      gameUIDList: [],
      isLoggedIn: false,
      isLoading: true,

      setUser: ({ email, id, userName, gameUIDList = [] }) =>
        set({
          email,
          id,
          userName,
          gameUIDList,
          isLoggedIn: true,
          isLoading: false,
        }),

      setLoggedIn: (status) => set({ isLoggedIn: status }),

      setGameUidList: (gameUIDList) => set({ gameUIDList }),

      logout: async () => {
        try {
          await api.post(
            "/dj-rest-auth/logout/",
            {},
            { withCredentials: true },
          );
        } catch (error) {
          console.error("Server logout failed:", error);
        } finally {
          setAccessToken(null);

          set({
            email: "",
            id: "",
            userName: "",
            gameUIDList: [],
            isLoggedIn: false,
          });
        }
      },

      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      initAuth: async () => {
        if (isInitialAuthing) return;

        isInitialAuthing = true;
        set({ isLoading: true });

        try {
          const res = await api.post(
            "/refresh/",
            {},
            { withCredentials: true },
          );
          setAccessToken(res.data.access);

          const userRes = await api.get("/dj-rest-auth/user/");
          set({
            email: userRes.data.email,
            id: userRes.data.pk,
            userName: userRes.data.username,
            isLoggedIn: true,
          });
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            console.error("Auth init failed (API):", error.response?.data);
          } else {
            console.error("Auth init failed (Internal):", error);
          }

          set({ isLoggedIn: false });
          await get().logout();
        } finally {
          set({ isLoading: false });
          isInitialAuthing = false;
        }
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(true);
      },
      partialize: (state) => ({
        email: state.email,
        userName: state.userName,
        gameUIDList: state.gameUIDList,
      }),
    },
  ),
);
