import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import SearchBar from "../../components/SearchBar";

describe("SearchBar", () => {
  test("renders search field", () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
      />
    );

    expect(
      screen.getByPlaceholderText("Search...")
    ).toBeInTheDocument();
  });

  test("calls onChange", () => {
    const handleChange = vi.fn();

    render(
      <SearchBar
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Search..."),
      {
        target: {
          value: "Laptop",
        },
      }
    );

    expect(handleChange).toHaveBeenCalled();
  });
});