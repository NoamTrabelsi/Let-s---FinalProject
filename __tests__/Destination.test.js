import React from "react";
import { render } from "@testing-library/react-native";
import Destination from "../components/Destination"; // Adjust the import path as necessary

describe("Destination Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Destination />);

    expect(getByText("Destination")).toBeTruthy();
    expect(getByText("Where do you want to visit?")).toBeTruthy();
  });
});
