import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";

function Registration() {
  const navigation = useNavigation();
  const { setUser, userInformationTemplate } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const handleRegistration = () => {
    const userInformation = { ...userInformationTemplate };
    userInformation.firstName = userName;
    userInformation.lastName = userLastName;
    userInformation.email = userEmail;
    userInformation.password = userPassword;
    userInformation.gender = selectedGender;

    setUser(userInformation);

    navigation.navigate("ProfileInfo");
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
          value={selectedGender}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedGender}
          setItems={setItems}
          style={styles.input_container}
        />
        <Text>User email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={styles.input_container}
          secureTextEntry={true}
          textContentType="password"
          value={userPassword}
          onChangeText={(text) => setUserPassword(text)}
        />
        <Text>Confirm Password</Text>
        <TextInput
          placeholder="Confirm your password"
          style={styles.input_container}
          secureTextEntry={true}
          textContentType="password"
          value={userConfirmPassword}
          onChangeText={(text) => setUserConfirmPassword(text)}
        />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF8C00",
  },
  formContainer: {
    width: "50%",
    alignItems: "center",
  },
  input_container: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#808080",
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
