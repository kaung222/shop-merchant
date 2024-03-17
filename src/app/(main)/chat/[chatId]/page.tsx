"use client";

import { useDeleteMessage } from "@/api/chat/useDeleteMessage";
import { useGetMessagesByChatId } from "@/api/chat/useGetMessagesByChatId";
import { useSendMessage } from "@/api/chat/useSendMessage";
import IconClose from "@/assets/icons/IconClose";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, getItemFromLocalStorage } from "@/lib/utils";
import { sendMessageSchema } from "@/validators/message_validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";
type messageProps = {
  senderId: string;
  content: string;
  isAcked: false;
  image: string;
  id: string;
};
type TypingProps = { id: string; name: string } | null;
type DetailProps = {
  params: {
    chatId: string;
  };
};
const Page = ({ params }: DetailProps) => {
  const chatId = params.chatId;
  const { data } = useGetMessagesByChatId(chatId);
  const [messages, setMessages] = useState<messageProps[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [typing, setTyping] = useState<TypingProps>(null);
  const scrollRef = useRef(null);
  const merchant = getItemFromLocalStorage("user");
  const { mutate: sendMessage } = useSendMessage();
  const { mutate: deleteMessage } = useDeleteMessage();

  const form = useForm({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: { message: "", image: undefined },
  });
  socket?.on("recieveMessage", (data: any) => {
    setMessages([data, ...messages]);
    setTyping(null);
  });

  socket?.on("deleteMessage", (messageId: string) => {
    setMessages(
      messages.map((message) => {
        if (message.id === messageId) message.content = "deleted message";
        return message;
      })
    );
  });

  socket?.on("typing", (data: TypingProps) => {
    setTyping(data);
    setTimeout(() => {
      setTyping(null);
    }, 3000);
  });

  // for sending messages
  const handleSendMessage = async (values: any) => {
    const formData = new FormData();
    console.log(values.image[0]);

    formData.append("message", values.message);
    if (values.image[0]) {
      formData.append("image", values.image[0]);
    }
    formData.append("senderId", merchant.id);
    formData.append("chatId", chatId);
    sendMessage(formData);
    setTyping(null);
    form.reset();
  };
  // delete message
  const handleDeleteMessage = (id: string) => {
    deleteMessage(
      { id },
      {
        onSuccess() {
          toast.success("Delete success");
        },
        onError(err) {
          //@ts-expect-error
          toast.error(err?.response.data.message);
          console.log(err);
        },
      }
    );
  };
  // typing socket connect
  const handleTyping = () => {
    socket?.emit("typing", { id: "1235", name: "marcus", chatId });
  };

  //for connecting socket initially
  useEffect(() => {
    const socket = io("http://localhost:8080", { autoConnect: true });
    setSocket(socket);
    if (socket) {
      socket.emit("join-room", { chatId });
    }
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      //@ts-expect-error
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  return (
    <div className=" p-5">
      <Link href={"/chat"} className="">
        Back
      </Link>
      <div className="p-3 h-[400px] space-y-2 overflow-y-auto border border-slate-400 rounded-lg my-5">
        {messages
          ?.map((message, index) => {
            return (
              <div className=" rounded-md " key={index}>
                <Link href={`merchants/message.senderId`}>see profile</Link>
                <p
                  className={cn(
                    "p-2",
                    message.senderId === merchant.id ? "text-end" : " "
                  )}
                  ref={scrollRef}
                >
                  {message.content}
                  <span
                    className={cn(
                      " cursor-pointer text-red-500",
                      message.senderId !== merchant.id && "hidden"
                    )}
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    delete
                  </span>
                </p>
                {message?.image ? (
                  <img src={message?.image} className=" max-w-[200px]" alt="" />
                ) : (
                  ""
                )}
              </div>
            );
          })
          .reverse()}
        {typing && (
          <p className="">
            <i>{typing?.name} is typing</i>
          </p>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSendMessage)}
          className="flex items-center justify-center gap-3"
        >
          <input
            type="file"
            id="file-input"
            className="hidden"
            {...form.register("image")}
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <IconClose className=" rotate-45" />
          </label>
          <Input
            required
            type="text"
            className=" border border-slate-500"
            placeholder="Message"
            {...form.register("message")}
            onKeyDown={handleTyping}
          />
          <Button className="">Send</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
