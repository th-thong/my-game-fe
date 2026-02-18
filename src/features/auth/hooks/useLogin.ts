import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/features/auth/api/auth";
import { accountApi } from "@/services/accountMng";
import { gameAccountApi } from "@/services/gameAccount";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setGameUidList = useUserStore((state) => state.setGameUidList);

  const mutation = useMutation({
    mutationFn: (variables: { email: string; password: string }) =>
      authApi.login(variables),

    onSuccess: async (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      navigate("/");

      try {
        const [accountData, gameAccountList] = await Promise.all([
          accountApi.getAccountData(),
          gameAccountApi.getGameUidList(),
        ]);

        setUser(accountData.email, accountData.id, accountData.user_name);
        setGameUidList(gameAccountList);
      } catch (error) {
        console.error("Sync data failed:", error);
        toast.error("Logged in, but failed to sync profile data.");
      }
    },

    onError: (error: Error) => {
      console.error("Login error", error.message);
      toast.error("Login error!", {
        description: "An error occurred during login.",
        position: "bottom-right",
      });
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
};
