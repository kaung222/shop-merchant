import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

type UpdateProductProps = {
  id: string;
  data: any;
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, UpdateProductProps>({
    mutationFn: async (payload) =>
      await apiClient
        .patch("products/" + payload.id, payload.data, {
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
