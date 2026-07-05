import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";

import Sidebar from "../../components/Sidebar";

describe("Sidebar", () => {
  const renderSidebar = () =>
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

  test("renders application title", () => {
    renderSidebar();

    expect(
      screen.getByText(/enterprise grc/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/governance platform/i)
    ).toBeInTheDocument();
  });

  test("renders all sidebar menu items", () => {
    renderSidebar();

    expect(
      screen.getByText(/dashboard/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/procurement/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/vendors/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/risk/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/compliance/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/audit/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/approval workbench/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/reports/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/settings/i)
    ).toBeInTheDocument();
  });

  test("renders correct number of navigation items", () => {
    renderSidebar();

    const menuItems = screen.getAllByRole("link");

    expect(menuItems).toHaveLength(9);
  });
});