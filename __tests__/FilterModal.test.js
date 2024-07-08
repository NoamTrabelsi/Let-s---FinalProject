import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilterModal from "../components/HomeScreen/FilterModal"; // Adjust the path if necessary

describe("FilterModal", () => {
  it("renders correctly when visible", () => {
    const { getByText } = render(
      <FilterModal
        isVisible={true}
        toggleModal={jest.fn()}
        minAge={18}
        maxAge={60}
        setMinAge={jest.fn()}
        setMaxAge={jest.fn()}
        gender="all"
        setGender={jest.fn()}
      />
    );

    expect(getByText("Filter Options")).toBeTruthy();
    expect(getByText("Apply Filters")).toBeTruthy();
  });

  it("calls setMinAge, setMaxAge, and setGender when Apply Filters is pressed", () => {
    const mockSetMinAge = jest.fn();
    const mockSetMaxAge = jest.fn();
    const mockSetGender = jest.fn();
    const mockToggleModal = jest.fn();

    const { getByText } = render(
      <FilterModal
        isVisible={true}
        toggleModal={mockToggleModal}
        minAge={18}
        maxAge={60}
        setMinAge={mockSetMinAge}
        setMaxAge={mockSetMaxAge}
        gender="all"
        setGender={mockSetGender}
      />
    );

    fireEvent.press(getByText("Apply Filters"));

    expect(mockSetMinAge).toHaveBeenCalledWith(18);
    expect(mockSetMaxAge).toHaveBeenCalledWith(60);
    expect(mockSetGender).toHaveBeenCalledWith("all");
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
