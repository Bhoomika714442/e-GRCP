import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

vi.mock("../../components/NotificationBell", () => ({
  default: () => (
    <div data-testid="notification-bell">
      Notification Bell
    </div>
  ),
}));

vi.mock("../../components/UserMenu", () => ({
  default: () => (
    <div data-testid="user-menu">
      User Menu
    </div>
  ),
}));

import Header from "../../components/Header";

describe("Header", () => {
  test("renders successfully", () => {
    render(<Header />);

    expect(
      screen.getByPlaceholderText("Search...")
    ).toBeInTheDocument();
  });

  test("renders NotificationBell", () => {
    render(<Header />);

    expect(
      screen.getByTestId("notification-bell")
    ).toBeInTheDocument();
  });

  test("renders UserMenu", () => {
    render(<Header />);

    expect(
      screen.getByTestId("user-menu")
    ).toBeInTheDocument();
  });

  test("search input is enabled", () => {
    render(<Header />);

    expect(
      screen.getByRole("textbox")
    ).toBeEnabled();
  });
});