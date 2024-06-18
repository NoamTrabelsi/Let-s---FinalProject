import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings() {
  const navigation = useNavigation();
  const { resetUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Удаление токена из AsyncStorage
      await AsyncStorage.removeItem("token");

      // Сброс состояния пользователя
      resetUser();

      // Переход на страницу логина
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "LogIn" }] })
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      {/* Log Out Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
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
    width: "60%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Settings;
