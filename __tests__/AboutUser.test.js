import React from "react";
import { render } from "@testing-library/react-native";
import AboutUser from "../components/ProfilePage/AboutUser"; // Adjust the import path as necessary

describe("AboutUser Component", () => {
  it("renders correctly with user data", () => {
    const aboutUser = {
      firstName: "John",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };

    const { getByText } = render(<AboutUser aboutUser={aboutUser} />);

    expect(getByText(`About ${aboutUser.firstName}`)).toBeTruthy();
    //expect(getByText(aboutUser.about)).toBeTruthy();
  });

  it("renders correctly with empty about text", () => {
    const aboutUser = {
      firstName: "John",
      about: "",
    };

    const { getByText } = render(<AboutUser aboutUser={aboutUser} />);

    expect(getByText(`About ${aboutUser.firstName}`)).toBeTruthy();
  });
});
