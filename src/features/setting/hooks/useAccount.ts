import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/services/api";

const getErrorMessage = (error: unknown, fallbackMsg: string) => {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error || fallbackMsg;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMsg;
};

export function useAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const deleteAccount = async () => {
    setIsDeleting(true);
    try {
      await api.delete("/account/");
      toast.success("Account deleted successfully!");
      logout();
      navigate("/");
    } catch (error: unknown) {
      console.error("Delete account failed:", error);
      toast.error(getErrorMessage(error, "Delete account failed"));
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteAccount,
    isDeleting,
  };
}
