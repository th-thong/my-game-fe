import { useState } from "react";
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
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const deleteGameAccount = useUserStore((state) => state.deleteGameAccount);

  const deleteAccount = async (uid: string) => {
    setIsDeleting(uid);
    try {
      await deleteGameAccount(uid);
      toast.success("Delete game account successfully!");
    } catch (error: unknown) {
      console.error("Delete game account failed:", error);
      toast.error(getErrorMessage(error, "Delete game account failed"));
    } finally {
      setIsDeleting(null);
    }
  };

  return {
    deleteAccount,
    isDeleting,
  };
}
