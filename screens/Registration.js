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

function Registration() {
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    marginLeft: "20%",
    marginTop: "30%",
  },
  input_container: {
    padding: 5,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    marginTop: 2,
    width: "60%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Registration;
