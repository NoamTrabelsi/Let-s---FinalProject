import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DatePicker from "../components/HomeScreen/DatePicker"; // Adjust the path if necessary

describe("DatePicker", () => {
  it("renders correctly", () => {
    const { getByText } = render(<DatePicker label="Select Date" />);

    // Check if the label is rendered correctly
    expect(getByText("Select Date")).toBeTruthy();
  });

  it("calls the onConfirm function with the selected date", () => {
    const mockOnConfirm = jest.fn();
    const { getByText, getByRole } = render(
      <DatePicker label="Select Date" onConfirm={mockOnConfirm} />
    );

    const dateButton = getByText("Select Date");
    fireEvent.press(dateButton);

    // Mock date selection
    const confirmButton = getByRole("button", { name: /confirm/i });
    fireEvent.press(confirmButton);

    // Check if the onConfirm function was called
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
