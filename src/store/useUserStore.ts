import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";
import config from "@/config";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type Unsubscribe } from "firebase/auth";

export interface GameAccount {
  id: string;
  uid: string;
}

interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string | null;
  userEmail: string | null;
  gameAccountList: GameAccount[];
  _hasHydrated: boolean;
  selectedGameUid: string | null;
  bannerId: number;

  setBannerId: (bannerId: number) => void;
  setSelectedGameUid: (uid: string | null) => void;
  setHasHydrated: (state: boolean) => void;

  initAuth: () => Unsubscribe | (() => void);
  noAuthLogin: (email: string, name?: string) => Promise<void>;
  fetchUserData: () => Promise<void>;
  logout: () => Promise<void>;
  addGameAccount: (uid: string) => Promise<void>;
  deleteGameAccount: (uid: string) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      gameAccountList: [],
      isLoggedIn: false,
      isLoading: true,
      userId: null,
      userEmail: null,
      _hasHydrated: false,
      selectedGameUid: null,
      bannerId: 1,

      setBannerId: (bannerId) => set({ bannerId }),
      setSelectedGameUid: (uid) => set({ selectedGameUid: uid }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      noAuthLogin: async (email: string, name?: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch(`${config.apiUrl}account/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name: name || email.split("@")[0], picture: "" }),
          });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Login failed");
          }
          const data = await res.json();
          const pk = data.user?.pk;
          if (!pk) throw new Error("No user ID returned");

          localStorage.setItem("noauth_user_id", pk);
          localStorage.setItem("noauth_user_email", email);
          set({ userId: pk, userEmail: email, isLoggedIn: true, isLoading: false });

          await get().fetchUserData();
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      initAuth: () => {
        if (!config.authMode || !auth) {
          const storedId = localStorage.getItem("noauth_user_id");
          const storedEmail = localStorage.getItem("noauth_user_email");
          if (storedId) {
            set({ userId: storedId, userEmail: storedEmail, isLoggedIn: true });
            get().fetchUserData().finally(() => set({ isLoading: false }));
          } else {
            set({ isLoading: false });
          }
          return () => {};
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            await get().fetchUserData();
            set({ isLoggedIn: true, isLoading: false });
          } else {
            set({
              isLoggedIn: false,
              isLoading: false,
              gameAccountList: [],
              selectedGameUid: null,
            });
          }
        });
        return unsubscribe;
      },

      fetchUserData: async () => {
        try {
          const gameRes = await api.get("account/game-accounts/");
          const accounts: GameAccount[] = gameRes.data.map((item: { user_id?: string; pk?: string; uid: string }) => ({
            id: item.user_id || item.pk || "",
            uid: item.uid,
          }));

          let currentSelectedUid = get().selectedGameUid;
          const isCurrentValid = accounts.some(
            (acc) => acc.uid === currentSelectedUid,
          );

          if (!isCurrentValid && accounts.length > 0) {
            currentSelectedUid = accounts[0].uid;
          } else if (accounts.length === 0) {
            currentSelectedUid = null;
          }

          set({
            gameAccountList: accounts,
            selectedGameUid: currentSelectedUid,
          });
        } catch (error) {
          console.error("Error when fetch user data", error);
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          if (config.authMode && auth) {
            await signOut(auth);
          }
          localStorage.removeItem("noauth_user_id");
          localStorage.removeItem("noauth_user_email");
          set({
            gameAccountList: [],
            isLoggedIn: false,
            selectedGameUid: null,
            userId: null,
            userEmail: null,
          });
        } catch (error) {
          console.error("Logout error", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      addGameAccount: async (uid: string) => {
        const res = await api.post("account/game-accounts/", { uid });
        const newAccount: GameAccount = {
          id: res.data.user_id || res.data.id || "",
          uid: res.data.uid,
        };
        set((state) => ({
          gameAccountList: [...state.gameAccountList, newAccount],
          selectedGameUid: state.selectedGameUid || newAccount.uid,
        }));
      },

      deleteGameAccount: async (uid: string) => {
        await api.delete(`account/game-accounts/${uid}/`);
        set((state) => {
          const newList = state.gameAccountList.filter(
            (acc) => acc.uid !== uid,
          );
          return {
            gameAccountList: newList,
            selectedGameUid: newList.length === 0 ? null : newList[0].uid,
          };
        });
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(true);
      },
      partialize: (state) => ({
        selectedGameUid: state.selectedGameUid,
        bannerId: state.bannerId,
        gameAccountList: state.gameAccountList,
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        userEmail: state.userEmail,
      }),
    },
  ),
);
