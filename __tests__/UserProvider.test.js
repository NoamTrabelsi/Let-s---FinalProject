import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  UserProvider,
  UserContext,
} from "../components/UserContext/UserContext"; // Adjust the import path as necessary

const mockUserData = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  age: 28,
  gender: "female",
  image: "https://example.com/jane.jpg",
  location: "Los Angeles",
  interests: {
    food: [1, 0, 0],
    sleep: [0, 1, 0],
    movement: [0, 0, 1],
    adventure: [1, 1, 0],
  },
  about: "I love traveling and food.",
  reviews: [
    {
      name: "John",
      age: 30,
      location: "New York",
      rating: 4,
      text: "Great person!",
    },
  ],
};

describe("UserProvider", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  //   it("fetches and sets user data correctly", async () => {
  //     mock.onGet("https://example.com/user/1").reply(200, mockUserData);

  //     let contextValues;
  //     const wrapper = render(
  //       <UserProvider>
  //         <UserContext.Consumer>
  //           {(value) => {
  //             contextValues = value;
  //             return null;
  //           }}
  //         </UserContext.Consumer>
  //       </UserProvider>
  //     );

  //     await act(async () => {
  //       await contextValues.fetchUserData(1);
  //     });

  //     await waitFor(() => {
  //       expect(contextValues.user).toEqual(mockUserData);
  //     });

  //     wrapper.unmount();
  //   });

  it("updates user data correctly", () => {
    let contextValues;
    const wrapper = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );

    act(() => {
      contextValues.updateUser("firstName", "John");
    });

    expect(contextValues.user.firstName).toBe("John");

    wrapper.unmount();
  });

  it("resets user data correctly", () => {
    let contextValues;
    const wrapper = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );

    act(() => {
      contextValues.updateUser("firstName", "John");
      contextValues.resetUser();
    });

    expect(contextValues.user.firstName).toBe("");

    wrapper.unmount();
  });
});
