import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import PageLoader from "../../components/PageLoader";

describe("PageLoader", () => {
  test("renders circular progress", () => {
    render(<PageLoader />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders only one progress indicator", () => {
    render(<PageLoader />);

    expect(
      screen.getAllByRole("progressbar")
    ).toHaveLength(1);
  });
});