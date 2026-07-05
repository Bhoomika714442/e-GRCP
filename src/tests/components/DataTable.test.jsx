import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DataTable from "../../components/DataTable";

vi.mock("../../components/PageLoader", () => ({
  default: ({ message }) => <div>{message}</div>,
}));

vi.mock("../../components/EmptyState", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

describe("DataTable", () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "department",
      headerName: "Department",
    },
  ];

  const rows = [
    {
      id: 1,
      name: "ABC Technologies",
      department: "IT",
    },
  ];

  test("shows page loader", () => {
    render(
      <DataTable
        loading
        columns={columns}
      />
    );

    expect(
      screen.getByText(/loading data/i)
    ).toBeInTheDocument();
  });

  test("shows empty columns", () => {
    render(
      <DataTable
        columns={[]}
        rows={rows}
      />
    );

    expect(
      screen.getByText(/no columns available/i)
    ).toBeInTheDocument();
  });

  test("shows empty rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
      />
    );

    expect(
      screen.getByText(/no records found/i)
    ).toBeInTheDocument();
  });

  test("renders table headers", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();
  });

  test("renders table rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
      />
    );

    expect(screen.getByText("ABC Technologies")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
  });

  test("renders pagination", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
      />
    );

    expect(
      screen.getByText(/rows per page/i)
    ).toBeInTheDocument();
  });
});