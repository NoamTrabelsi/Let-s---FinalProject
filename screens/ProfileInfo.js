import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
import axios from "axios";

function ProfileInfo() {
  const navigation = useNavigation();
  const { user, updateUser, fetchUserData } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) {
      fetchUserData(user._id);
    }
  }, []);
  const [location, setLocation] = useState("");
  const [age, setAge] = useState();
  const [picture, setPicture] = useState(null);
  const [userFoodInfo, setUserFoodInfo] = useState(user.interests.food);
  const [userSleepInfo, setUserSleepInfo] = useState(user.interests.sleep);
  const [userMovementInfo, setUserMovementInfo] = useState(
    user.interests.movement
  );
  const [userAdventureInfo, setUserAdventureInfo] = useState(
    user.interests.adventure
  );
  const [aboutUser, setAboutUser] = useState(user.about);

  const handleSave = () => {
    updateUser("age", age);
    updateUser("location", location);
    updateUser("interests.food", userFoodInfo);
    updateUser("interests.sleep", userSleepInfo);
    updateUser("interests.movement", userMovementInfo);
    updateUser("interests.adventure", userAdventureInfo);
    updateUser("about", aboutUser);

    const userId = user._id;
    const updatedData = {
      age,
      location,
      interests: {
        food: userFoodInfo,
        sleep: userSleepInfo,
        movement: userMovementInfo,
        adventure: userAdventureInfo,
      },
      about: aboutUser,
    };

    axios
      .post(`http://192.168.0.148:5001/update/${userId}`, updatedData)
      .then((res) => {
        console.log(res.data);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "UserNav" }],
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <GetKnow
            age={age}
            setAge={setAge}
            location={location}
            setLocation={setLocation}
            picture={picture}
            setPicture={setPicture}
          />
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
          <TouchableOpacity style={styles.createBtm} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
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
    height: 50,
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
