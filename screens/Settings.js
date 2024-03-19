import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProfileInfo from './ProfileInfo';


function Settings() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ProfileInfo />
            {/* Log Out Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: 'LogIn'}]}))}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF8C00",
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        width: '60%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
    color: 'white',
    fontWeight: 'bold',    
    },
});

export default Settings