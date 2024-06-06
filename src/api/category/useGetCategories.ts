import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Category } from "@/types/category";

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["GetCategories"],
    queryFn: async () => {
      return await apiClient.get("sub_category").then((res) => res.data);
    },
  });
};
