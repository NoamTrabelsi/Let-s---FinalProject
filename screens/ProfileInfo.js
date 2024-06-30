import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
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
import { lOCAL_HOST, SERVER_PORT, SOCKET_PORT } from "@env";

function ProfileInfo() {
  const navigation = useNavigation();
  const { user, updateUser, fetchUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      fetchUserData(user._id);
    }
  }, []);

  const [location, setLocation] = useState(user.location ? user.location : "");
  const [age, setAge] = useState(user.age ? user.age : "");
  const [picture, setPicture] = useState(user.image ? user.image : "");
  const [userFoodInfo, setUserFoodInfo] = useState(user.interests.food);
  const [userSleepInfo, setUserSleepInfo] = useState(user.interests.sleep);
  const [userMovementInfo, setUserMovementInfo] = useState(
    user.interests.movement
  );
  const [userAdventureInfo, setUserAdventureInfo] = useState(
    user.interests.adventure
  );
  const [aboutUser, setAboutUser] = useState(user.about ? user.about : "");

  const handleSave = () => {
    setLoading(true);
    const userId = user._id;
    const updatedData = {
      image: picture,
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
      .post(
        `https://${process.env.EXPO_PUBLIC_HOST}/update/${userId}`,
        updatedData
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
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
          <Modal visible={loading} transparent={true}>
            <View style={styles.loading}>
              <Image
                source={require("../assets/lets-animated.gif")}
                style={styles.loadingImage}
              />
            </View>
          </Modal>
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
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
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
