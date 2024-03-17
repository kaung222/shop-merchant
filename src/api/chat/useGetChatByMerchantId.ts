// import { useQuery } from "@tanstack/react-query";
// import { apiClient } from "../apiClient";

// export const useGetChatsByMerchantId = (merchantId: string) => {
//   return useQuery({
//     queryKey: ["GetChatsByMerchantId"],
//     queryFn: async () => {
//       return await apiClient
//         .get("chats/get-chat-with-ids", {
//           params: {
//             merchantId,
//           },
//         })
//         .then((res) => res.data);
//     },
//   });
// };
