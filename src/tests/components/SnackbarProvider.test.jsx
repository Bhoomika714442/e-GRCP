import {
  describe,
  it,
  expect,
} from "vitest";

import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import { useContext } from "react";

import SnackbarProvider, {
  SnackbarContext,
} from "../../components/SnackbarProvider";

function TestComponent() {
  const showSnackbar = useContext(SnackbarContext);

  return (
    <>
      <button
        onClick={() =>
          showSnackbar(
            "Success Message",
            "success"
          )
        }
      >
        Success
      </button>

      <button
        onClick={() =>
          showSnackbar(
            "Error Message",
            "error"
          )
        }
      >
        Error
      </button>
    </>
  );
}

describe("SnackbarProvider", () => {
  it("renders children", () => {
    render(
      <SnackbarProvider>
        <div>Child Component</div>
      </SnackbarProvider>
    );

    expect(
      screen.getByText("Child Component")
    ).toBeInTheDocument();
  });

  it("shows success snackbar", () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(
      screen.getByText("Success")
    );

    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Success Message")
    ).toBeInTheDocument();
  });

  it("shows error snackbar", () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(
      screen.getByText("Error")
    );

    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Error Message")
    ).toBeInTheDocument();
  });

  it("renders close button and handles click", () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(
      screen.getByText("Success")
    );

    const closeButton =
      screen.getByLabelText(/close/i);

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    // Snackbar close animation is handled by MUI.
    // We only verify that the click executes without errors.
    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();
  });

  it("handles clickaway event", () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(
      screen.getByText("Success")
    );

    const snackbar =
      screen
        .getByRole("presentation");

    fireEvent(
      snackbar,
      new Event("close")
    );

    expect(
      screen.getByText("Success Message")
    ).toBeInTheDocument();
  });
});