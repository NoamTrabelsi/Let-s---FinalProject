import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const inputContainerTranslateY = scrollY.interpolate({
    inputRange: [0, inputContainerHeight],
    outputRange: [0, -inputContainerHeight],
    extrapolate: "clamp",
  });

  const chats = [
    {
      id: 1,
      name: "Alex",
      message: "I was thinking the same",
      time: "14:36",
      image: "https://via.placeholder.com/150",
      unreadCount: 3,
    },
    {
      id: 2,
      name: "Alex",
      message: "I was thinking the same",
      time: "14:36",
      image: "https://via.placeholder.com/150",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Alex",
      message: "I was thinking the same",
      time: "14:36",
      image: "https://via.placeholder.com/150",
      unreadCount: 0,
    },
  ];

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
          <Image source={require("../assets/chat.png")} style={styles.image} />
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
          <View key={chat.id} style={styles.chatItem}>
            <Image source={{ uri: chat.image }} style={styles.avatar} />
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatMessage}>{chat.message}</Text>
            </View>
            <View style={styles.chatMeta}>
              <Text style={styles.chatTime}>{chat.time}</Text>
              {chat.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
  },
  headerContainer: {
    backgroundColor: "#FF8C00",
    paddingBottom: 10,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
  unreadBadge: {
    backgroundColor: "orange",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 5,
  },
  unreadCount: {
    color: "white",
    fontSize: 12,
  },
});

export default ChatScreen;
