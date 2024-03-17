import { useDeleteChat } from "@/api/chat/useDeleteChat";
import { ChatsRes } from "@/api/chat/useGetChats";
import IconDelete from "@/assets/icons/IconDelete";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "../commons/alert-dialog";
import { getItemFromLocalStorage } from "@/lib/utils";

const ChatItem = ({ chat }: { chat: ChatsRes }) => {
  const user = getItemFromLocalStorage("user");
  const { mutate } = useDeleteChat();
  const handleDeleteChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutate(
      { id: chat.id },
      {
        onSuccess() {
          toast.success("Deleted chat successfully.");
        },
      }
    );
  };
  return (
    <div>
      <Link href={`/chat/${chat.id}`} key={chat.id} className=" mt-3 block">
        <div className="bg-slate-100 p-3 rounded-md w-full flex items-center justify-between">
          <p> {chat?.user.email} </p>

          <p className=" text-orange-400">
            {chat?.ackedUserIds.includes(user?.id) ? "read" : "new"}
          </p>

          <ConfirmDialog
            title="Delete Chat!!!"
            description="Are you sure to delete?"
            onConfirm={handleDeleteChat}
          >
            <IconDelete className="text-red-500" />
          </ConfirmDialog>
        </div>
      </Link>
    </div>
  );
};

export default ChatItem;
