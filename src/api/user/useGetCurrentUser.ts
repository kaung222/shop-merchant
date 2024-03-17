import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { User } from "@/types/user";
type Users = {
  users: User;
  access_token: string;
};

export const useGetCurrentUser = () => {
  return useQuery<User, unknown, Users>({
    queryKey: ["GetUser"],
    queryFn: async () => {
      return await apiClient.get("/users/me").then((res) => res.data);
    },
    staleTime: 1000 * 3600,
    refetchOnWindowFocus: true,
  });
};
