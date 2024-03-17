import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { RegisterValidationSchema } from "@/validators/auth_validator";
import { z } from "zod";

export const useRegister = () => {
  return useMutation<any, unknown, z.infer<typeof RegisterValidationSchema>>({
    mutationFn: async (payload) => {
      return await apiClient
        .post("auth/merchant/register", payload)
        .then((res) => res.data);
    },
  });
};
