import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Merchant, User } from "@/types/user";

export type ChatsRes = {
  id: string;
  user: User;
  merchant: Merchant;
  ackedUserIds: string[];
};
export const useGetChats = (merchantId: string) => {
  return useQuery<ChatsRes[]>({
    queryKey: ["GetChats"],
    queryFn: async () => {
      return await apiClient
        .get(`chats/user/${merchantId}`)
        .then((res) => res.data);
    },
  });
};
