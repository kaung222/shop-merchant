import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useGetChatWithIds = (merchantId: string, userId: string) => {
  return useQuery({
    queryKey: ["GetChatWithIds"],
    queryFn: async () => {
      return await apiClient
        .get("chats/get-chat-with-ids", {
          params: {
            userId,
            merchantId,
          },
        })
        .then((res) => res.data);
    },
  });
};
