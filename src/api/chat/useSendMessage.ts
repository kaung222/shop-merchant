import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (payload: FormData) => {
      return await apiClient
        .post("chats/send-message", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data);
    },
  });
};
