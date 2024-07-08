import "react-native-gesture-handler/jestSetup";

// Mocking react-native-gesture-handler
jest.mock("react-native-gesture-handler", () => {
  return {
    GestureHandlerRootView: ({ children }) => children,
    Directions: {},
    State: {},
    PanGestureHandler: ({ children }) => children,
    TapGestureHandler: ({ children }) => children,
    LongPressGestureHandler: ({ children }) => children,
    // Add any other gesture handlers if necessary
  };
});

// Mocking async-storage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  getAllKeys: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));

// Mocking expo-image-picker
jest.mock("expo-image-picker", () => {
  return {
    ...jest.requireActual("expo-image-picker"),
    requestMediaLibraryPermissionsAsync: jest
      .fn()
      .mockResolvedValue({ status: "granted" }),
    launchImageLibraryAsync: jest.fn().mockResolvedValue({ cancelled: true }),
  };
});

// Mocking @expo/vector-icons
jest.mock("@expo/vector-icons", () => {
  return {
    Ionicons: jest.fn(),
    Entypo: jest.fn(),
    SimpleLineIcons: jest.fn(),
  };
});

// Mocking react-native-reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

// Mocking react-native/Libraries/Animated/NativeAnimatedHelper
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
