import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../features/auth/Login";

import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";

import {
  clearError,
  restoreSession,
} from "../../store/authSlice";

const navigate = vi.fn();
const dispatch = vi.fn();
const snackbar = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("../../hooks/useAuth");

vi.mock("../../hooks/useSnackbar");

vi.mock("../../store/authSlice", () => ({
  clearError: vi.fn(() => ({
    type: "auth/clearError",
  })),
  restoreSession: vi.fn(() => ({
    type: "auth/restoreSession",
  })),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useDispatch.mockReturnValue(dispatch);

    useSnackbar.mockReturnValue(snackbar);

    useAuth.mockReturnValue({
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  it("renders correctly", () => {
    renderComponent();

    expect(
      screen.getByText(/welcome back/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });

  it("dispatches clearError on mount", () => {
    renderComponent();

    expect(clearError).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/clearError",
    });
  });

  it("dispatches restoreSession on mount", () => {
    renderComponent();

    expect(restoreSession).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/restoreSession",
    });
  });

  it("shows validation errors", async () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      await screen.findByText(
        /email is required/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /password is required/i
      )
    ).toBeInTheDocument();
  });

  it("shows invalid email validation", async () => {
    renderComponent();

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: "abc",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      await screen.findByText(
        /enter a valid email/i
      )
    ).toBeInTheDocument();
  });

  it("shows minimum password validation", async () => {
    renderComponent();

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: "test@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: "123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      await screen.findByText(
        /minimum 6 characters/i
      )
    ).toBeInTheDocument();
  });

  it("calls login on valid submit", async () => {
    const login = vi.fn();

    useAuth.mockReturnValue({
      login,
      logout: vi.fn(),
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });

    renderComponent();

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: "admin@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: "password123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "admin@test.com",
        password: "password123",
      });
    });
  });

  it("shows loading spinner", () => {
    useAuth.mockReturnValue({
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: true,
      error: null,
      isAuthenticated: false,
    });

    renderComponent();

    expect(
      screen.getByRole("progressbar")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button")
    ).toBeDisabled();
  });

  it("shows snackbar when login fails", () => {
  useAuth.mockReturnValue({
    login: vi.fn(),
    logout: vi.fn(),
    isLoading: false,
    error: "Login Failed",
    isAuthenticated: false,
  });

  renderComponent();

  expect(snackbar).toHaveBeenCalledWith(
    "Login Failed",
    "error"
  );
});

  it("shows snackbar on error", () => {
    useAuth.mockReturnValue({
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      error: "Invalid Credentials",
      isAuthenticated: false,
    });

    renderComponent();

    expect(snackbar).toHaveBeenCalledWith(
      "Invalid Credentials",
      "error"
    );
  });

  it("shows success snackbar and navigates", () => {
    useAuth.mockReturnValue({
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      error: null,
      isAuthenticated: true,
    });

    renderComponent();

    expect(snackbar).toHaveBeenCalledWith(
      "Login successful. Welcome back!",
      "success"
    );

    expect(navigate).toHaveBeenCalledWith(
      "/dashboard"
    );
  });

  it("renders forgot password link", () => {
    renderComponent();

    const link = screen.getByRole("link", {
      name: /forgot password/i,
    });

    expect(link).toHaveAttribute(
      "href",
      "/forgot-password"
    );
  });
});