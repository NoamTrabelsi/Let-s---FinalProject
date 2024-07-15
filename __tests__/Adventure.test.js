import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Adventure, {
  adventureOptions,
} from "../components/ProfileInfo/Adventure"; // Adjust the import path as necessary

describe("Adventure Component", () => {
  it("renders correctly with initial state", () => {
    const initialAdventureInfo = new Array(adventureOptions.length).fill(0);
    const setUserAdventureInfoMock = jest.fn();

    const { getByText } = render(
      <Adventure
        userAdventureInfo={initialAdventureInfo}
        setUserAdventureInfo={setUserAdventureInfoMock}
      />
    );

    expect(getByText("Adventure")).toBeTruthy();
    expect(getByText("Where do you party?")).toBeTruthy();

    adventureOptions.forEach((option) => {
      expect(getByText(option)).toBeTruthy();
    });
  });
});
