import { registerUser } from "@/services/authService";
import { RegisterUser } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: RegisterUser) =>
      registerUser(user.name, user.email, user.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error registering user", error);
      throw error;
    },
  });
};
