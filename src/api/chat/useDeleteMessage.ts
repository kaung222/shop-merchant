import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await apiClient
        .delete("chats/messages/" + payload.id)
        .then((res) => res.data);
    },
  });
};
