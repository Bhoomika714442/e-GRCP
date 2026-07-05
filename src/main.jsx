import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import SnackbarProvider from "./components/SnackbarProvider";
import App from "./App";

import store from "./store";

import getTheme from "./theme";

import "./index.css";

const ThemeWrapper = () => {
  const themeMode = useSelector(
    (state) => state.ui.themeMode
  );

  let mode = themeMode;

  if (themeMode === "system") {
    mode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  }

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <SnackbarProvider>
          <ThemeWrapper />
        </SnackbarProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);