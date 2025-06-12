import { loginUser, registerUser } from "@/services/authService";
import { RegisterUser } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

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

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => loginUser(email, password),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error logging in user", error);
      throw error;
    },
  });
};
