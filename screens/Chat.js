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
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import ChatWithUser from "./ChatWithUser";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();

const Chats = () => {
  const navigator = useNavigation();
  const { user } = useContext(UserContext);
  const userId = user._id;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputContainerHeight, setInputContainerHeight] = useState(0);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChatUsers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.148:5001/chat_users/${userId}`
      );
      setChats(response.data.data);
    } catch (error) {
      console.error("Error fetching chat users:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChatUsers();
    }, [])
  );

  const handleChat = () => {
    // Navigate to chat screen
    navigator.navigate("ChatWithUser");
  };

  const inputContainerTranslateY = scrollY.interpolate({
    inputRange: [0, inputContainerHeight],
    outputRange: [0, -inputContainerHeight],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
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
            onPress={handleChat}
          >
            <Image source={{ uri: chat.image }} style={styles.avatar} />
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{chat.firstName}</Text>
              <Text style={styles.chatMessage}>Chat message preview</Text>
            </View>
            <View style={styles.chatMeta}>
              <Text style={styles.chatTime}>Last message time</Text>
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
        name="Chat"
        component={Chats}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatWithUser"
        component={ChatWithUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
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
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    color: "#777",
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
