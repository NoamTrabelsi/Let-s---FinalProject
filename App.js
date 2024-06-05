import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import LogIn from "./screens/LogIn";
import Registration from "./screens/Registration";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import Settings from "./screens/Settings";
import ProfileInfo from "./screens/ProfileInfo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let userInformation = {
  firstName: "Cara",
  lastName: "Delevingne",
  email: "caradelevingne@gmail.com",
  password: "123456",
  age: 24,
  gender: "female",
  image:
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSlvrOvImP4NFWKUoqMAkbtrN3Hrg6mA88lIcdEhy2avwz0qKfI",
  location: "Israel",
  interests: {
    food: [],
    sleep: [],
    movement: [],
    adventure: [],
  },
  about:
    "It's about time you fell in love with something that will love you back. And that, my friends, is house music. It doesn't judge you, and I won't either.",
  reviews: [
    {
      name: "Liron",
      age: 25,
      location: "Iceland",
      rating: 4,
      text: "This girl is the best. I had such a wonderful and funny time with her.",
    },
    {
      name: "Roi",
      age: 24,
      location: "Russia",
      rating: 5,
      text: "She is the best. I had such a wonderful and funny time with her.",
    },
    {
      name: "Shir",
      age: 25,
      location: "Iceland",
      rating: 3,
      text: "She is the best. I had such a wonderful and funny time with her.",
    },
  ],
};

function UserNav() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
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
        name="Profile"
        component={Profile}
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="UserNav" component={UserNav} />
        <Stack.Screen
          name="ProfileInfo"
          component={ProfileInfo}
          initialParams={{ userInformation: userInformation }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
