import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Product } from "@/types/product";
import { getItemFromLocalStorage } from "@/lib/utils";
type GetProductProps = {
  page: string;
  limit: string;
  search: string;
  sort: string;
  category: string;
};
type Products = {
  products: Product[];
  page: number;
  limit: number;
  lastPage: number;
  total: number;
};

export const useGetProducts = (props: GetProductProps) => {
  const { page, limit, search, sort, category } = props;
  return useQuery<Products>({
    queryKey: ["GetProducts", page, limit, search, sort, category],
    queryFn: async () => {
      return await apiClient
        .get(`/products/merchant/`, {
          params: {
            categoryId: category,
            query: search,
            limit,
            page,
            sort_by_date: sort,
          },
        })
        .then((res) => res.data);
    },
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};
