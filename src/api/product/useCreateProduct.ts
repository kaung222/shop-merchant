import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { CreateProductProps } from "@/types/product";
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, CreateProductProps>({
    mutationFn: async (payload) =>
      await apiClient
        .post("products", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),

    onSuccess: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
        exact: false,
      });
    },
  });
};
