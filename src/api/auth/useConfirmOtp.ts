import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useConfirmOtp = () => {
  return useMutation({
    mutationFn: async (payload: { otp: string; emailOrPhone: string }) => {
      return await apiClient
        .post("auth/merchant/login", payload)
        .then((res) => res.data);
    },
  });
};
