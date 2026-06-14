import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import config from "@/config";
import { useUserStore } from "@/store/useUserStore";

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchUserData } = useUserStore();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!auth || !googleProvider) throw new Error("Firebase not available");
      const result = await signInWithPopup(auth, googleProvider);

      const idToken = await result.user.getIdToken();

      const response = await fetch(`${config.apiUrl}account/firebase-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      if (!response.ok) {
        let errorMessage = "Login error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // JSON parse failed, use default error message
        }
        throw new Error(errorMessage);
      }

      await auth.currentUser?.getIdToken(true);
      await fetchUserData();

      window.location.href = "/";
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message || "Login failed" : "Login failed";
      console.error("Firebase Auth Error:", err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const noAuthLogin = async (email: string, name?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await useUserStore.getState().noAuthLogin(email, name);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginWithGoogle, noAuthLogin, isLoading, error };
};
