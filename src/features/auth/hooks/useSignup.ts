import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth";
import { toast } from "sonner";

export const useSignup = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (variables: {
      user_name: string;
      email: string;
      password: string;
    }) => authApi.signUp(variables),

    onSuccess: (data) => {
      console.log("Successfully signed up", data);
      toast.success("Account created!", {
        description: "You can now use your credentials to log in.",
        position: "bottom-right",
      });
      navigate("/login");
    },

    onError: (error: Error) => {
      console.error("Signup error", error.message);
            toast.error("Signup error!", {
        description: "An error occurred during registration.",
        position: "bottom-right",
      });
    },
  });
  return {
    signup: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
