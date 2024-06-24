import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { io } from "socket.io-client";
import axios from "axios";

function Chat() {
  const route = useRoute();
  const { image, name, receiverId, senderId } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const socket = useRef(null);

  useEffect(() => {
    // connect to socket server
    socket.current = io("http://192.168.0.148:5000");

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.current.on("receiveMessage", async (newMessage) => {
      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollViewRef.current.scrollToEnd({ animated: true });

      // Mark the message as read if it is from the receiver
      if (newMessage.senderId === receiverId) {
        try {
          await axios.post("http://192.168.0.148:5001/mark_as_read", {
            messages: [newMessage._id],
          });

          // Update the message state to set isRead to true
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg._id === newMessage._id ? { ...msg, isRead: true } : msg
            )
          );
        } catch (err) {
          console.error("Error marking message as read:", err);
        }
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [receiverId]);

  const sendMessage = async (senderId, receiverId) => {
    const newMessage = {
      senderId,
      receiverId,
      message,
      isRead: false,
    };
    socket.current.emit("sendMessage", newMessage);
    setMessage("");
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://192.168.0.148:5001/messages", {
        params: { senderId, receiverId },
      });

      const fetchedMessages = response.data.data;

      // Mark messages as read
      const unreadMessages = fetchedMessages.filter(
        (msg) => msg.senderId === receiverId && !msg.isRead
      );

      if (unreadMessages.length > 0) {
        unreadMessages.forEach(async (msg) => {
          try {
            await axios.post("http://192.168.0.148:5001/mark_as_read", {
              messages: [msg._id],
            });

            // Update the message state to set isRead to true
            setMessages((prevMessages) =>
              prevMessages.map((m) =>
                m._id === msg._id ? { ...m, isRead: true } : m
              )
            );
          } catch (err) {
            console.error("Error marking message as read:", err);
          }
        });
      }

      setMessages(fetchedMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(time).toLocaleTimeString("en-US", options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages.map((item, index) => (
            <View
              key={index}
              style={[
                item.senderId === senderId
                  ? {
                      alignSelf: "flex-end",
                      backgroundColor: "gray",
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      maxWidth: "80%",
                    }
                  : {
                      alignSelf: "flex-start",
                      backgroundColor: "#FF8C00",
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      maxWidth: "80%",
                    },
              ]}
            >
              <Text>{item.message}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 9, textAlign: "right", color: "white" }}
                >
                  {formatTime(item.time)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            placeholderTextColor={"gray"}
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendMessage(senderId, receiverId)}
          >
            <FontAwesome name="send" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8C00",
    paddingBottom: 10,
    paddingTop: 40,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "15%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {},
});

export default Chat;
