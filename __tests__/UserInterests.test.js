import React from "react";
import { render } from "@testing-library/react-native";
import UserInterests from "../components/ProfilePage/UserInterests"; // Adjust the import path as necessary
import { transportOptions } from "../components/ProfileInfo/Movement"; // Adjust the import path as necessary

describe("UserInterests Component", () => {
  it("renders correctly with interests", () => {
    const interests = [1, 0, 1, 0, 1, 0, 0, 0]; // Some sample interests
    const title = "Movement";
    const icon = "bus";

    const { getByText } = render(
      <UserInterests
        interests={interests}
        options={transportOptions}
        title={title}
        icon={icon}
      />
    );

    // Check that the title is rendered correctly
    expect(getByText("Movement")).toBeTruthy();

    // Check that the interests are rendered correctly
    expect(getByText("on foot")).toBeTruthy();
    expect(getByText("bicycle")).toBeTruthy();
    expect(getByText("rental car")).toBeTruthy();
  });

  it("does not render interests that are not selected", () => {
    const interests = [1, 0, 1, 0, 1, 0, 0, 0]; // Some sample interests
    const title = "Movement";
    const icon = "bus";

    const { queryByText } = render(
      <UserInterests
        interests={interests}
        options={transportOptions}
        title={title}
        icon={icon}
      />
    );

    // Check that interests not selected are not rendered
    expect(queryByText("public transport")).toBeNull();
    expect(queryByText("moped")).toBeNull();
    expect(queryByText("ride sharing")).toBeNull();
    expect(queryByText("scooter")).toBeNull();
    expect(queryByText("taxi")).toBeNull();
  });
});
