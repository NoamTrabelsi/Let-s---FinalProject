import React from "react";
import { render } from "@testing-library/react-native";
import UserProfileHeader from "../components/ProfilePage/UserProfileHeader"; // Adjust the import path as necessary

describe("UserProfileHeader Component", () => {
  it("renders correctly with provided imageUri", () => {
    const imageUri = "https://example.com/profile.jpg"; // Sample image URI

    const { getByTestId } = render(<UserProfileHeader imageUri={imageUri} />);

    const image = getByTestId("profile-image");
    expect(image.props.source.uri).toBe(imageUri);
  });
});
