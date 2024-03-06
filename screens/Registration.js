import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';


function Registration() {
    return (
      <View>
        <Text>Welcome to Registration Page!</Text>
      </View>
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
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      margin: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
  });

export default Registration;