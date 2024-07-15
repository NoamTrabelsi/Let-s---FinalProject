import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Food, { foodOptions } from "../components/ProfileInfo/Food"; // Adjust the import path as necessary

describe("Food Component", () => {
  it("renders correctly with initial state", () => {
    const initialFoodInfo = new Array(foodOptions.length).fill(0);
    const setUserFoodInfoMock = jest.fn();

    const { getByText } = render(
      <Food
        userFoodInfo={initialFoodInfo}
        setUserFoodInfo={setUserFoodInfoMock}
      />
    );

    expect(getByText("Food")).toBeTruthy();
    expect(getByText("What do you want to eat?")).toBeTruthy();

    foodOptions.forEach((option) => {
      expect(getByText(option)).toBeTruthy();
    });
  });
});
