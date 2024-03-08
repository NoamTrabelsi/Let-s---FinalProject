// //create a new page called HomeScreen.js
// import React from 'react';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import Profile from './Profile';
// import Home from './Home';
// import Settings from './Settings';
// import { Ionicons } from '@expo/vector-icons';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function HomeScreen() {
//     return (
//         <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
    
//             if (route.name === 'Home') {
//                 iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Profile') {
//                 iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'Settings') {
//                 iconName = focused ? 'settings' : 'settings-outline';
//             }
    
//             return <Ionicons name={iconName} size={size} color={color} />;
//             },
//         })}
//         tabBarOptions={{
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'gray',
//         }}
//         >
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Profile" component={Profile} />
//         <Tab.Screen name="Settings" component={Settings} />
//         </Tab.Navigator>
//     );
//     }

// export default HomeScreen;

// enpty page called HomeScreen.js
 import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile';


function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Home Screen</Text>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;