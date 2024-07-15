import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import UsersReviews from "../components/ProfilePage/UsersReviews"; // Adjust the import path as necessary
import axios from "axios";

// Mock the axios library
jest.mock("axios");

describe("UsersReviews Component", () => {
  const user = { _id: "user123" };
  const owner = { _id: "owner123" };
  const userReviews = [
    {
      name: "John Doe",
      age: 30,
      location: "New York",
      rating: 5,
      text: "Great experience!",
      leftBy: "user123",
    },
    {
      name: "Jane Doe",
      age: 25,
      location: "California",
      rating: 4,
      text: "Very good!",
      leftBy: "user456",
    },
  ];
  const setUserReviews = jest.fn();

  //   it("renders correctly with user reviews", () => {
  //     const { getByText } = render(
  //       <UsersReviews
  //         userReviews={userReviews}
  //         user={user}
  //         owner={owner}
  //         setUserReviews={setUserReviews}
  //       />
  //     );

  //     expect(getByText("User's Top Reviews")).toBeTruthy();
  //     expect(getByText("John Doe | 30 | New York")).toBeTruthy();
  //     expect(getByText("Jane Doe | 25 | California")).toBeTruthy();
  //     expect(getByText("Great experience!")).toBeTruthy();
  //     expect(getByText("Very good!")).toBeTruthy();
  //   });

  //   it("handles review deletion correctly", async () => {
  //     axios.post.mockResolvedValueOnce({ data: { status: "ok" } });

  //     const { getByText, getAllByRole } = render(
  //       <UsersReviews
  //         userReviews={userReviews}
  //         user={user}
  //         owner={owner}
  //         setUserReviews={setUserReviews}
  //       />
  //     );

  //     const deleteButtons = getAllByRole("button");
  //     expect(deleteButtons.length).toBe(1); // Only one review should have a delete button

  //     fireEvent.press(deleteButtons[0]);

  //     await waitFor(() => {
  //       expect(axios.post).toHaveBeenCalledWith(
  //         `https://${process.env.EXPO_PUBLIC_HOST}/update/${owner._id}`,
  //         {
  //           reviews: [userReviews[1]], // The remaining review after deletion
  //         }
  //       );
  //       expect(setUserReviews).toHaveBeenCalledWith([userReviews[1]]);
  //     });
  //   });

  it("displays no reviews message correctly", () => {
    const { getByText } = render(
      <UsersReviews
        userReviews={[]}
        user={user}
        owner={owner}
        setUserReviews={setUserReviews}
      />
    );

    expect(getByText("User's Top Reviews")).toBeTruthy();
    expect(getByText("No reviews yet")).toBeTruthy();
  });
});
