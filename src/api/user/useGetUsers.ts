import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { User } from "@/types/user";
import useSetUrlQuery from "@/lib/useSetUrlQuery";
type Users = {
  users: User[];
  page: number;
  limit: number;
  lastPage: number;
  total: number;
};

export const useGetUsers = () => {
  const { getQuery } = useSetUrlQuery();
  const page = getQuery("page");
  const search = getQuery("search");
  const sort = getQuery("sort");
  const limit = getQuery("limit");
  const status = getQuery("status");

  return useQuery<Users[], unknown, Users>({
    queryKey: ["GetUsers", page, limit, search, sort, status],
    queryFn: async () => {
      return await apiClient
        .get("/users", {
          params: {
            status,
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
