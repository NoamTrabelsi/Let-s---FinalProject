import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  View,
  Modal,
  Image,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FilterModal from "../components/HomeScreen/FilterModal";
import SearchBar from "../components/HomeScreen/SearchBar";
import UsersList from "../components/HomeScreen/UsersList";
import ProfilePage from "./ProfilePage";
import ChatWithUser from "./ChatWithUser";
import { formatISO } from "date-fns";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";
import { set } from "mongoose";

const Stack = createStackNavigator();

function SearchMainScreen() {
  const { user, updateUser, fetchUserData } = useContext(UserContext);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startDateHelp, setStartDateHelp] = useState();
  const [endDateHelp, setEndDateHelp] = useState();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(60);
  const [gender, setGender] = useState("all");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleFilterModal = useCallback(() => {
    setFilterModalVisible(!isFilterModalVisible);
  }, [isFilterModalVisible]);

  const filterUsers = async (
    city,
    startDate,
    endDate,
    minAge,
    maxAge,
    gender
  ) => {
    try {
      setLoading(true);
      console.log("Sending request to server with:", {
        city,
        startDate,
        endDate,
        minAge,
        maxAge,
        gender,
      });
      const response = await axios.post("http://192.168.0.148:5001/search", {
        country: city,
        startDate,
        endDate,
        userId: user._id,
      });

      if (response.data.status === "ok") {
        setLoading(false);
        setUsers(
          response.data.data.filter((user) => {
            const matchesAge = user.age >= minAge && user.age <= maxAge;
            const matchesGender = gender === "all" || user.gender === gender;
            return matchesAge && matchesGender;
          })
        );
      } else {
        setLoading(false);
        console.error("Error getting users:", response.data.data);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching users:", err);
    }
  };

  const handleSearch = () => {
    setStartDate(startDateHelp);
    setEndDate(endDateHelp);
    // console.log(
    //   `City: ${city}, Start Date: ${
    //     startDate ? formatDate(new Date(startDate)) : ""
    //   }, End Date: ${endDate ? formatDate(new Date(endDate)) : ""}`
    // );
    // console.log(`Min Age: ${minAge}, Max Age: ${maxAge}`);
    // console.log(`Gender: ${gender}`);

    const filteredUsers = filterUsers(
      city,
      startDate ? formatDate(new Date(startDate)) : null,
      endDate ? formatDate(new Date(endDate)) : null,
      minAge,
      maxAge,
      gender
    );
    setUsers(filteredUsers);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return formatISO(new Date(date), { representation: "date" });
  };

  const addToTrip = () => {
    const updatedUser = { ...user };

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "date",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "date",
    });

    const existingTripIndex = updatedUser.trip_planning.findIndex(
      (trip) => trip.country === city
    );

    if (existingTripIndex !== -1) {
      updatedUser.trip_planning[existingTripIndex].startDate =
        formattedStartDate;
      updatedUser.trip_planning[existingTripIndex].endDate = formattedEndDate;
    } else {
      if (updatedUser.trip_planning.length >= 3) {
        updatedUser.trip_planning.pop();
      }
      updatedUser.trip_planning.unshift({
        country: city,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }

    axios
      .post(`http://192.168.0.148:5001/update/${user._id}`, updatedUser)
      .then((res) => {
        fetchUserData(user._id);
        console.log("User trip history updated");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!isFilterModalVisible && city) {
      //handleSearch();
      addToTrip();
    }
  }, [isFilterModalVisible, city, startDate, endDate]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const inputContainerTranslateY = scrollY.interpolate({
    inputRange: [0, inputContainerHeight],
    outputRange: [0, -inputContainerHeight],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={loading} transparent={true}>
        <View style={styles.loading}>
          <Image
            source={require("../assets/lets-animated.gif")}
            style={styles.loadingImage}
          />
        </View>
      </Modal>

      <FilterModal
        isVisible={isFilterModalVisible}
        toggleModal={toggleFilterModal}
        minAge={minAge}
        maxAge={maxAge}
        setMinAge={setMinAge}
        setMaxAge={setMaxAge}
        gender={gender}
        setGender={setGender}
      />

      <SearchBar
        setCity={setCity}
        startDate={startDateHelp}
        setStartDate={setStartDateHelp}
        endDate={endDateHelp}
        setEndDate={setEndDateHelp}
        toggleFilterModal={toggleFilterModal}
        handleSearch={handleSearch}
        inputContainerTranslateY={inputContainerTranslateY}
        setInputContainerHeight={setInputContainerHeight}
      />

      <UsersList
        users={users}
        scrollY={scrollY}
        inputContainerHeight={inputContainerHeight}
      />
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="SearchMain"
        component={SearchMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatWithUser"
        component={ChatWithUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
    padding: 20,
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

export default HomeScreen;
