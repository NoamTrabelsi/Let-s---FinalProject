import React, { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const userInformationTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: 0,
  gender: "",
  image:
    "https://www.pngitem.com/pimgs/m/508-5087336_person-man-user-account-profile-employee-profile-template.png",
  location: "",
  interests: {
    food: [],
    sleep: [],
    movement: [],
    adventure: [],
  },
  about: "",
  reviews: [
    {
      name: "",
      age: 0,
      location: "",
      rating: 0,
      text: "",
    },
  ],
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userInformationTemplate);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://192.168.0.148:5001/user/${userId}`
      );
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUser = (path, value) => {
    setUser((prevUser) => {
      const userCopy = { ...prevUser };
      const keys = Array.isArray(path) ? path : path.split(".");

      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value;
        } else {
          if (!acc[key]) acc[key] = {};
          return acc[key];
        }
      }, userCopy);

      return userCopy;
    });
  };

  const resetUser = () => {
    setUser(userInformationTemplate);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userInformationTemplate,
        updateUser,
        fetchUserData,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userInformationTemplate };
