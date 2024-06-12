import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";

function LogIn() {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  const userInformation = {
    id: 0,
    firstName: "Cara",
    lastName: "Delevingne",
    email: "caradelevingne@gmail.com",
    password: "123456",
    age: 24,
    gender: "female",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSlvrOvImP4NFWKUoqMAkbtrN3Hrg6mA88lIcdEhy2avwz0qKfI",
    location: "Israel",
    interests: {
      food: [1, 0, 0],
      sleep: [1, 0, 0, 1],
      movement: [0, 0, 0, 1, 1],
      adventure: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    },
    about:
      "It's about time you fell in love with something that will love you back. And that, my friends, is house music. It doesn't judge you, and I won't either.",
    reviews: [
      {
        name: "Liron",
        age: 25,
        location: "Iceland",
        rating: 4,
        text: "This girl is the best. I had such a wonderful and funny time with her.",
      },
      {
        name: "Roi",
        age: 24,
        location: "Russia",
        rating: 5,
        text: "She is the best. I had such a wonderful and funny time with her.",
      },
      {
        name: "Shir",
        age: 25,
        location: "Iceland",
        rating: 3,
        text: "She is the best. I had such a wonderful and funny time with her.",
      },
    ],
  };

  const handleLogin = () => {
    setUser(userInformation);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "UserNav" }],
      })
    );
  };

  return (
    <ImageBackground
      source={require("../assets/splash-simple.png")}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.input}
          autoCapitalize="none"
          textContentType="username"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
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
    borderColor: "black",
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default LogIn;
