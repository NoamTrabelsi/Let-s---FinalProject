import React, { createContext, useState } from "react";

const UserContext = createContext();

const userInformationTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: 0,
  gender: "",
  image: "",
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

  return (
    <UserContext.Provider
      value={{ user, setUser, userInformationTemplate, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userInformationTemplate };
