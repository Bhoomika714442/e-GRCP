import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
  test("renders footer text", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /Enterprise Governance Platform/i
      )
    ).toBeInTheDocument();
  });

  test("contains copyright", () => {
    render(<Footer />);

    expect(
      screen.getByText(/2026/i)
    ).toBeInTheDocument();
  });
});