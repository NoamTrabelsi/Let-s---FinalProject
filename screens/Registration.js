import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";

function Registration() {
  const navigation = useNavigation();
  const { setUser, userInformationTemplate, fetchUserData } =
    useContext(UserContext);

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

    const userData = {
      firstName: userName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      gender: selectedGender,
    };
    axios
      .post("http://192.168.0.148:5001/register", userData)
      .then((res) => {
        if (res.data.status === "ok") {
          const userId = res.data.data.id;
          fetchUserData(userId);
          navigation.navigate("ProfileInfo");
        } else {
          console.log(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/logo-start.png")}
        style={styles.image}
      />
      <View style={styles.formContainer}>
        <TextInput
          placeholder="First name"
          placeholderTextColor={"gray"}
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          placeholder="Last name"
          placeholderTextColor={"gray"}
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
          value={userLastName}
          onChangeText={(text) => setUserLastName(text)}
        />
        <DropDownPicker
          open={open}
          value={selectedGender}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedGender}
          setItems={setItems}
          style={styles.input_container}
          dropDownContainerStyle={styles.dropDownContainer}
          textStyle={styles.dropDownText}
          placeholderStyle={styles.placeholderStyle}
          placeholder="Select gender"
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={"gray"}
          style={styles.input_container}
          autoCapitalize="none"
          textContentType="username"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"gray"}
          style={styles.input_container}
          secureTextEntry={true}
          textContentType="password"
          value={userPassword}
          onChangeText={(text) => setUserPassword(text)}
        />
        <TextInput
          placeholder="Password Validation"
          placeholderTextColor={"gray"}
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  dropDownContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    marginTop: 5,
  },
  dropDownText: {
    color: "black",
  },
  placeholderStyle: {
    color: "gray",
  },
  button: {
    height: 50,
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
    marginBottom: -30,
  },
});

export default Registration;
