"use client";
import { useGetUsers } from "@/api/user/useGetUsers";
import PaginationBar from "@/components/commons/Pagination";
import UserFilterBar from "@/components/users/UserFilterBar";
import UserTable from "@/components/users/UserTable";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const Page = () => {
  // const { data } = useGetUsers();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  socket?.on("recieveMessage", (data) => {
    console.log(data);
  });

  useEffect(() => {
    const socket = io("http://localhost:8080", { autoConnect: true });
    setSocket(socket);
    if (socket) {
      socket.emit("join-room", { chatId: "12345" });
    }
  }, []);
  return (
    <div className="p-3">
      {/* <UserFilterBar />
      <UserTable
        //@ts-expect-error
        users={data?.users}
      />
      <PaginationBar total={data?.total || 0} pageCount={data?.lastPage || 0} /> */}
    </div>
  );
};

export default Page;
