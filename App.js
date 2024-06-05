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
import UserNav from "./components/UserNavigation/UserNav";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
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
