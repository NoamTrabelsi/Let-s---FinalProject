import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./components/UserContext/UserContext";
import LogIn from "./screens/LogIn";
import Registration from "./screens/Registration";
import ProfileInfo from "./screens/ProfileInfo";
import Settings from "./screens/Settings";
import UserNav from "./components/UserNavigation/UserNav";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LogIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
          <Stack.Screen name="UserNav" component={UserNav} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
