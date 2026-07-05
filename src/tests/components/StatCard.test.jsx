import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatCard from "../../components/StatCard";
import DashboardIcon from "@mui/icons-material/Dashboard";

describe("StatCard", () => {
  it("renders title value and icon", () => {
    render(
      <StatCard
        title="Users"
        value="120"
        icon={<DashboardIcon data-testid="icon" />}
      />
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders upward trend", () => {
    render(
      <StatCard
        title="Revenue"
        value="$100"
        icon={<DashboardIcon />}
        change="+10%"
        changeType="up"
      />
    );

    expect(screen.getByText("+10%")).toBeInTheDocument();
    expect(screen.getByText(/vs last month/i)).toBeInTheDocument();
  });

  it("renders downward trend", () => {
    render(
      <StatCard
        title="Revenue"
        value="$100"
        icon={<DashboardIcon />}
        change="-10%"
        changeType="down"
      />
    );

    expect(screen.getByText("-10%")).toBeInTheDocument();
  });

  it("does not render trend when change is missing", () => {
    render(
      <StatCard
        title="Orders"
        value="50"
        icon={<DashboardIcon />}
      />
    );

    expect(
      screen.queryByText(/vs last month/i)
    ).not.toBeInTheDocument();
  });

  it("accepts custom color", () => {
    render(
      <StatCard
        title="Sales"
        value="10"
        color="#ff0000"
        icon={<DashboardIcon />}
      />
    );

    expect(screen.getByText("Sales")).toBeInTheDocument();
  });
});