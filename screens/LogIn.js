import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LogIn() {
  const navigation = useNavigation();
  const { setUser, fetchUserData } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.post(
          `https://${process.env.EXPO_PUBLIC_HOST}/user`,
          { token }
        );
        if (res.data.status === "ok") {
          await fetchUserData(res.data.data._id);
        } else {
          console.log("Error fetching user:", res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const userData = {
      email: email,
      password,
    };

    try {
      const res = await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/login`,
        userData
      );
      if (res.data.status === "ok") {
        await AsyncStorage.setItem("token", res.data.data.token);
        await getData();
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "UserNav" }],
          })
        );
      } else {
        console.log("Login failed:", res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/splash-simple.png")}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Modal visible={loading} transparent={true}>
          <View style={styles.loading}>
            <Image
              source={require("../assets/lets-animated.gif")}
              style={styles.loadingImage}
            />
          </View>
        </Modal>
        <Image source={require("../assets/logo.png")} style={styles.image} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.input}
          autoCapitalize="none"
          textContentType="username"
          value={email}
          onChangeText={(text) => setEmail(text)}
          testID="email"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          testID="password"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          testID="loginButton"
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Registration")}
          testID="createAccountButton"
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "50%",
    alignItems: "center",
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: -30,
  },
  input: {
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
    height: 50,
    backgroundColor: "#FF8C00",
    padding: 10,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  alertButton: {
    height: 45,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
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

export default LogIn;
