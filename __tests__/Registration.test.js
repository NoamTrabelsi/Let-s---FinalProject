import React from "react";
import { render } from "@testing-library/react-native";
import Registration from "../screens/Registration"; // Проверьте путь к вашему компоненту
import { UserProvider } from "../components/UserContext/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Создаем функцию для рендеринга компонента с навигацией и провайдером
const renderWithProviders = (component) => {
  const Stack = createStackNavigator();

  return render(
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Registration" component={component} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

describe("Registration screen", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } =
      renderWithProviders(Registration);

    // Проверяем наличие всех основных элементов
    expect(getByPlaceholderText("First name")).toBeTruthy();
    expect(getByPlaceholderText("Last name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Password Validation")).toBeTruthy();
    expect(getByText("Register")).toBeTruthy();
  });
});
