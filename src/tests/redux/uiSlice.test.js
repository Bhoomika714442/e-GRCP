import uiReducer, {
  toggleSidebar,
  setThemeMode,
} from "../../store/uiSlice";

describe("uiSlice", () => {
  test("should toggle sidebar", () => {
    const initialState = {
      sidebarOpen: true,
      themeMode: "light",
    };

    const state = uiReducer(
      initialState,
      toggleSidebar()
    );

    expect(state.sidebarOpen).toBe(false);
  });

  test("should change theme", () => {
    const initialState = {
      sidebarOpen: true,
      themeMode: "light",
    };

    const state = uiReducer(
      initialState,
      setThemeMode("dark")
    );

    expect(state.themeMode).toBe("dark");
  });
});