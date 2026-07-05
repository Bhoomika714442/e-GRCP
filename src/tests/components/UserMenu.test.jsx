import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserMenu from "../../components/UserMenu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";

const navigate = vi.fn();
const dispatch = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("../../store/authSlice", () => ({
  logoutUser: vi.fn(() => ({
    type: "auth/logoutUser",
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

describe("UserMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useDispatch.mockReturnValue(dispatch);

    dispatch.mockResolvedValue(true);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );

  it("renders avatar button", () => {
    renderComponent();

    expect(
      screen.getByRole("button")
    ).toBeInTheDocument();
  });

  it("opens menu", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    expect(
      screen.getByText("Profile")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Settings")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Logout")
    ).toBeInTheDocument();
  });

  it("navigates to profile", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    fireEvent.click(
      screen.getByText("Profile")
    );

    expect(navigate).toHaveBeenCalledWith(
      "/profile"
    );
  });

  it("navigates to settings", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    fireEvent.click(
      screen.getByText("Settings")
    );

    expect(navigate).toHaveBeenCalledWith(
      "/settings"
    );
  });

  it("dispatches logout and navigates to login", async () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    fireEvent.click(
      screen.getByText("Logout")
    );

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/logoutUser",
    });

    expect(navigate).toHaveBeenCalledWith(
      "/login",
      {
        replace: true,
      }
    );
  });

  it("closes menu after profile click", async () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    fireEvent.click(
      screen.getByText("Profile")
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Profile")
      ).not.toBeInTheDocument();
    });
  });

  it("closes menu after settings click", async () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    fireEvent.click(
      screen.getByText("Settings")
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Settings")
      ).not.toBeInTheDocument();
    });
  });

  it("closes menu after logout", async () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    fireEvent.click(
      screen.getByText("Logout")
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Logout")
      ).not.toBeInTheDocument();
    });
  });

  it("closes menu on Escape key", async () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button")
    );

    expect(
      screen.getByText("Profile")
    ).toBeInTheDocument();

    const menu = screen.getByRole("menu");

    menu.focus();

    fireEvent.keyDown(menu, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      which: 27,
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Profile")
      ).not.toBeInTheDocument();
    });
  });
});