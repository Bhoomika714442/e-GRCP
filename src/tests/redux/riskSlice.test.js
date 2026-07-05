import { describe, it, expect } from "vitest";

import reducer, {
  clearSelectedRisk,
  fetchRisks,
  fetchRiskById,
  createRisk,
  updateRisk,
  deleteRisk,
  updateRiskStatus,
} from "../../store/riskSlice";

describe("riskSlice", () => {
  const initialState = {
    riskList: [],
    selectedRisk: null,
    loading: false,
    error: null,
  };

  const risk = {
    id: 1,
    title: "Cyber Risk",
    status: "Open",
  };

  it("returns initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("clearSelectedRisk", () => {
    const state = {
      ...initialState,
      selectedRisk: risk,
    };

    expect(
      reducer(state, clearSelectedRisk()).selectedRisk
    ).toBeNull();
  });

  // ---------------- fetchRisks ----------------

  it("fetchRisks pending", () => {
    const state = reducer(
      initialState,
      fetchRisks.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("fetchRisks fulfilled", () => {
    const state = reducer(
      initialState,
      fetchRisks.fulfilled([risk], "", undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.riskList).toEqual([risk]);
  });

  it("fetchRisks rejected", () => {
    const state = reducer(
      initialState,
      fetchRisks.rejected(
        null,
        "",
        undefined,
        "Failed"
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed");
  });

  // ---------------- fetchRiskById ----------------

  it("fetchRiskById fulfilled", () => {
    const state = reducer(
      initialState,
      fetchRiskById.fulfilled(risk, "", 1)
    );

    expect(state.selectedRisk).toEqual(risk);
  });

  it("fetchRiskById rejected leaves state unchanged", () => {
    const state = reducer(
      initialState,
      fetchRiskById.rejected(
        null,
        "",
        1,
        "Error"
      )
    );

    expect(state).toEqual(initialState);
  });

  // ---------------- createRisk ----------------

  it("createRisk fulfilled", () => {
    const state = reducer(
      initialState,
      createRisk.fulfilled(risk, "", risk)
    );

    expect(state.riskList).toEqual([risk]);
  });

  it("createRisk rejected", () => {
    const state = reducer(
      initialState,
      createRisk.rejected(
        null,
        "",
        risk,
        "Error"
      )
    );

    expect(state).toEqual(initialState);
  });

  // ---------------- updateRisk ----------------

  it("updates existing risk and selectedRisk", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: risk,
    };

    const updated = {
      ...risk,
      status: "Closed",
    };

    const result = reducer(
      state,
      updateRisk.fulfilled(updated, "", {
        id: 1,
        data: updated,
      })
    );

    expect(result.riskList[0]).toEqual(updated);
    expect(result.selectedRisk).toEqual(updated);
  });

  it("updates only list when selectedRisk is null", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: null,
    };

    const updated = {
      ...risk,
      status: "Mitigated",
    };

    const result = reducer(
      state,
      updateRisk.fulfilled(updated, "", {
        id: 1,
        data: updated,
      })
    );

    expect(result.riskList[0]).toEqual(updated);
    expect(result.selectedRisk).toBeNull();
  });

  it("does not update selectedRisk if ids differ", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: {
        id: 100,
        status: "Open",
      },
    };

    const updated = {
      ...risk,
      status: "Closed",
    };

    const result = reducer(
      state,
      updateRisk.fulfilled(updated)
    );

    expect(result.riskList[0].status).toBe("Closed");
    expect(result.selectedRisk).toEqual({
      id: 100,
      status: "Open",
    });
  });

  it("does nothing when risk id not found", () => {
    const state = {
      ...initialState,
      riskList: [risk],
    };

    const result = reducer(
      state,
      updateRisk.fulfilled(
        {
          id: 99,
          status: "Closed",
        },
        ""
      )
    );

    expect(result.riskList).toEqual([risk]);
  });

  it("updateRisk rejected", () => {
    expect(
      reducer(
        initialState,
        updateRisk.rejected(
          null,
          "",
          {},
          "Error"
        )
      )
    ).toEqual(initialState);
  });

  // ---------------- deleteRisk ----------------

  it("deleteRisk removes selected risk", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: risk,
    };

    const result = reducer(
      state,
      deleteRisk.fulfilled(1)
    );

    expect(result.riskList).toEqual([]);
    expect(result.selectedRisk).toBeNull();
  });

  it("deleteRisk keeps different selectedRisk", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: {
        id: 2,
      },
    };

    const result = reducer(
      state,
      deleteRisk.fulfilled(1)
    );

    expect(result.selectedRisk).toEqual({
      id: 2,
    });
  });

  it("deleteRisk when selectedRisk is null", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: null,
    };

    const result = reducer(
      state,
      deleteRisk.fulfilled(1)
    );

    expect(result.selectedRisk).toBeNull();
    expect(result.riskList).toEqual([]);
  });

  it("deleteRisk rejected", () => {
    expect(
      reducer(
        initialState,
        deleteRisk.rejected(
          null,
          "",
          1,
          "Error"
        )
      )
    ).toEqual(initialState);
  });

  // ---------------- updateRiskStatus ----------------

  it("updates risk status and selectedRisk", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: risk,
    };

    const updated = {
      ...risk,
      status: "Resolved",
    };

    const result = reducer(
      state,
      updateRiskStatus.fulfilled(updated)
    );

    expect(result.riskList[0]).toEqual(updated);
    expect(result.selectedRisk).toEqual(updated);
  });

  it("updates list when selectedRisk is null", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: null,
    };

    const updated = {
      ...risk,
      status: "Monitoring",
    };

    const result = reducer(
      state,
      updateRiskStatus.fulfilled(updated)
    );

    expect(result.riskList[0]).toEqual(updated);
    expect(result.selectedRisk).toBeNull();
  });

  it("does not update selectedRisk when ids differ", () => {
    const state = {
      ...initialState,
      riskList: [risk],
      selectedRisk: {
        id: 10,
        status: "Open",
      },
    };

    const updated = {
      ...risk,
      status: "Resolved",
    };

    const result = reducer(
      state,
      updateRiskStatus.fulfilled(updated)
    );

    expect(result.riskList[0].status).toBe("Resolved");
    expect(result.selectedRisk).toEqual({
      id: 10,
      status: "Open",
    });
  });

  it("ignores unknown status update", () => {
    const state = {
      ...initialState,
      riskList: [risk],
    };

    const result = reducer(
      state,
      updateRiskStatus.fulfilled({
        id: 99,
        status: "Resolved",
      })
    );

    expect(result.riskList).toEqual([risk]);
  });

  it("updateRiskStatus rejected", () => {
    expect(
      reducer(
        initialState,
        updateRiskStatus.rejected(
          null,
          "",
          {},
          "Error"
        )
      )
    ).toEqual(initialState);
  });
});