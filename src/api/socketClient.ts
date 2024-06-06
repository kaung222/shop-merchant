import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const useConnectSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io("http://localhost:4444", { autoConnect: true });
    socket && setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);
  return { socket };
};
