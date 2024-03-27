import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

function LogIn() {
    const navigation = useNavigation();

    return (
      <ImageBackground source={require('../assets/splash.png')} style={styles.container}>
            <View style={styles.formContainer}>
                {/* User email */}
                <Text style={styles.label}>User email</Text>
                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="gray"
                    style={styles.input}
                    autoCapitalize="none"
                    textContentType="username"
                />

                {/* Password (placeholder for future implementation) */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="gray"
                    style={styles.input}
                    secureTextEntry={true}
                    textContentType="password"
                />

                {/* Log In Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: 'UserNav'}]}))}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                {/* Create Account */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Registration')}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#FF8C00', // Light background color
    },
    formContainer: {
        width: '50%', // Container takes 80% of the screen width
        alignItems: 'center',
    },
    label: {
        alignSelf: 'flex-start', // Align labels to the start
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20, // Rounded corners for input fields
        backgroundColor: 'white', // White background for input fields
        width: '100%', // Input fields take the full width of their container
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#808080', // Consistent button background color
        padding: 10,
        borderRadius: 20, // Rounded corners for buttons
        width: '100%', // Buttons take the full width of their container
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LogIn;
