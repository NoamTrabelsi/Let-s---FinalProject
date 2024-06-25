import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function Settings() {
  const navigation = useNavigation();
  const { user, resetUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      resetUser();
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "LogIn" }] })
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("Delete Pressed");
            deleteUser();
          },
          style: "destructive",
        },
      ]
    );
  };

  const deleteUser = async () => {
    try {
      console.log("Deleting user:", user._id);
      const response = await axios.post(`http://192.168.0.148:5001/delete`, {
        id: user._id, // Make sure this matches your user schema
      });
      console.log(response.data);
      await AsyncStorage.removeItem("token");
      resetUser();
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "LogIn" }] })
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "ProfileInfo" }],
            })
          )
        }
      >
        <Text style={styles.buttonText}>Update details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
});

export default Settings;
