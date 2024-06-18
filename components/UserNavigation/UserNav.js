import React, { useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import HomeScreen from "../../screens/HomeScreen";
import ProfilePage from "../../screens/ProfilePage";
import Chat from "../../screens/Chat";
import Settings from "../../screens/Settings";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

function UserNav() {
  const { setUser, fetchUserData } = useContext(UserContext);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      axios
        .post("http://192.168.0.148:5001/user", { token })
        .then((res) => {
          if (res.data.status === "ok") {
            fetchUserData(res.data.data._id);
          } else {
            console.log("Error fetching user:", res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}
    >
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
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

export default UserNav;
