import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


function Settings() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        width: '60%',
    },
    buttonText: {
    color: 'white',
    fontWeight: 'bold',    
    },
});

export default Settings