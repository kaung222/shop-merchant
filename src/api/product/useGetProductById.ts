import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Product } from "@/types/product";

export const useGetProductById = (id: string) => {
  return useQuery<Product, any, Product>({
    queryKey: ["GetProduct"],
    queryFn: async () => {
      return await apiClient
        .get("products/" + id)
        .then((res) => res.data)
        .catch((err) => err.data.response.data.message);
    },
  });
};
