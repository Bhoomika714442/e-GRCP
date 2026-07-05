import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProcurementForm from "../../features/procurement/ProcurementForm";

const navigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

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
      (onSubmit) =>
      (e) => {
        e?.preventDefault();

        onSubmit({
          vendor: "Dell",
          department: "IT",
          category: "Hardware",
          amount: 50000,
          priority: "High",
          description: "Purchase laptops",
        });
      },
  }),

  Controller: ({ render }) =>
    render({
      field: {
        value: "",
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
        name: "",
      },
    }),
}));

describe("ProcurementForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal("alert", vi.fn());
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ProcurementForm />
      </MemoryRouter>
    );

  it("renders heading", () => {
    renderComponent();

    expect(
      screen.getByText("New Procurement Request")
    ).toBeInTheDocument();
  });

  it("renders all fields", () => {
    renderComponent();

    expect(screen.getByLabelText(/Vendor/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Department/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Category/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Amount/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Priority/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Description/i)
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /Submit Request/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Cancel/i,
      })
    ).toBeInTheDocument();
  });

  it("submits successfully", () => {
    renderComponent();

    fireEvent.submit(
      screen
        .getByRole("button", {
          name: /Submit Request/i,
        })
        .closest("form")
    );

    expect(alert).toHaveBeenCalledTimes(1);

    expect(alert).toHaveBeenCalledWith(
      "Procurement Request Submitted Successfully"
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(
      "/procurement"
    );
  });

  it("navigates on cancel", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cancel/i,
      })
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(
      "/procurement"
    );
  });

  it("contains form element", () => {
    const { container } = renderComponent();

    expect(
      container.querySelector("form")
    ).toBeInTheDocument();
  });
});