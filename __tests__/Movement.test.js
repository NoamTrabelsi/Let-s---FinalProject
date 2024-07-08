import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Movement, { transportOptions } from "../components/ProfileInfo/Movement";

describe("Movement Component", () => {
  it("renders correctly with initial state", () => {
    const initialMovementInfo = new Array(transportOptions.length).fill(0);
    const setUserMovementInfoMock = jest.fn();

    const { getByText } = render(
      <Movement
        userMovementInfo={initialMovementInfo}
        setUserMovementInfo={setUserMovementInfoMock}
      />
    );

    expect(getByText("Movement")).toBeTruthy();
    expect(getByText("How do you prefer to get around?")).toBeTruthy();

    transportOptions.forEach((option) => {
      expect(getByText(option)).toBeTruthy();
    });
  });

  //   it('toggles the movement options correctly', () => {
  //     const initialMovementInfo = new Array(transportOptions.length).fill(0);
  //     const setUserMovementInfoMock = jest.fn();

  //     const { getByText } = render(
  //       <Movement
  //         userMovementInfo={initialMovementInfo}
  //         setUserMovementInfo={setUserMovementInfoMock}
  //       />
  //     );

  //     const firstOptionButton = getByText(transportOptions[0]);
  //     fireEvent.press(firstOptionButton);

  //     const expectedMovementInfo = [...initialMovementInfo];
  //     expectedMovementInfo[0] = 1;
  //     expect(setUserMovementInfoMock).toHaveBeenCalledWith(expectedMovementInfo);

  //     fireEvent.press(firstOptionButton);
  //     expectedMovementInfo[0] = 0;
  //     expect(setUserMovementInfoMock).toHaveBeenCalledWith(expectedMovementInfo);
  //   });
});
