"use client";
import { useCreateChat } from "@/api/chat/useCreateChat";
import { useGetUsers } from "@/api/user/useGetUsers";
import { getItemFromLocalStorage } from "@/lib/utils";

const Page = () => {
  const { data, error } = useGetUsers();
  const createChat = useCreateChat();
  const user = getItemFromLocalStorage("user");
  const handleCreateChat = (id: string) => {
    createChat.mutate({ participants: [user.id, id] });
  };
  if (data?.users.length === 0) return <p>No users found to chat</p>;
  if (error) return <p>Server is not responding.</p>;
  return (
    <div>
      {data?.users?.map((user) => {
        return (
          <div className="" key={user.id}>
            {user.id}
            <button
              className=" bg-slate-200 p-3"
              onClick={() => handleCreateChat(user.id)}
            >
              chat
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
