import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useGetOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ["GetOrder"],
    queryFn: async () => {
      return await apiClient.get("orders/" + id).then((res) => res.data);
    },
  });
};
