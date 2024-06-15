import React, { useCallback, useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Animated } from "react-native";
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
import { format, parse } from "date-fns";

const Stack = createStackNavigator();

const initialUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    age: 30,
    gender: "male",
    image: "https://images-s.kinorium.com/persona/300/175059.jpg?1633697285",
    location: "United States",
    interests: {
      food: [1, 1, 0],
      sleep: [0, 1, 1, 0],
      movement: [1, 1, 0, 0, 0],
      adventure: [0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    },
    trip_planning: [
      {
        country: "Netherlands",
        startDate: "Thu Jun 20 2024 20:25:40 GMT+0300",
        endDate: "Sat Jun 22 2024 20:25:40 GMT+0300",
      },
      {
        country: "Germany",
        startDate: "Thu Jun 20 2024 20:25:40 GMT+0300",
        endDate: "Sat Jun 22 2024 20:25:40 GMT+0300",
      },
    ],
    about:
      "I love exploring new places and trying out new cuisines. Life is an adventure!",
    reviews: [
      {
        name: "Alice",
        age: 28,
        location: "Canada",
        rating: 5,
        text: "John is an amazing person to hang out with. Had a fantastic time!",
      },
      {
        name: "Bob",
        age: 32,
        location: "UK",
        rating: 4,
        text: "John is very friendly and outgoing. Enjoyed every moment.",
      },
      {
        name: "Charlie",
        age: 29,
        location: "Australia",
        rating: 5,
        text: "John's energy is infectious. Would love to meet again!",
      },
    ],
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Smith",
    email: "emma.smith@example.com",
    password: "pass1234",
    age: 27,
    gender: "female",
    image:
      "https://yt3.googleusercontent.com/k0RdkmgNRg4D4sJ2DQZWIRqAnKMWB7df4i_TKgpfHYK8FCGF-O8XGMpBYFg-ULSZZIc7BXMb=s900-c-k-c0x00ffffff-no-rj",
    location: "Canada",
    interests: {
      food: [0, 1, 1],
      sleep: [1, 0, 1, 1],
      movement: [1, 0, 1, 1, 0],
      adventure: [1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1],
    },
    trip_planning: [],
    about:
      "Passionate about technology and travel. Always ready for a new challenge.",
    reviews: [
      {
        name: "David",
        age: 26,
        location: "Germany",
        rating: 4,
        text: "Emma is a very interesting person. Had a great time talking with her.",
      },
      {
        name: "Sophia",
        age: 29,
        location: "France",
        rating: 5,
        text: "Emma's insights are amazing. Really enjoyed our discussions.",
      },
      {
        name: "Oliver",
        age: 28,
        location: "Italy",
        rating: 4,
        text: "Emma is very knowledgeable and fun to be around.",
      },
    ],
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    password: "mike123",
    age: 35,
    gender: "male",
    image:
      "https://people.com/thmb/lhO9lu-03uXN7jsWlk9TY0mhW0o=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(709x499:711x501)/michael-jackson-210aa5866c7d4dd58de8e3af57fe919a.jpg",
    location: "Australia",
    interests: {
      food: [1, 0, 1],
      sleep: [1, 1, 0, 0],
      movement: [0, 1, 1, 1, 0],
      adventure: [0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
    },
    trip_planning: [],
    about:
      "Fitness enthusiast and avid reader. Love to share knowledge and experiences.",
    reviews: [
      {
        name: "Anna",
        age: 32,
        location: "New Zealand",
        rating: 5,
        text: "Michael is very inspiring and motivational. Had a wonderful time.",
      },
      {
        name: "James",
        age: 34,
        location: "Singapore",
        rating: 5,
        text: "Michael's enthusiasm is contagious. Great person to hang out with.",
      },
      {
        name: "Emily",
        age: 30,
        location: "South Africa",
        rating: 4,
        text: "Michael has great insights and is very fun to talk to.",
      },
    ],
  },
  {
    id: 4,
    firstName: "Isabella",
    lastName: "Brown",
    email: "isabella.brown@example.com",
    password: "bella123",
    age: 29,
    gender: "female",
    image:
      "https://static.wikia.nocookie.net/peter-jacksons-the-lord-of-the-rings-trilogy/images/e/ef/Isabella_Brown.jpeg/revision/latest?cb=20170224232150",
    location: "United Kingdom",
    interests: {
      food: [0, 0, 1],
      sleep: [1, 1, 1, 0],
      movement: [1, 0, 0, 1, 1],
      adventure: [1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0],
    },
    trip_planning: [
      {
        country: "Netherlands",
        startDate: "Thu Jun 20 2024 20:25:40 GMT+0300",
        endDate: "Sat Jun 22 2024 20:25:40 GMT+0300",
      },
      {
        country: "Georgia",
        startDate: "Thu Jun 20 2024 20:25:40 GMT+0300",
        endDate: "Sat Jun 22 2024 20:25:40 GMT+0300",
      },
    ],
    about:
      "Art lover and culture enthusiast. Always excited to learn new things.",
    reviews: [
      {
        name: "Liam",
        age: 31,
        location: "Ireland",
        rating: 5,
        text: "Isabella is very cultured and knowledgeable. Had a fantastic time.",
      },
      {
        name: "Noah",
        age: 29,
        location: "Spain",
        rating: 4,
        text: "Isabella's passion for art is inspiring. Loved every moment with her.",
      },
      {
        name: "Ava",
        age: 28,
        location: "Portugal",
        rating: 5,
        text: "Isabella has great taste and is very interesting to talk to.",
      },
    ],
  },
  {
    id: 5,
    firstName: "Liam",
    lastName: "Neeson",
    email: "liam.neeson@example.com",
    password: "liam456",
    age: 32,
    gender: "male",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjA1MTQ3NzU1MV5BMl5BanBnXkFtZTgwMDE3Mjg0MzE@._V1_FMjpg_UX1000_.jpg",
    location: "Ireland",
    interests: {
      food: [1, 1, 1],
      sleep: [0, 0, 0, 1],
      movement: [1, 1, 1, 0, 1],
      adventure: [0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    },
    trip_planning: [
      {
        country: "Israel",
        startDate: "Thu Jun 20 2024 20:25:40 GMT+0300",
        endDate: "Sat Jun 22 2024 20:25:40 GMT+0300",
      },
    ],
    about: "Music lover and tech geek. Always curious about the latest trends.",
    reviews: [
      {
        name: "Mia",
        age: 30,
        location: "Netherlands",
        rating: 4,
        text: "Liam is very fun and knowledgeable. Enjoyed our conversations a lot.",
      },
      {
        name: "Ethan",
        age: 31,
        location: "Belgium",
        rating: 5,
        text: "Liam's knowledge of music is impressive. Had a great time with him.",
      },
      {
        name: "Charlotte",
        age: 29,
        location: "Sweden",
        rating: 4,
        text: "Liam is very interesting and fun to talk to. Highly recommend.",
      },
    ],
  },
];

const filterUsers = (city, startDate, endDate, minAge, maxAge, gender) => {
  return initialUsers.filter((user) => {
    const matchesAge = user.age >= minAge && user.age <= maxAge;
    const matchesGender = gender === "all" || user.gender === gender;

    const matchesTrip = user.trip_planning.some((trip) => {
      const tripStartDate = new Date(trip.startDate);
      const tripEndDate = new Date(trip.endDate);
      const matchesTripDate =
        (!startDate || tripEndDate >= new Date(startDate)) &&
        (!endDate || tripStartDate <= new Date(endDate));

      const matchesTripCity =
        !city || trip.country.toLowerCase().includes(city.toLowerCase());

      return matchesTripCity && matchesTripDate;
    });

    return matchesTrip && matchesAge && matchesGender;
  });
};

function SearchMainScreen() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(60);
  const [gender, setGender] = useState("all");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd");
  };

  const toggleFilterModal = useCallback(() => {
    setFilterModalVisible(!isFilterModalVisible);
  }, [isFilterModalVisible]);

  const handleSearch = useCallback(() => {
    console.log(
      `City: ${city}, Start Date: ${
        startDate ? formatDate(new Date(startDate)) : ""
      }, End Date: ${endDate ? formatDate(new Date(endDate)) : ""}`
    );
    console.log(`Min Age: ${minAge}, Max Age: ${maxAge}`);
    console.log(`Gender: ${gender}`);

    const filteredUsers = filterUsers(
      city,
      startDate ? new Date(startDate) : null,
      endDate ? new Date(endDate) : null,
      minAge,
      maxAge,
      gender
    );
    setUsers(filteredUsers);
  }, [city, startDate, endDate, minAge, maxAge, gender]);

  useEffect(() => {
    if (!isFilterModalVisible) {
      handleSearch();
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
        loading={loading}
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
});

export default HomeScreen;
