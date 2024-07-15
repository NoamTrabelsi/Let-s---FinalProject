import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../components/HomeScreen/SearchBar"; // Adjust the import path as necessary

describe("SearchBar", () => {
  const mockSetCountry = jest.fn();
  const mockSetStartDate = jest.fn();
  const mockSetEndDate = jest.fn();
  const mockToggleFilterModal = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockSetInputContainerHeight = jest.fn();

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar
        setCountry={mockSetCountry}
        startDate={null}
        setStartDate={mockSetStartDate}
        endDate={null}
        setEndDate={mockSetEndDate}
        toggleFilterModal={mockToggleFilterModal}
        handleSearch={mockHandleSearch}
        inputContainerTranslateY={0}
        setInputContainerHeight={mockSetInputContainerHeight}
      />
    );

    // Ensure that the search input and date pickers are rendered
    expect(getByPlaceholderText("Where to?")).toBeTruthy();
    expect(getByText("Start Date")).toBeTruthy();
    expect(getByText("End Date")).toBeTruthy();
    expect(getByText("Search")).toBeTruthy();
  });

  it("updates country input correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar
        setCountry={mockSetCountry}
        startDate={null}
        setStartDate={mockSetStartDate}
        endDate={null}
        setEndDate={mockSetEndDate}
        toggleFilterModal={mockToggleFilterModal}
        handleSearch={mockHandleSearch}
        inputContainerTranslateY={0}
        setInputContainerHeight={mockSetInputContainerHeight}
      />
    );

    const input = getByPlaceholderText("Where to?");
    fireEvent.changeText(input, "United");

    // Simulate selecting a suggestion
    fireEvent.press(getByText("United States"));

    expect(mockSetCountry).toHaveBeenCalledWith("United States");
  });
});
