import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useSocket } from "../components/UserContext/SocketContext";
import { UserContext } from "../components/UserContext/UserContext";
import { lOCAL_HOST, SERVER_PORT, SOCKET_PORT } from "@env";

function Chat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { image, name, receiverId, senderId, match } = route.params;
  const [match2, setMatch] = useState(match);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [letsGoClicked, setLetsGoClicked] = useState(false);

  const scrollViewRef = useRef(null);
  const { socket } = useSocket();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", async (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollViewRef.current.scrollToEnd({ animated: true });

        if (newMessage.senderId === receiverId) {
          try {
            await axios.post(
              `https://${process.env.EXPO_PUBLIC_HOST}/mark_as_read`,
              {
                messages: [newMessage._id],
              }
            );

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
        socket.off("receiveMessage");
      };
    }
  }, [socket, receiverId]);

  const createMatchInDB = async (user1Id, user2Id) => {
    try {
      await axios.post(`https://${process.env.EXPO_PUBLIC_HOST}/create_match`, {
        user1Id,
        user2Id,
      });
    } catch (err) {
      console.error("Error creating match:", err);
    }
  };

  const checkLetsGoBtn = async () => {
    try {
      const response = await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/check_letsgo_btn`,
        { user1Id: senderId, user2Id: receiverId }
      );

      return response.data.clicked;
    } catch (err) {
      console.error("Error checking let's go button:", err);
    }
  };

  useEffect(() => {
    const init = () => {
      createMatchInDB(senderId, receiverId)
        .then(() => checkLetsGoBtn())
        .then((clicked) => {
          setLetsGoClicked(clicked);
        })
        .catch((error) => {
          console.error("Error in init function:", error);
        });
    };
    init();
  }, [senderId, receiverId]);

  const handleLetsGo = async () => {
    try {
      const response = await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/update_match`,
        {
          user1Id: senderId,
          user2Id: receiverId,
          clickedBy: senderId,
        }
      );

      if (response.data.status === "ok") {
        setLetsGoClicked(true);
      } else {
        console.error("Error updating match");
      }
    } catch (err) {
      console.error("Error updating match:", err);
    }
  };

  const sendMessage = async (senderId, receiverId) => {
    const newMessage = {
      senderId,
      receiverId,
      message,
      match,
      isRead: false,
    };

    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://${process.env.EXPO_PUBLIC_HOST}/messages`,
        {
          params: { senderId, receiverId },
        }
      );

      const fetchedMessages = response.data.data;

      setMatch(response.data.match);

      const unreadMessages = fetchedMessages.filter(
        (msg) => msg.senderId === receiverId && !msg.isRead
      );

      if (unreadMessages.length > 0) {
        unreadMessages.forEach(async (msg) => {
          try {
            await axios.post(
              `https://${process.env.EXPO_PUBLIC_HOST}/mark_as_read`,
              {
                messages: [msg._id],
              }
            );

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

  const navigateToUserPage = async () => {
    try {
      const response = await axios.get(
        `https://${process.env.EXPO_PUBLIC_HOST}/user/${receiverId}`
      );

      navigation.navigate("ProfilePage", {
        foundUser: response.data,
        tripMatch: match2,
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigateToUserPage()}
        >
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            letsGoClicked ? styles.disabledButton : styles.activeButton,
          ]}
          onPress={() => handleLetsGo()}
          disabled={letsGoClicked}
        >
          <Text style={styles.buttonText}>Let's GO</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <Image
          source={require("../assets/chat-background.jpg")}
          style={styles.backgroundImage}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            padding: 10,
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
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.message}</Text>
              <View style={styles.messageMeta}>
                <Text style={styles.messageTime}>{formatTime(item.time)}</Text>
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
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
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
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  sendButton: {},
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFDAB9",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    maxWidth: "80%",
    borderColor: "gray",
    borderWidth: 1,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    maxWidth: "80%",
    borderColor: "gray",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    fontWeight: "500",
  },
  messageMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
  },
  messageTime: {
    fontSize: 10,
    color: "gray",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  activeButton: {
    backgroundColor: "#808080",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default Chat;
