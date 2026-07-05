import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VendorForm from "../../features/vendors/VendorForm";

const navigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: () => ({}),

    control: {},

    formState: {
      errors: {},
    },

    handleSubmit:
      (callback) => (e) => {
        e?.preventDefault();

        callback({
          name: "ABC Pvt Ltd",
          category: "Software",
          contact: "John",
          email: "abc@test.com",
          phone: "9876543210",
          status: "Active",
        });
      },
  }),

  Controller: ({ render }) =>
    render({
      field: {
        value: "",
        onChange: vi.fn(),
      },
    }),
}));

describe("VendorForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal("alert", vi.fn());
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <VendorForm />
      </MemoryRouter>
    );

  it("renders heading", () => {
    renderComponent();

    expect(
      screen.getByText("Add Vendor")
    ).toBeInTheDocument();
  });

  it("renders all text fields", () => {
    renderComponent();

    expect(
      screen.getByLabelText(/Vendor Name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Category/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Contact Person/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Phone/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Status/i)
    ).toBeInTheDocument();
  });

  it("renders buttons", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /Save Vendor/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Cancel/i,
      })
    ).toBeInTheDocument();
  });

  it("submits form successfully", () => {
    renderComponent();

    fireEvent.submit(
      screen
        .getByRole("button", {
          name: /Save Vendor/i,
        })
        .closest("form")
    );

    expect(alert).toHaveBeenCalledWith(
      "Vendor Added Successfully"
    );

    expect(navigate).toHaveBeenCalledWith(
      "/vendors"
    );
  });

  it("navigates on cancel", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cancel/i,
      })
    );

    expect(navigate).toHaveBeenCalledWith(
      "/vendors"
    );
  });
});