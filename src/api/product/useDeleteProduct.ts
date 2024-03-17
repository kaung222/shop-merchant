import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, { id: string }>({
    mutationFn: async (payload) =>
      await apiClient.delete("products/" + payload.id).then((res) => res.data),

    onSuccess: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
        exact: false,
      });
    },
  });
};
