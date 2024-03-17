import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useLogin = () => {
  return useMutation<any, unknown, { emailOrPhone: string; password: string }>({
    mutationFn: async (payload) => {
      return await apiClient
        .post("auth/merchant/login", payload)
        .then((res) => res.data);
    },
  });
};
