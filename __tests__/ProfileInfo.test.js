import React from "react";
import { render } from "@testing-library/react-native";
import ProfileInfo from "../screens/ProfileInfo"; // Проверьте путь к вашему компоненту
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
          <Stack.Screen name="ProfileInfo" component={component} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

describe("ProfileInfo screen", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId, getByPlaceholderText } =
      renderWithProviders(ProfileInfo);

    // Проверяем наличие всех основных элементов
    expect(getByText("Save")).toBeTruthy();
  });
});
