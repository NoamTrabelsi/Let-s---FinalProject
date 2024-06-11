import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
} from "react-native";
import FilterModal from "../components/HomeScreen/FilterModal";
import SearchBar from "../components/HomeScreen/SearchBar";
import UsersList from "../components/HomeScreen/UsersList";

function HomeScreen() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(60);
  const [gender, setGender] = useState("all");

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleSearch = () => {
    console.log(
      `City: ${city}, Start Date: ${formatDate(
        startDate
      )}, End Date: ${formatDate(endDate)}`
    );
    console.log(`Min Age: ${minAge}, Max Age: ${maxAge}`);
    console.log(`Gender: ${gender}`);
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersPlaceholderList = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => ({ id: index }));
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    // Simulate fetching delay
    //await new Promise((resolve) => setTimeout(resolve, 2000));

    // Fetch users
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const inputContainerTranslateY = scrollY.interpolate({
    inputRange: [0, inputContainerHeight],
    outputRange: [0, -inputContainerHeight],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
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
        city={city}
        setCity={setCity}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        toggleFilterModal={toggleFilterModal}
        handleSearch={handleSearch}
        inputContainerTranslateY={inputContainerTranslateY}
        setInputContainerHeight={setInputContainerHeight}
      />

      <UsersList
        users={users}
        usersPlaceholderList={usersPlaceholderList}
        loading={loading}
        scrollY={scrollY}
        inputContainerHeight={inputContainerHeight}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00",
    justifyContent: "flex-start",
    padding: 20,
  },
});

export default HomeScreen;
