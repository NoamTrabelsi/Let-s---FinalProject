import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    if (!user) return; // Подождите, пока пользователь не будет доступен

    // Initialize the socket connection
    // socket.current = io(`https://${process.env.EXPO_PUBLIC_HOST}`, {
    //   transports: ["websocket", "polling"],
    //   path: "/socket.io",
    // });

    socket.current = io("http://192.168.0.153:5000");

    socket.current.on("connect", () => {
      console.log(`${user.firstName} подключен к сокет-серверу (context)`);
    });

    socket.current.on("receiveMessage", (data) => {
      if (data.receiverId === user._id) {
        console.log(`Получено сообщение для ${data.receiverId} (context)`);
        setNewMessage(true);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log(`${user.firstName} отключен (context)`);
      }
    };
  }, [user]);

  const resetNewMessage = () => {
    setNewMessage(false);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        newMessage,
        setNewMessage,
        resetNewMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
