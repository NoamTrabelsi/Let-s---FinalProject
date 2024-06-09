import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Destination from "../components/ProfileInfo/Destination";
import About from "../components/ProfileInfo/About";
import Food from "../components/ProfileInfo/Food";
import Sleep from "../components/ProfileInfo/Sleep";
import GetKnow from "../components/ProfileInfo/GetKnow";
import Adventure from "../components/ProfileInfo/Adventure";
import Movement from "../components/ProfileInfo/Movement";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { UserContext } from "../components/UserContext/UserContext";

function ProfileInfo() {
  const navigation = useNavigation();
  const { user, updateUser } = useContext(UserContext);

  const [userFoodInfo, setUserFoodInfo] = useState(user.interests.food);
  const [userSleepInfo, setUserSleepInfo] = useState(user.interests.sleep);
  const [userMovementInfo, setUserMovementInfo] = useState(
    user.interests.movement
  );
  const [userAdventureInfo, setUserAdventureInfo] = useState(
    user.interests.adventure
  );
  const [aboutUser, setAboutUser] = useState(user.about);

  const handleLogIn = () => {
    updateUser("interests.food", userFoodInfo);
    updateUser("interests.sleep", userSleepInfo);
    updateUser("interests.movement", userMovementInfo);
    updateUser("interests.adventure", userAdventureInfo);
    updateUser("about", aboutUser);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "UserNav" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <GetKnow />
          <About aboutUser={aboutUser} setAboutUser={setAboutUser} />
          <Food userFoodInfo={userFoodInfo} setUserFoodInfo={setUserFoodInfo} />
          <Sleep
            userSleepInfo={userSleepInfo}
            setUserSleepInfo={setUserSleepInfo}
          />
          <Movement
            userMovementInfo={userMovementInfo}
            setUserMovementInfo={setUserMovementInfo}
          />
          <Adventure
            userAdventureInfo={userAdventureInfo}
            setUserAdventureInfo={setUserAdventureInfo}
          />
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity style={styles.createBtm} onPress={handleLogIn}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00",
    paddingBottom: 24,
    paddingTop: 24,
  },
  viewBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  createBtm: {
    marginTop: 32,
    width: 180,
    height: 50,
    backgroundColor: "#808080",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
