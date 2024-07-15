import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import About from "../components/ProfileInfo/About"; // Adjust the import path as necessary

describe("About Component", () => {
  it("renders correctly with initial state", () => {
    const initialAbout = "This is about me";
    const setAboutUserMock = jest.fn();

    const { getByText, getByDisplayValue } = render(
      <About aboutUser={initialAbout} setAboutUser={setAboutUserMock} />
    );

    expect(getByText("About Me")).toBeTruthy();
    expect(
      getByText(`Remaining characters: ${300 - initialAbout.length} / 300`)
    ).toBeTruthy();
    expect(getByDisplayValue(initialAbout)).toBeTruthy();
  });

  it("updates the character count and calls setAboutUser on text change", () => {
    const initialAbout = "";
    const setAboutUserMock = jest.fn();

    const { getByText, getByDisplayValue } = render(
      <About aboutUser={initialAbout} setAboutUser={setAboutUserMock} />
    );

    const newText = "This is a new about text";
    const textInput = getByDisplayValue(initialAbout);

    fireEvent.changeText(textInput, newText);

    expect(
      getByText(`Remaining characters: ${300 - newText.length} / 300`)
    ).toBeTruthy();
    expect(setAboutUserMock).toHaveBeenCalledWith(newText);
  });

  it("does not update the text when max length is exceeded", () => {
    const initialAbout = "";
    const setAboutUserMock = jest.fn();

    const { getByText, getByDisplayValue } = render(
      <About aboutUser={initialAbout} setAboutUser={setAboutUserMock} />
    );

    const newText = "a".repeat(301);
    const textInput = getByDisplayValue(initialAbout);

    fireEvent.changeText(textInput, newText);

    expect(getByText(`Remaining characters: 300 / 300`)).toBeTruthy();
    expect(setAboutUserMock).not.toHaveBeenCalledWith(newText);
  });
});
