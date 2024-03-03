const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import LOGIN from "./screens/LOGIN";
import HomeScreen from "./screens/HomeScreen";
import Info from "./screens/Info";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import ChatWITH from "./screens/ChatWITH";
import Register from "./screens/Register";
import Component from "./components/Component";
import REVIEWSTIKI from "./components/REVIEWSTIKI";
import FINDERUSER from "./components/FINDERUSER";
import VectorIcon from "./components/VectorIcon";
import VectorIcon1 from "./components/VectorIcon1";
import VectorIcon2 from "./components/VectorIcon2";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }) {
  const [bottomTabItemsNormal] = React.useState([
    <VectorIcon />,
    <VectorIcon1 />,
    <VectorIcon2 />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <VectorIcon />,
    <VectorIcon1 />,
    <VectorIcon2 />,
  ]);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              borderRadius: 19,
              width: 361,
              height: 61,
              overflow: "hidden",
              flexDirection: "row",
            }}
          >
            {bottomTabItemsNormal.map((item, index) => {
              const isFocused = state.index === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate({
                      name: state.routes[index].name,
                      merge: true,
                    });
                  }}
                >
                  {activeIndex === index
                    ? bottomTabItemsActive[index] || item
                    : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "AdventPro-Light": require("./assets/fonts/AdventPro-Light.ttf"),
    "AdventPro-Regular": require("./assets/fonts/AdventPro-Regular.ttf"),
    "AdventPro-Bold": require("./assets/fonts/AdventPro-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
            <Stack.Screen
              name="LOGIN"
              component={LOGIN}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Info"
              component={Info}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatWITH"
              component={ChatWITH}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
