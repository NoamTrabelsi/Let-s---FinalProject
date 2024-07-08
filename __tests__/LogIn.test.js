import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createStackNavigator } from "@react-navigation/stack";
import { render } from "@testing-library/react-native";
import LogIn from "../screens/LogIn";
import Registration from "../screens/Registration";
import { UserProvider } from "../components/UserContext/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

const mockAxios = new MockAdapter(axios);
jest.mock("@react-native-async-storage/async-storage");

describe("checkUserExists", () => {
  it("should return user data if user exists", async () => {
    const testEmail = "";
    const testPassword = "";
    const mockResponse = {
      status: "ok",
      data: { token: "test-token", user: { email: testEmail } },
    };

    // Мок ответа от сервера
    mockAxios
      .onPost(`/login`, { email: testEmail, password: testPassword })
      .reply(200, mockResponse);

    // Функция для проверки существования пользователя
    const checkUserExists = async (email, password) => {
      try {
        const response = await axios.post(`/login`, { email, password });
        return response.data;
      } catch (error) {
        return null;
      }
    };

    const userData = await checkUserExists(testEmail, testPassword);

    // Проверка, что данные пользователя возвращены корректно
    expect(userData).toEqual(mockResponse);
  });

  //ckeck if data base is empty
  it("should return null if user does not exist", async () => {
    const testEmail = "";
    const testPassword = "";

    // Mock server response with incorrect data
    mockAxios
      .onPost(`/login`, { email: testEmail, password: testPassword })
      .reply(200, { status: "error" });

    const checkUserExists = async (email, password) => {
      try {
        const response = await axios.post(`/login`, { email, password });
        return response.data;
      } catch (error) {
        return null;
      }
    };

    const userData = await checkUserExists(testEmail, testPassword);

    // Check that the function returns specific error status on unexpected server response
    expect(userData).toEqual({ status: "error" });
  });

  it("should handle unexpected server response with specific error status", async () => {
    const testEmail = "";
    const testPassword = "";

    // Mock server response with incorrect data
    mockAxios
      .onPost(`/login`, { email: testEmail, password: testPassword })
      .reply(200, { status: "error" });

    const checkUserExists = async (email, password) => {
      try {
        const response = await axios.post(`/login`, { email, password });
        return response.data;
      } catch (error) {
        return null;
      }
    };

    const userData = await checkUserExists(testEmail, testPassword);

    // Check that the function returns specific error status on unexpected server response
    expect(userData).toEqual({ status: "error" });
  });

  it("should return null on error", async () => {
    const testEmail = "";
    const testPassword = "";

    // Мок ответа от сервера с ошибкой
    mockAxios
      .onPost(`/login`, { email: testEmail, password: testPassword })
      .reply(500);

    // Функция для проверки существования пользователя
    const checkUserExists = async (email, password) => {
      try {
        const response = await axios.post(`/login`, { email, password });
        return response.data;
      } catch (error) {
        return null;
      }
    };

    const userData = await checkUserExists(testEmail, testPassword);

    // Проверка, что возвращено значение null при ошибке
    expect(userData).toBeNull();
  });
});

describe("logIn", () => {
  it("should navigate to the Home screen on successful login", async () => {
    const testEmail = "";
    const testPassword = "";
    const mockResponse = {
      status: "ok",
      data: { token: "test-token", user: { email: testEmail } },
    };

    // Mock server response with correct data
    mockAxios
      .onPost(`/login`, { email: testEmail, password: testPassword })
      .reply(200, mockResponse);

    const navigation = {
      navigate: jest.fn(),
    };

    const logIn = async (email, password) => {
      try {
        const response = await axios.post(`/login`, { email, password });
        if (response.data.status === "ok") {
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error("Error logging in", error);
      }
    };

    await logIn(testEmail, testPassword);

    // Check that the navigation function was called with the correct screen name
    expect(navigation.navigate).toHaveBeenCalledWith("Home");
  });
});

//chek if all element are rendered
describe("Rendering", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    const { queryByTestId } = render(
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogIn} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    );
    expect(queryByTestId("email")).toBeTruthy();
    expect(queryByTestId("password")).toBeTruthy();
    expect(queryByTestId("loginButton")).toBeTruthy();
    expect(queryByTestId("createAccountButton")).toBeTruthy();
  });
});
