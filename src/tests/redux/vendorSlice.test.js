import vendorReducer from "../../store/vendorSlice";

describe("vendorSlice", () => {
  test("should return the initial state", () => {
    expect(
      vendorReducer(undefined, { type: undefined })
    ).toEqual({});
  });
});