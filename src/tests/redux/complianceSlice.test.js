import { describe, it, expect } from "vitest";

import complianceReducer, {
  clearSelectedCompliance,
  fetchCompliance,
  fetchComplianceById,
  createCompliance,
  updateCompliance,
  deleteCompliance,
} from "../../store/complianceSlice";

describe("complianceSlice", () => {
  const initialState = {
    complianceList: [],
    selectedCompliance: null,
    loading: false,
    error: null,
  };

  it("returns initial state", () => {
    expect(
      complianceReducer(undefined, {
        type: "@@INIT",
      })
    ).toEqual(initialState);
  });

  it("clears selected compliance", () => {
    const state = complianceReducer(
      {
        ...initialState,
        selectedCompliance: {
          id: "CMP001",
        },
      },
      clearSelectedCompliance()
    );

    expect(state.selectedCompliance).toBeNull();
  });

  it("fetchCompliance pending", () => {
    const state = complianceReducer(
      initialState,
      fetchCompliance.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("fetchCompliance fulfilled", () => {
    const payload = [
      {
        id: "CMP001",
      },
    ];

    const state = complianceReducer(
      initialState,
      fetchCompliance.fulfilled(
        payload,
        "",
        undefined
      )
    );

    expect(state.loading).toBe(false);
    expect(state.complianceList).toEqual(payload);
  });

  it("fetchCompliance rejected", () => {
    const state = complianceReducer(
      initialState,
      fetchCompliance.rejected(
        null,
        "",
        undefined,
        "API Error"
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("API Error");
  });

  it("fetchComplianceById pending", () => {
    const state = complianceReducer(
      initialState,
      fetchComplianceById.pending("", "CMP001")
    );

    expect(state.loading).toBe(true);
  });

  it("fetchComplianceById fulfilled", () => {
    const payload = {
      id: "CMP001",
      status: "Pending",
    };

    const state = complianceReducer(
      initialState,
      fetchComplianceById.fulfilled(
        payload,
        "",
        "CMP001"
      )
    );

    expect(state.loading).toBe(false);
    expect(state.selectedCompliance).toEqual(payload);
  });

  it("fetchComplianceById rejected", () => {
    const state = complianceReducer(
      initialState,
      fetchComplianceById.rejected(
        null,
        "",
        "CMP001",
        "Not Found"
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Not Found");
  });

  it("createCompliance fulfilled", () => {
    const payload = {
      id: "CMP100",
      title: "ISO"
    };

    const state = complianceReducer(
      initialState,
      createCompliance.fulfilled(
        payload,
        "",
        payload
      )
    );

    expect(state.complianceList).toContainEqual(payload);
  });

  it("updateCompliance updates list", () => {
    const state = {
      ...initialState,
      complianceList: [
        {
          id: "CMP001",
          status: "Pending",
        },
      ],
    };

    const updated = {
      id: "CMP001",
      status: "Completed",
    };

    const result = complianceReducer(
      state,
      updateCompliance.fulfilled(updated)
    );

    expect(result.complianceList[0]).toEqual(updated);
  });

  it("updateCompliance updates selected", () => {
    const state = {
      ...initialState,
      complianceList: [
        {
          id: "CMP001",
          status: "Pending",
        },
      ],
      selectedCompliance: {
        id: "CMP001",
        status: "Pending",
      },
    };

    const updated = {
      id: "CMP001",
      status: "Completed",
    };

    const result = complianceReducer(
      state,
      updateCompliance.fulfilled(updated)
    );

    expect(result.selectedCompliance).toEqual(updated);
  });

  it("updateCompliance ignores unknown id", () => {
    const state = {
      ...initialState,
      complianceList: [
        {
          id: "CMP001",
          status: "Pending",
        },
      ],
    };

    const updated = {
      id: "CMP999",
      status: "Completed",
    };

    const result = complianceReducer(
      state,
      updateCompliance.fulfilled(updated)
    );

    expect(result.complianceList[0].status).toBe("Pending");
    expect(result.selectedCompliance).toBeNull();
  });

  it("updateCompliance keeps different selected compliance", () => {
    const state = {
      ...initialState,
      complianceList: [
        {
          id: "CMP001",
          status: "Pending",
        },
      ],
      selectedCompliance: {
        id: "CMP002",
        status: "Pending",
      },
    };

    const updated = {
      id: "CMP001",
      status: "Completed",
    };

    const result = complianceReducer(
      state,
      updateCompliance.fulfilled(updated)
    );

    expect(result.selectedCompliance).toEqual({
      id: "CMP002",
      status: "Pending",
    });
  });

  it("deleteCompliance removes compliance", () => {
    const state = {
      ...initialState,
      complianceList: [
        { id: "CMP001" },
        { id: "CMP002" },
      ],
    };

    const result = complianceReducer(
      state,
      deleteCompliance.fulfilled(
        "CMP001",
        "",
        "CMP001"
      )
    );

    expect(result.complianceList).toEqual([
      { id: "CMP002" },
    ]);
  });

  it("deleteCompliance clears selected compliance", () => {
    const state = {
      ...initialState,
      complianceList: [
        { id: "CMP001" },
      ],
      selectedCompliance: {
        id: "CMP001",
      },
    };

    const result = complianceReducer(
      state,
      deleteCompliance.fulfilled(
        "CMP001",
        "",
        "CMP001"
      )
    );

    expect(result.selectedCompliance).toBeNull();
  });

  it("deleteCompliance keeps different selected compliance", () => {
    const state = {
      ...initialState,
      complianceList: [
        { id: "CMP001" },
        { id: "CMP002" },
      ],
      selectedCompliance: {
        id: "CMP002",
      },
    };

    const result = complianceReducer(
      state,
      deleteCompliance.fulfilled(
        "CMP001",
        "",
        "CMP001"
      )
    );

    expect(result.selectedCompliance).toEqual({
      id: "CMP002",
    });
  });

  it("deleteCompliance with null selected compliance", () => {
    const state = {
      ...initialState,
      complianceList: [
        { id: "CMP001" },
      ],
      selectedCompliance: null,
    };

    const result = complianceReducer(
      state,
      deleteCompliance.fulfilled(
        "CMP001",
        "",
        "CMP001"
      )
    );

    expect(result.selectedCompliance).toBeNull();
  });
});