import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import ChatWithUser from "./ChatWithUser";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { io } from "socket.io-client";

const Stack = createStackNavigator();

const Chats = () => {
  const navigator = useNavigation();
  const { user } = useContext(UserContext);
  const userId = user._id;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputContainerHeight, setInputContainerHeight] = useState(0);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const socket = useRef(null);

  useEffect(() => {
    // connect to socket server
    socket.current = io("http://192.168.0.148:5000");

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.current.on("receiveMessage", (newMessage) => {
      console.log("newMessage", newMessage);

      // Update the chat list with a new message
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (
            chat._id === newMessage.senderId ||
            chat._id === newMessage.receiverId
          ) {
            return {
              ...chat,
              lastMessage: newMessage.message,
              unreadCount: chat.unreadCount + 1,
            };
          }
          return chat;
        });
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchChatUsers();
    }, [])
  );

  const fetchChatUsers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.148:5001/chat_users/${userId}`
      );
      const chatUsers = response.data.data;

      const chatsWithLastMessages = chatUsers.map((chatUser) => ({
        ...chatUser.user,
        lastMessage: chatUser.lastMessage,
        unreadCount: chatUser.unreadCount,
      }));

      setChats(chatsWithLastMessages);
    } catch (error) {
      console.error("Error fetching chat users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (chat) => {
    // Navigate to chat screen
    navigator.navigate("ChatWithUser", {
      image: chat.image,
      name: chat.firstName,
      receiverId: chat._id,
      senderId: userId,
    });
  };

  const inputContainerTranslateY = scrollY.interpolate({
    inputRange: [0, inputContainerHeight],
    outputRange: [0, -inputContainerHeight],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <Modal visible={loading} transparent={true}>
        <View style={styles.loading}>
          <Image
            source={require("../assets/lets-animated.gif")}
            style={styles.loadingImage}
          />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          { transform: [{ translateY: inputContainerTranslateY }] },
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setInputContainerHeight(height);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/chat.png")}
            style={styles.chatlogo}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: inputContainerHeight }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat._id}
            style={styles.chatItem}
            onPress={() => handleChat(chat)}
          >
            <Image source={{ uri: chat.image }} style={styles.avatar} />
            <View style={styles.chatDetails}>
              <View>
                <Text style={styles.chatName}>
                  {chat.firstName} {chat.lastName}
                </Text>
                <Text style={styles.chatMessage}>{chat.lastMessage}</Text>
              </View>
              {chat.unreadCount > 0 && (
                <View style={styles.unreadCount}>
                  <Text style={styles.unreadCountText}>{chat.unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

function ChatScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatWithUser"
        component={ChatWithUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingImage: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
  },
  headerContainer: {
    backgroundColor: "#FF8C00",
    //paddingBottom: 10,
    paddingTop: 10,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  chatlogo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    color: "#777",
  },
  unreadCount: {
    backgroundColor: "#FF8C00",
    borderRadius: 15,
    width: 30,
    height: 30,
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  unreadCountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 30,
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  chatTime: {
    fontSize: 12,
    color: "#777",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
