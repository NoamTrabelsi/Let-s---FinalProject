import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddReviewModal from "../components/ProfilePage/AddReviewModal"; // Ensure this path is correct

describe("AddReviewModal Component", () => {
  const initialProps = {
    isModalVisible: true,
    setModalVisible: jest.fn(),
    handleSaveReview: jest.fn(),
    reviewRating: 3,
    setReviewRating: jest.fn(),
    newReviewText: "",
    setNewReviewText: jest.fn(),
    errorMessage: "",
  };

  it("renders correctly with initial state", () => {
    const { getByPlaceholderText, getByText } = render(
      <AddReviewModal {...initialProps} />
    );

    expect(getByPlaceholderText("Write your review here")).toBeTruthy();
    expect(getByText("Add Review")).toBeTruthy();
  });

  it("handles text input correctly", () => {
    const { getByPlaceholderText } = render(
      <AddReviewModal {...initialProps} />
    );
    const input = getByPlaceholderText("Write your review here");
    fireEvent.changeText(input, "Great place!");
    expect(initialProps.setNewReviewText).toHaveBeenCalledWith("Great place!");
  });

  it("updates star rating correctly", () => {
    const { getAllByRole } = render(<AddReviewModal {...initialProps} />);
    const stars = getAllByRole("button");
    fireEvent.press(stars[4]);
    expect(initialProps.setReviewRating).toHaveBeenCalledWith(5);
  });

  it("handles save review correctly", () => {
    const { getByText } = render(<AddReviewModal {...initialProps} />);
    const saveButton = getByText("Save Review");
    fireEvent.press(saveButton);
    expect(initialProps.handleSaveReview).toHaveBeenCalled();
  });

  it("handles close button correctly", () => {
    const { getByText } = render(<AddReviewModal {...initialProps} />);
    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(initialProps.setModalVisible).toHaveBeenCalledWith(false);
  });

  it("displays error message correctly", () => {
    const propsWithError = {
      ...initialProps,
      errorMessage: "This is an error message.",
    };
    const { getByText } = render(<AddReviewModal {...propsWithError} />);
    expect(getByText("This is an error message.")).toBeTruthy();
  });
});
