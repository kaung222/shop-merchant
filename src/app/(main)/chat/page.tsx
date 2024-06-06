"use client";

import { useGetChats } from "@/api/chat/useGetChats";
import ChatItem from "@/components/chat/ChatItem";
import { getItemFromLocalStorage } from "@/lib/utils";

const Page = () => {
  // const merchant = getItemFromLocalStorage("user");
  const { data: chats } = useGetChats();
  return (
    <div className=" space-y-2 p-5">
      {chats?.map((chat) => {
        return <ChatItem chat={chat} key={chat.id} />;
      })}
    </div>
  );
};

export default Page;
