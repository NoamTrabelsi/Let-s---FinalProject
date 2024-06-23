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
  const socket = io("http://192.168.0.148:5000");
  const scrollViewRef = useRef(null);

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("receiveMessage", (newMessage) => {
    console.log("newMessage", newMessage);
    //update the messages state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollViewRef.current.scrollToEnd({ animated: true });
  });

  const sendMessage = async (senderId, receiverId) => {
    socket.emit("sendMessage", { senderId, receiverId, message });

    setMessage("");

    // call the fetchMessages() function to see the UI update
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://192.168.0.148:5001/messages", {
        params: { senderId, receiverId },
      });

      setMessages(response.data.data);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages?.map((item, index) => (
            <View
              key={index}
              style={[
                item?.senderId === senderId
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
              <Text>{item?.message}</Text>
              <Text style={{ fontSize: 9, textAlign: "right", color: "white" }}>
                {formatTime(item?.time)}
              </Text>
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
