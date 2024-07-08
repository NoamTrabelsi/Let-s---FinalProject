import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Sleep, { sleepOptions } from "../components/ProfileInfo/Sleep"; // Adjust the import path as necessary

describe("Sleep Component", () => {
  it("renders correctly with initial state", () => {
    const initialSleepInfo = new Array(sleepOptions.length).fill(0);
    const setUserSleepInfoMock = jest.fn();

    const { getByText } = render(
      <Sleep
        userSleepInfo={initialSleepInfo}
        setUserSleepInfo={setUserSleepInfoMock}
      />
    );

    expect(getByText("Sleep")).toBeTruthy();
    expect(getByText("Where do you dream?")).toBeTruthy();

    sleepOptions.forEach((option) => {
      expect(getByText(option)).toBeTruthy();
    });
  });

  //   it('toggles the sleep options correctly', () => {
  //     const initialSleepInfo = new Array(sleepOptions.length).fill(0);
  //     const setUserSleepInfoMock = jest.fn();

  //     const { getByText } = render(
  //       <Sleep
  //         userSleepInfo={initialSleepInfo}
  //         setUserSleepInfo={setUserSleepInfoMock}
  //       />
  //     );

  //     const firstOptionButton = getByText(sleepOptions[0]);
  //     fireEvent.press(firstOptionButton);

  //     const expectedSleepInfo = [...initialSleepInfo];
  //     expectedSleepInfo[0] = 1;
  //     expect(setUserSleepInfoMock).toHaveBeenCalledWith(expectedSleepInfo);

  //     fireEvent.press(firstOptionButton);
  //     expectedSleepInfo[0] = 0;
  //     expect(setUserSleepInfoMock).toHaveBeenCalledWith(expectedSleepInfo);
  //   });
});
