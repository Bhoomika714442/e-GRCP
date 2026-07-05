// src/tests/forms/Login.test.jsx

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Login from "../../features/auth/Login";

const dispatchMock = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");

  return {
    ...actual,
    useDispatch: () => dispatchMock,
  };
});

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const snackbarMock = vi.fn();

vi.mock("../../hooks/useSnackbar", () => ({
  default: () => snackbarMock,
}));

const loginMock = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  default: () => ({
    login: loginMock,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  }),
}));

vi.mock("../../store/authSlice", () => ({
  clearError: () => ({ type: "auth/clearError" }),
  restoreSession: () => ({ type: "auth/restoreSession" }),
}));

const store = configureStore({
  reducer: {
    auth: (state = {}) => state,
  },
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    renderComponent();

    expect(
      screen.getByText(/Welcome Back/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Email Address/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /LOGIN/i,
      })
    ).toBeInTheDocument();
  });

  it("shows validation errors", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(
      screen.getByRole("button", {
        name: /LOGIN/i,
      })
    );

    expect(
      await screen.findByText(/Email is required/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });

  it("submits valid form", async () => {
    loginMock.mockResolvedValue();

    const user = userEvent.setup();

    renderComponent();

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "admin@test.com"
    );

    await user.type(
      screen.getByLabelText(/Password/i),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /LOGIN/i,
      })
    );

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1);

      expect(loginMock).toHaveBeenCalledWith({
        email: "admin@test.com",
        password: "password123",
      });
    });
  });

  it("dispatches initialization actions", () => {
    renderComponent();

    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });
});