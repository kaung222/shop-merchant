import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
type DeleteUserProps = {
  id: string;
};
export const useDeleteuser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, DeleteUserProps>({
    mutationFn: async (payload) => {
      return await apiClient
        .delete("/users/" + payload.id)
        .then((res) => res.data);
    },
    async onSuccess() {
      return await queryClient.invalidateQueries({
        queryKey: ["GetUsers"],
        exact: false,
      });
    },
  });
};
