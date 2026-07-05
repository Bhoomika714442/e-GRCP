import { createSlice } from "@reduxjs/toolkit";

const getSavedTheme = () => {
  return localStorage.getItem("themeMode") || "light";
};

const initialState = {
  sidebarOpen: true,
  themeMode: getSavedTheme(),
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setThemeMode(state, action) {
      state.themeMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
  },
});

export const {
  toggleSidebar,
  setThemeMode,
} = uiSlice.actions;

export default uiSlice.reducer;