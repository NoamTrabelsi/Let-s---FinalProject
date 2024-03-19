import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import LogIn from "./screens/LogIn";
import Registration from "./screens/Registration";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import Settings from "./screens/Settings";
import ProfileInfo from "./screens/ProfileInfo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UserNav() {
  return (
    <Tab.Navigator initialRouteName = "HomeScreen" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Search" component={HomeScreen} options = {{tabBarIcon:({color, size}) => (<Octicons name="search" size={size} color={color} />)}}/>
      <Tab.Screen name="Chat" component={Chat} options = {{tabBarIcon:({color, size}) => (<Ionicons name="chatbubble-outline" size={size} color={color} />)}}/>
      <Tab.Screen name="Profile" component={Profile} options = {{tabBarIcon:({color, size}) => (<MaterialCommunityIcons name="account" size={size} color={color} />)}}/>
      <Tab.Screen name="Settings" component={Settings} options = {{tabBarIcon:({color, size}) => (<SimpleLineIcons name="settings" size={size} color={color} />)}}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn" screenOptions={{headerShown: false}}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
