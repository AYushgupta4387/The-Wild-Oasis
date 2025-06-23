import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // Manually setting the query data after logging in successfully so that after login, the ProtectedRoute doesn't call the getUser Function, therefore avoiding an extra call to supabase.
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      toast.error("Provided credentials are incorrect.");
      console.error("Login failed:", error.message);
    },
  });

  return {
    login,
    isLoading,
  };
}
