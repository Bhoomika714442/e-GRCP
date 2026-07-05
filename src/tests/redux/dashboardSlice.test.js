import { describe, it, expect } from "vitest";
import dashboardReducer from "../../store/dashboardSlice";

describe("dashboardSlice", () => {
  it("returns the initial state", () => {
    expect(
      dashboardReducer(undefined, {
        type: "@@INIT",
      })
    ).toEqual({});
  });

  it("returns current state for unknown action", () => {
    const state = {
      dashboard: "Enterprise Dashboard",
    };

    expect(
      dashboardReducer(state, {
        type: "UNKNOWN_ACTION",
      })
    ).toEqual(state);
  });
});