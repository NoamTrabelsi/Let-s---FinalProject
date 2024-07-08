import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Settings from "../screens/Settings";
import { UserProvider } from "../components/UserContext/UserContext";
import { NavigationContainer } from "@react-navigation/native";

const mockUser = {
  _id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  location: "City",
};

const renderWithProviders = (ui) => {
  return render(
    <UserProvider value={{ user: mockUser, resetUser: jest.fn() }}>
      <NavigationContainer>{ui}</NavigationContainer>
    </UserProvider>
  );
};

describe("Settings", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<Settings />);

    expect(getByText("Update details")).toBeTruthy();
    expect(getByText("Log Out")).toBeTruthy();
    expect(getByText("Delete account")).toBeTruthy();
  });

  it("handles logout", () => {
    const { getByText } = renderWithProviders(<Settings />);
    const logoutButton = getByText("Log Out");

    fireEvent.press(logoutButton);
    // Add assertions to verify logout logic if necessary
  });

  it("handles account deletion", () => {
    const { getByText } = renderWithProviders(<Settings />);
    const deleteButton = getByText("Delete account");

    fireEvent.press(deleteButton);
    // Add assertions to verify delete account logic if necessary
  });
});
