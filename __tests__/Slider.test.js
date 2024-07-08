import React from "react";
import { render } from "@testing-library/react-native";
import Slider from "../components/HomeScreen/Slider"; // Adjust the import path as necessary

describe("Slider", () => {
  it("renders correctly with default values", () => {
    const { getByText } = render(
      <Slider onValuesChange={jest.fn()} defaultValues={[20, 40]} />
    );

    // Ensure that the age range label is rendered
    expect(getByText("Age Range:")).toBeTruthy();

    // Ensure that the default values are rendered
    expect(getByText("20 - 40")).toBeTruthy();
  });
});
