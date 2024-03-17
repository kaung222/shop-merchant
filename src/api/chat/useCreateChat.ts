import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useCreateChat = () => {
  return useMutation({
    mutationFn: async (payload: { userId: string; merchantId: string }) => {
      return await apiClient.post("chats", payload).then((res) => res.data);
    },
  });
};
