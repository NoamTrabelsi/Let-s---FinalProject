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
import { Entypo } from "@expo/vector-icons";
import Slider from "../components/HomeScreen/Slider";
import DatePicker from "../components/HomeScreen/DatePicker";
import GenderFilter from "../components/HomeScreen/GenderFilter";
import { Skeleton } from "moti/skeleton";

function HomeScreen() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
      <Animated.View
        style={[
          styles.inputContainer,
          { transform: [{ translateY: inputContainerTranslateY }] },
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setInputContainerHeight(height);
        }}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter City"
            placeholderTextColor="gray"
            onChangeText={setCity}
            value={city}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilterModal}
          >
            <Entypo name="sound-mix" size={30} color="#808080" />
          </TouchableOpacity>
        </View>

        <DatePicker
          label="Select Start Date"
          date={startDate}
          onConfirm={setStartDate}
        />
        <DatePicker
          label="Select End Date"
          date={endDate}
          onConfirm={setEndDate}
          minimumDate={startDate}
        />

        <TouchableOpacity
          onPress={handleSearch}
          style={[styles.dateButton, styles.searchButton]}
        >
          <Text style={styles.dateButtonText}>Search</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 1 }}>
              <Slider
                defaultValues={[minAge, maxAge]}
                onValuesChange={(values) => {
                  setMinAge(values[0]);
                  setMaxAge(values[1]);
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <GenderFilter
                defaultValue={gender}
                onValueChange={(value) => setGender(value)}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={toggleFilterModal}
            >
              <Text style={styles.textStyle}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animated.FlatList
        contentContainerStyle={{ paddingTop: inputContainerHeight }}
        data={users.length > 0 ? users : usersPlaceholderList}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
        )}
        renderItem={({ item }) => {
          const isLoading = users.length === 0;
          return (
            <View
              style={{
                width: "100%",
                height: 120,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Skeleton.Group show={isLoading}>
                <Skeleton
                  height={70}
                  width={70}
                  radius="round"
                  colorMode="light"
                >
                  {!isLoading && (
                    <View
                      style={{
                        height: 70,
                        aspectRatio: 1,
                        backgroundColor: "#808080",
                        borderRadius: 35,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 25, color: "white" }}>
                        {item.name?.[0]}
                      </Text>
                    </View>
                  )}
                </Skeleton>
                <View style={{ marginLeft: 15 }}>
                  <Skeleton
                    height={30}
                    width="85%"
                    colorMode="light"
                    backgroundColor="#D4D4D4"
                  >
                    {!isLoading && (
                      <Text style={{ fontSize: 20 }}>{item.name}</Text>
                    )}
                  </Skeleton>
                  <View style={{ height: 5 }} />
                  <Skeleton
                    height={30}
                    width="85%"
                    colorMode="light"
                    backgroundColor="#D4D4D4"
                  >
                    {!isLoading && (
                      <Text style={{ fontSize: 15 }}>{item.email}</Text>
                    )}
                  </Skeleton>
                </View>
              </Skeleton.Group>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={loading && <Text>Loading more users...</Text>}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
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
  inputContainer: {
    backgroundColor: "#FF8C00",
    marginBottom: 10,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "70%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
  },
  filterButton: {
    padding: 10,
  },
  dateButton: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    width: "45%",
    alignSelf: "center",
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "50%",
  },
  buttonClose: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    width: "45%",
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
