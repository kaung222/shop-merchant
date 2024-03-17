import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useDeleteChat = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await apiClient
        .delete("chats/" + payload.id)
        .then((res) => res.data);
    },
  });
};
