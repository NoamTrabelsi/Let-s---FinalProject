import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

// Create a stack navigator
import { useNavigation } from '@react-navigation/native';


function LogIn() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* User email */}
        <Text>User email</Text>
        <View>
          <TextInput
            placeholder="Enter your email"
            style={styles.input_container}
            autoCapitalize="none"
            textContentType="username"
          />
        </View>

        {/* Password (placeholder for future implementation) */}
        <View>
          <Text>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.input_container}
            secureTextEntry={true}
            textContentType="password"
          />
        </View>

        {/* Log In Button */}
        <TouchableOpacity style={styles.button} onPress={() => console.log('Login pressed')}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    marginLeft: '20%',
    marginTop: '30%',
  },
  input_container: {
    padding: 5,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    marginTop: 10,
    width: '60%',
  },
  button: {
    backgroundColor: 'blue',
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

export default LogIn;