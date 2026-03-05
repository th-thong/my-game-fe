import { create } from "zustand";
import { persist } from "zustand/middleware";
import api, { setAccessToken } from "@/services/api";

export interface GameAccount {
  id: string;
  uid: string;
  oauthCode: string | null;
}

interface ApiGameAccount {
  id: string;
  uid: string;
  oauth_code: string | null;
}

interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  gameAccountList: GameAccount[];
  _hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setLoggedIn: (status: boolean) => void;
  setGameAccountList: (list: GameAccount[]) => void;

  initAuth: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  logout: () => Promise<void>;
  addGameAccount: (uid: string) => Promise<void>;
  deleteGameAccount: (uid: string) => Promise<void>;
  updateOauthCode: (uid: string, newOauthCode: string) => Promise<void>;
}

let isInitialAuthing = false;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      gameAccountList: [],
      isLoggedIn: false,
      isLoading: true,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setGameAccountList: (list) => set({ gameAccountList: list }),

      addGameAccount: async (uid: string) => {
        const res = await api.post("/account/game-account/", { uid });

        const newAccount: GameAccount = {
          id: res.data.id,
          uid: res.data.uid,
          oauthCode: res.data.oauth_code || null,
        };

        set((state) => ({
          gameAccountList: [...state.gameAccountList, newAccount],
        }));
      },

      deleteGameAccount: async (uid: string) => {
        await api.delete(`/account/game-account/${uid}/`);
        set((state) => ({
          gameAccountList: state.gameAccountList.filter(
            (acc) => acc.uid !== uid,
          ),
        }));
      },

      updateOauthCode: async (uid: string, newOauthCode: string) => {
        await api.post("/account/game-account/", {
          uid: uid,
          oauth_code: newOauthCode,
        });

        set((state) => ({
          gameAccountList: state.gameAccountList.map((acc) =>
            acc.uid === uid ? { ...acc, oauthCode: newOauthCode } : acc,
          ),
        }));
      },

      fetchUserData: async () => {
        try {
          const gameRes = await api.get("/account/game-account/");

          const accounts: GameAccount[] = gameRes.data.map((item: ApiGameAccount) => ({
            id: item.id,
            uid: item.uid,
            oauthCode: item.oauth_code || null,
          }));

          set({
            gameAccountList: accounts,
            isLoggedIn: true,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ isLoggedIn: false, isLoading: false });
        }
      },

      logout: async () => {
        try {
          await api.post(
            "/account/dj-rest-auth/logout/",
            {},
            { withCredentials: true },
          );
        } catch (error){
          console.error("Server logout failed:", error);
        } finally {
          setAccessToken(null);
          set({
            gameAccountList: [],
            isLoggedIn: false,
          });
        }
      },

      initAuth: async () => {
        if (isInitialAuthing) return;
        isInitialAuthing = true;
        set({ isLoading: true });

        try {
          const res = await api.post(
            "/account/refresh/",
            {},
            { withCredentials: true },
          );
          setAccessToken(res.data.access);
          await get().fetchUserData();
        } catch {
          set({ isLoggedIn: false, isLoading: false });
        } finally {
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
        gameAccountList: state.gameAccountList,
      }),
    },
  ),
);
