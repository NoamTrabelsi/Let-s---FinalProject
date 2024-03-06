import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity  } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


function Registration() {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);

  const handleRegistration = () => {
    // Perform registration logic with the entered data
    console.log('Register pressed', {
      email: userEmail,
      password: userPassword,
      gender: selectedGender,
    });
  };

    return (
      <View>
        <Text>Welcome to Registration Page!</Text>
        
        <Text>First Name</Text>
        <TextInput
          placeholder="Enter your first name"
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
        />

        <Text>Last Name</Text>
        <TextInput
          placeholder="Enter your last name"
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
        />

         {/* Gender */}
        <Text>Gender</Text>
        <DropDownPicker
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          defaultValue={selectedGender}
          containerStyle={{ height: 50, marginTop: 10, width: '60%' }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedGender(item.value)}
        />

        {/* User email */}
        <Text>User email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />

        {/* Password */}
        <Text>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={styles.input_container}
          secureTextEntry={true}
          textContentType="password"
          value={userPassword}
          onChangeText={(text) => setUserPassword(text)}
        />

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>



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
      margin: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
  });

export default Registration;