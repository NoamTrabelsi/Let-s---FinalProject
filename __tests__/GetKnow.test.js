import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import GetKnow from "../components/ProfileInfo/GetKnow"; // Adjust the import path as necessary
import { UserContext } from "../components/UserContext/UserContext";
import { jest } from "@jest/globals";

describe("GetKnow Component", () => {
  const mockUpdateUser = jest.fn();

  const renderComponent = (props) => {
    return render(
      <UserContext.Provider value={{ user: {}, updateUser: mockUpdateUser }}>
        <GetKnow {...props} />
      </UserContext.Provider>
    );
  };

  //   it("renders correctly with initial state", () => {
  //     const props = {
  //       location: "",
  //       setLocation: jest.fn(),
  //       age: "",
  //       setAge: jest.fn(),
  //       picture: "",
  //       setPicture: jest.fn(),
  //     };

  //     const { getByText, getByPlaceholderText } = renderComponent(props);

  //     expect(getByText("Get to know you")).toBeTruthy();
  //     expect(getByText("Add picture")).toBeTruthy();
  //     expect(getByPlaceholderText("Current Location")).toBeTruthy();
  //     expect(getByPlaceholderText("Age")).toBeTruthy();
  //   });

  it("opens and closes the modal for selecting country", async () => {
    const props = {
      location: "",
      setLocation: jest.fn(),
      age: "",
      setAge: jest.fn(),
      picture: "",
      setPicture: jest.fn(),
    };

    const { getByText, getByPlaceholderText, getByTestId, queryByText } =
      renderComponent(props);

    fireEvent.press(getByText("Current Location"));
    expect(getByPlaceholderText("Type country name")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Type country name"), "Bra");
    await waitFor(() => {
      expect(queryByText("Brazil")).toBeTruthy();
    });

    fireEvent.press(queryByText("Brazil"));
    expect(props.setLocation).toHaveBeenCalledWith("Brazil");
    expect(queryByText("Type country name")).toBeFalsy();
  });

  //   it("allows user to select and upload a photo", async () => {
  //     const props = {
  //       location: "",
  //       setLocation: jest.fn(),
  //       age: "",
  //       setAge: jest.fn(),
  //       picture: "",
  //       setPicture: jest.fn(),
  //     };

  //     const { getByText, getByTestId } = renderComponent(props);

  //     fireEvent.press(getByTestId("add-photo-button"));
  //     // Simulate image picker and AWS S3 upload
  //     // This part needs to be mocked properly based on your environment and setup

  //     // Ensure the picture is set and updateUser is called
  //     // await waitFor(() => {
  //     //   expect(props.setPicture).toHaveBeenCalledWith(expect.any(String));
  //     //   expect(mockUpdateUser).toHaveBeenCalledWith('image', expect.any(String));
  //     // });
  //   });

  it("allows user to input age", () => {
    const props = {
      location: "",
      setLocation: jest.fn(),
      age: "",
      setAge: jest.fn(),
      picture: "",
      setPicture: jest.fn(),
    };

    const { getByPlaceholderText } = renderComponent(props);

    fireEvent.changeText(getByPlaceholderText("Age"), "25");
    expect(props.setAge).toHaveBeenCalledWith(25);
    expect(mockUpdateUser).toHaveBeenCalledWith("age", 25);
  });
});
