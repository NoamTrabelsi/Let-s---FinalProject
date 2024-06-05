import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export const userInformationTamplate = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: 0,
  gender: "",
  image: "",
  location: "",
  interests: {
    food: [],
    sleep: [],
    movement: [],
    adventure: [],
  },
  about: "",
  reviews: [
    {
      name: "",
      age: 0,
      location: "",
      rating: 0,
      text: "",
    },
  ],
};

function LogIn() {
  const navigation = useNavigation();

  {
    /*It will be get from data base*/
  }
  const userInformation = {
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

  return (
    <ImageBackground
      source={require("../assets/splash.png")}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        {/* User email */}
        <Text style={styles.label}>User email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="gray"
          style={styles.input}
          autoCapitalize="none"
          textContentType="username"
        />

        {/* Password (placeholder for future implementation) */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
        />

        {/* Log In Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "UserNav",
                    params: { userInformation },
                  },
                ],
              })
            )
          }
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Create Account */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "Registration",
                  },
                ],
              })
            )
          }
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
    //backgroundColor: '#FF8C00', // Light background color
  },
  formContainer: {
    width: "50%", // Container takes 80% of the screen width
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start", // Align labels to the start
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20, // Rounded corners for input fields
    backgroundColor: "white", // White background for input fields
    width: "100%", // Input fields take the full width of their container
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#808080", // Consistent button background color
    padding: 10,
    borderRadius: 20, // Rounded corners for buttons
    width: "100%", // Buttons take the full width of their container
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LogIn;
