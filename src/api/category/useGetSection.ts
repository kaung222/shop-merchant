import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Section } from "@/types/category";

export const useGetSections = () => {
  return useQuery<Section[]>({
    queryKey: ["GetSections"],
    queryFn: async () => {
      return await apiClient.get("category").then((res) => res.data);
    },
  });
};
