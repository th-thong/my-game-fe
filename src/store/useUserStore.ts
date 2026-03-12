import { create } from "zustand";
import { persist } from "zustand/middleware";
import api, { setAccessToken } from "@/services/api";
import { useGachaStore } from "@/store/useGachaStore";

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
  selectedGameUid: string | null;
  bannerId: number;

  setBannerId: (bannerId: number) => void;
  setSelectedGameUid: (uid: string | null) => void;
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
      selectedGameUid: null,
      bannerId: 1,

      setBannerId: (bannerId) => set({ bannerId }),
      setSelectedGameUid: (uid) => {
        set({ selectedGameUid: uid });
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setGameAccountList: (list) => set({ gameAccountList: list }),

      addGameAccount: async (uid: string) => {
        const res = await api.post("/account/game-accounts/", { uid });

        const newAccount: GameAccount = {
          id: res.data.id,
          uid: res.data.uid,
          oauthCode: res.data.oauth_code || null,
        };

        set((state) => {
          const newList = [...state.gameAccountList, newAccount];
          const newSelectedUid = state.selectedGameUid
            ? state.selectedGameUid
            : newAccount.uid;

          return {
            gameAccountList: newList,
            selectedGameUid: newSelectedUid,
          };
        });
      },

      deleteGameAccount: async (uid: string) => {
        await api.delete(`/account/game-accounts/${uid}/`);

        set((state) => {
          const newList = state.gameAccountList.filter(
            (acc) => acc.uid !== uid,
          );
          const newSelectedUid = newList.length === 0 ? null : newList[0].uid;
          return {
            gameAccountList: newList,
            selectedGameUid: newSelectedUid,
          };
        });

        Object.keys(localStorage).forEach((key) => {
          if (key.includes(uid)) {
            localStorage.removeItem(key);
          }
        });

        const gachaStore = useGachaStore.getState();
        const newBannerLogs: Record<string, any> = {};
        Object.entries(gachaStore.bannerLogs).forEach(([key, value]) => {
          if (!key.includes(uid)) {
            newBannerLogs[key] = value;
          }
        });
        gachaStore.clearBannerLogs();
        gachaStore.bannerLogs = newBannerLogs;
      },

      updateOauthCode: async (uid: string, newOauthCode: string) => {
        await api.post("/account/game-accounts/", {
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
          const gameRes = await api.get("/account/game-accounts/");

          const accounts: GameAccount[] = gameRes.data.map(
            (item: ApiGameAccount) => ({
              id: item.id,
              uid: item.uid,
              oauthCode: item.oauth_code || null,
            }),
          );

          const currentState = get();
          let currentSelectedUid = currentState.selectedGameUid;

          if (!currentSelectedUid && accounts.length > 0) {
            currentSelectedUid = accounts[0].uid;
          }

          set({
            gameAccountList: accounts,
            isLoggedIn: true,
            isLoading: false,
            selectedGameUid: currentSelectedUid,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ isLoggedIn: false, isLoading: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/account/logout/", {}, { withCredentials: true });
        } catch (error) {
          console.error("Server logout failed:", error);
        } finally {
          setAccessToken(null);
          localStorage.clear();
          set({
            gameAccountList: [],
            isLoggedIn: false,
            selectedGameUid: null,
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
        selectedGameUid: state.selectedGameUid,
        bannerId: state.bannerId,
      }),
    },
  ),
);
