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
  KeyboardAvoidingView,
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

  const handleLogin = () => {
    setLoading(true);
    const userData = {
      email: email,
      password,
    };
    axios
      .post("http://192.168.0.148:5001/login", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          AsyncStorage.setItem("token", res.data.data.token);
          const token = res.data.data.token;
          axios
            .post("http://192.168.0.148:5001/user", { token })
            .then((userRes) => {
              if (userRes.data.status === "ok") {
                fetchUserData(userRes.data.data._id);
                //setLoading(false);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "UserNav" }],
                  })
                );
              } else {
                console.log("Error fetching user:", userRes.data.data);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ImageBackground
      source={require("../assets/splash-simple.png")}
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.formContainer}>
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
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Registration")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    width: "80%",
    height: "6%",
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
