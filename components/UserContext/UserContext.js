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

  return (
    <UserContext.Provider value={{ user, setUser, userInformationTemplate }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userInformationTemplate };
