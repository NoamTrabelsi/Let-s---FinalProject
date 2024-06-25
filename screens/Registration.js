import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lOCAL_HOST, SERVER_PORT, SOCKET_PORT } from "@env";

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
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const handleRegistration = async () => {
    const userData = {
      firstName: userName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      gender: selectedGender,
    };

    try {
      setLoading(true);
      const registerResponse = await registerUser(userData);
      if (registerResponse.status === "ok") {
        await loginUser(userData);
      } else {
        console.log(registerResponse.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        `http://${lOCAL_HOST}:${SERVER_PORT}/register`,
        userData
      );
      if (response.data.status === "ok") {
        const userId = response.data.data.id;
        await fetchUserData(userId);
      }
      return response.data;
    } catch (err) {
      console.error("Error registering user:", err);
      throw err;
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        `http://${lOCAL_HOST}:${SERVER_PORT}/login`,
        userData
      );
      if (response.data.status === "ok") {
        const token = response.data.data.token;
        await AsyncStorage.setItem("token", token);
        await fetchUserWithToken(token);
        navigation.navigate("ProfileInfo");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      throw err;
    }
  };

  const fetchUserWithToken = async (token) => {
    try {
      const response = await axios.post(
        `http://${lOCAL_HOST}:${SERVER_PORT}/user`,
        {
          token,
        }
      );
      if (response.data.status === "ok") {
        setUser(response.data.data);
        fetchUserData(response.data.data._id);
      } else {
        console.log("Error fetching user:", response.data.data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
      >
        <Modal visible={loading} transparent={true}>
          <View style={styles.loading}>
            <Image
              source={require("../assets/lets-animated.gif")}
              style={styles.loadingImage}
            />
          </View>
        </Modal>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            disableScrollViewPanResponder={true}
          >
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
                listMode="SCROLLVIEW"
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegistration}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingImage: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
});

export default Registration;
