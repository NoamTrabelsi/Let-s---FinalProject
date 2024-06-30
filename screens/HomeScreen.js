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
import FilterModal from "../components/HomeScreen/FilterModal";
import SearchBar from "../components/HomeScreen/SearchBar";
import UsersList from "../components/HomeScreen/UsersList";
import ProfilePage from "./ProfilePage";
import ChatWithUser from "./ChatWithUser";
import { formatISO } from "date-fns";
import { UserContext } from "../components/UserContext/UserContext";
import axios from "axios";

const Stack = createStackNavigator();

function SearchMainScreen() {
  const { user, fetchUserData } = useContext(UserContext);
  const [country, setCountry] = useState("");
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

  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const toggleFilterModal = useCallback(() => {
    setFilterModalVisible(!isFilterModalVisible);
  }, [isFilterModalVisible]);

  // Format date to ISO string
  const formatDate = (date) => {
    if (!date) return "";
    return formatISO(new Date(date), { representation: "date" });
  };

  // Handle search functionality
  const handleSearch = async () => {
    const updatedStartDate = startDateHelp;
    const updatedEndDate = endDateHelp;

    setStartDate(updatedStartDate);
    setEndDate(updatedEndDate);

    await addToTrip(updatedStartDate, updatedEndDate);
    await fetchUsers(
      country,
      updatedStartDate ? formatDate(new Date(updatedStartDate)) : null,
      updatedEndDate ? formatDate(new Date(updatedEndDate)) : null
    );
  };

  // Fetch users from server
  const fetchUsers = async (city, startDate, endDate) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/search`,
        {
          country: city,
          startDate,
          endDate,
          userId: user._id,
        }
      );

      if (response.data.status === "ok") {
        setUsers(response.data.data);
      } else {
        console.error("Error getting users:", response.data.data);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Add trip to user's trip history
  const addToTrip = async (startDate, endDate) => {
    const updatedUser = { ...user };

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "date",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "date",
    });

    const existingTripIndex = updatedUser.trip_planning.findIndex(
      (trip) => trip.country === country
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
        country: country,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }

    try {
      await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/update/${user._id}`,
        updatedUser
      );
      fetchUserData(user._id);
      console.log("User trip history updated");
    } catch (err) {
      console.error("Error updating user trip history:", err);
    }
  };

  // Filter users based on age and gender
  const filterUsers = () => {
    return users.filter((user) => {
      const matchesAge = user.age >= minAge && user.age <= maxAge;
      const matchesGender = gender === "all" || user.gender === gender;
      return matchesAge && matchesGender;
    });
  };

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
        setCountry={setCountry}
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
        users={filterUsers()}
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
    width: "100%",
    padding: 0, // Убедитесь, что padding установлен корректно
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
