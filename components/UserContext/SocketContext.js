import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io(`https://${process.env.EXPO_PUBLIC_HOST}`, {
      transports: ["websocket", "polling"],
      path: "/socket.io",
    });

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
