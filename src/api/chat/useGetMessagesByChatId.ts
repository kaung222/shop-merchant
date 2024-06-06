import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useGetMessagesByChatId = (chatId: string) => {
  return useQuery({
    queryKey: ["GetMessages"],
    queryFn: async () => {
      return await apiClient
        .get(`chats/${chatId}/messages`)
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
  });
};
