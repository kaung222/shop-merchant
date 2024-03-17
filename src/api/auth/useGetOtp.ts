import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useGetOtp = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await apiClient
        .post("auth/login/otp", payload)
        .then((res) => res.data);
    },
  });
};
