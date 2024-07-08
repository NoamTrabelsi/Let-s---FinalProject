// components/UserNavigation/UserNav.js
import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Octicons,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import HomeScreen from "../../screens/HomeScreen";
import ProfilePage from "../../screens/ProfilePage";
import Chats from "../../screens/Chat";
import Settings from "../../screens/Settings";
import { UserContext } from "../UserContext/UserContext";
import { useSocket } from "../UserContext/SocketContext";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function UserNav() {
  const { user } = useContext(UserContext);
  const { socket, setNewMessage, resetNewMessage } = useSocket();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}
    >
      <Tab.Screen
        name="Search"
        testID="search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        testID="chats"
        component={Chats}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            resetNewMessage();
          },
        })}
      />
      <Tab.Screen
        name="ProfilePage"
        testID="profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        testID="settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#FF8C00",
    borderRadius: 6,
    width: 25,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default UserNav;
