import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GenderFilter from "../components/HomeScreen/GenderFilter"; // Adjust the path if necessary

describe("GenderFilter", () => {
  it("renders correctly with default value", () => {
    const { getByText } = render(<GenderFilter defaultValue="all" />);

    expect(getByText("Gender:")).toBeTruthy();
    expect(getByText("All")).toBeTruthy();
    expect(getByText("Male")).toBeTruthy();
    expect(getByText("Female")).toBeTruthy();
  });

  it("calls onValueChange when a gender is selected", () => {
    const mockOnValueChange = jest.fn();
    const { getByText } = render(
      <GenderFilter defaultValue="all" onValueChange={mockOnValueChange} />
    );

    fireEvent.press(getByText("Male"));
    expect(mockOnValueChange).toHaveBeenCalledWith("male");

    fireEvent.press(getByText("Female"));
    expect(mockOnValueChange).toHaveBeenCalledWith("female");

    fireEvent.press(getByText("All"));
    expect(mockOnValueChange).toHaveBeenCalledWith("all");
  });
});
