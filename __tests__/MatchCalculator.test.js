import React from "react";
import { render } from "@testing-library/react-native";
import MatchCalculator from "../components/HomeScreen/MatchCalculator";
import { UserContext } from "../components/UserContext/UserContext";

const mockSetTripMatch = jest.fn();

const mockUser = {
  interests: {
    movement: [1, 1, 1],
    food: [1, 1, 1],
    sleep: [1, 1, 1],
    adventure: [1, 1, 1],
  },
};

const mockUserFound = {
  interests: {
    movement: [1, 1, 1],
    food: [1, 1, 1],
    sleep: [1, 1, 1],
    adventure: [1, 1, 1],
  },
};

const mockUserContextValue = {
  user: mockUser,
};

describe("MatchCalculator", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <MatchCalculator
          userFound={mockUserFound}
          setTripMatch={mockSetTripMatch}
        />
      </UserContext.Provider>
    );

    // Ensure the match percentage is displayed
    expect(getByText("100%")).toBeTruthy();
  });

  it("calculates the match percentage correctly", () => {
    const { getByText } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <MatchCalculator
          userFound={mockUserFound}
          setTripMatch={mockSetTripMatch}
        />
      </UserContext.Provider>
    );

    // Ensure the match percentage is displayed correctly
    expect(getByText("100%")).toBeTruthy();
    // Ensure setTripMatch is called with the correct value
    expect(mockSetTripMatch).toHaveBeenCalledWith(100);
  });
});
