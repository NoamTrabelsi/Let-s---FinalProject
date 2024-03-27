import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';

function Registration() {

  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const handleRegistration = () => {
    // Perform registration logic with the entered data

    navigation.navigate('ProfileInfo')

    console.log("Register pressed", {
      first_name: userName,
      last_name: userLastName,
      email: userEmail,
      password: userPassword,
      gender: selectedGender,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
      <Text>First Name</Text>
      <TextInput
        placeholder="Enter your first name"
        style={styles.input_container}
        autoCapitalize="none"
        textContentType="username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      <Text>Last Name</Text>
      <TextInput
        placeholder="Enter your last name"
        style={styles.input_container}
        autoCapitalize="none"
        textContentType="username"
        value={userLastName}
        onChangeText={(text) => setUserLastName(text)}
      />

      <Text>Gender</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.input_container}
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
      {/* Confirm Password */}
      <Text>Confirm Password</Text>
      <TextInput
        placeholder="Confirm your password"
        style={styles.input_container}
        secureTextEntry={true}
        textContentType="password"
        value={userPassword}
        onChangeText={(text) => setUserConfirmPassword(text)}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00'
  },
  formContainer: {
    width: '50%', // Container takes 80% of the screen width
    alignItems: 'center',
},
  input_container: {
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
    backgroundColor: "#808080", // Matching HomeScreen's button color
    padding: 10,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Registration;
