import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

type UpdateOrderProps = {
  id: string;
  data: {
    status: string;
  };
};
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, UpdateOrderProps>({
    mutationFn: async (payload) => {
      await apiClient
        .post("orders/" + payload.id, payload.data)
        .then((res) => res.data);
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["GetOrders"],
        exact: false,
      });
    },
  });
};
