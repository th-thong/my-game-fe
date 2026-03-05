import { useState } from "react";
import api from "@/services/api";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const getErrorMessage = (error: unknown, fallbackMsg: string) => {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error || fallbackMsg;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMsg;
};

export function useGameAccount() {
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const gameAccountList = useUserStore((state) => state.gameAccountList);
  const setGameAccountList = useUserStore((state) => state.setGameAccountList);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const createAccount = async (uid: string) => {
    setIsAdding(true);
    try {
      const res = await api.post("/account/game-account/", { uid });

      const newAccount = {
        id: res.data.id,
        uid: res.data.uid,
        oauthCode: res.data.oauth_code || null,
      };

      setGameAccountList([...gameAccountList, newAccount]);
      toast.success("Add game account successfully!");
      return true;
    } catch (error: unknown) {
      console.error("Add game account failed: ", error);
      toast.error(getErrorMessage(error, "Add game account failed"));
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const deleteAccount = async (uid: string) => {
    setIsDeleting(uid);
    try {
      await api.delete("/account/game-account/", {
        data: { uid: uid },
      });

      setGameAccountList(gameAccountList.filter((acc) => acc.uid !== uid));
      toast.success("Delete game account successfully!");
    } catch (error: unknown) {
      console.error("Delete game account failed:", error);
      toast.error(getErrorMessage(error, "Delete game account failed"));
    } finally {
      setIsDeleting(null);
    }
  };

  const updateOauthCode = async (uid: string, newOauthCode: string) => {
    setIsUpdating(uid);
    try {
      await api.put("/account/game-account/", {
        uid: uid,
        oauth_code: newOauthCode,
      });

      setGameAccountList(
        gameAccountList.map((acc) =>
          acc.uid === uid ? { ...acc, oauthCode: newOauthCode } : acc,
        ),
      );
      toast.success(`The OAuth code for UID ${uid} has been saved!`);
      return true;
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "OAuth Code saving failed."));
      return false;
    } finally {
      setIsUpdating(null);
    }
  };

  return {
    createAccount,
    deleteAccount,
    updateOauthCode,
    isAdding,
    isDeleting,
    isUpdating,
  };
}
