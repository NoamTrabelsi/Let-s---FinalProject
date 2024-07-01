import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io(`https://${process.env.EXPO_PUBLIC_HOST}`, {
      transports: ["websocket", "polling"],
      path: "/socket.io",
    });

    socket.current.on("connect", () => {
      console.log(`${user.firstName} connected to socket server (context)`);
    });

    socket.current.on("receiveMessage", (data) => {
      if (data.receiverId === user._id) {
        console.log(`Received message for ${data.receiverId}  (context)`);
      }
    });

    return () => {
      socket.current.disconnect();
      console.log(`${user.firstName} disconnected (context)`);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
