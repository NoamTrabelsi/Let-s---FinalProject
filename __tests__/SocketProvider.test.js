import React from "react";
import { View, Text, Button } from "react-native"; // Import necessary components
import { render, act, fireEvent } from "@testing-library/react-native";
import {
  SocketProvider,
  useSocket,
} from "../components/UserContext/SocketContext"; // Adjust the import path as necessary
import { UserProvider } from "../components/UserContext/UserContext";
import { io } from "socket.io-client";

jest.mock("socket.io-client");

const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn(),
};

io.mockReturnValue(mockSocket);

const TestComponent = () => {
  const { newMessage, resetNewMessage } = useSocket();
  return (
    <View>
      <Text>{newMessage ? "New message received" : "No new messages"}</Text>
      <Button title="Reset" onPress={resetNewMessage} />
    </View>
  );
};

describe("SocketProvider", () => {
  const user = { _id: "user123", firstName: "John" };

  it("connects and disconnects the socket on mount and unmount", () => {
    const { unmount } = render(
      <UserProvider value={{ user }}>
        <SocketProvider>
          <TestComponent />
        </SocketProvider>
      </UserProvider>
    );

    expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith(
      "receiveMessage",
      expect.any(Function)
    );
    expect(mockSocket.disconnect).not.toHaveBeenCalled();

    unmount();

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
