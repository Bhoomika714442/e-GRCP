import { describe, test, expect } from "vitest";

import procurementReducer, {
  fetchRequests,
  createRequest,
  editRequest,
  removeRequest,
  approveRequest,
  rejectRequest,
  selectRequest,
  clearSelectedRequest,
  updateRequestStatus,
} from "../../store/procurementSlice";

describe("procurementSlice", () => {
  const initialState = {
    requests: [],
    selectedRequest: null,
    loading: false,
    error: null,
  };

  test("returns initial state", () => {
    expect(
      procurementReducer(undefined, {
        type: "@@INIT",
      })
    ).toEqual(initialState);
  });

  test("fetchRequests pending", () => {
    const state = procurementReducer(
      initialState,
      fetchRequests.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("fetchRequests fulfilled", () => {
    const payload = [
      {
        id: 1,
        vendor: "Dell",
      },
    ];

    const state = procurementReducer(
      initialState,
      fetchRequests.fulfilled(payload)
    );

    expect(state.loading).toBe(false);
    expect(state.requests).toEqual(payload);
  });

  test("fetchRequests rejected", () => {
    const state = procurementReducer(
      initialState,
      fetchRequests.rejected(
        null,
        "",
        undefined,
        "Fetch Failed"
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Fetch Failed");
  });

  test("createRequest fulfilled", () => {
    const payload = {
      id: 10,
      vendor: "HP",
    };

    const state = procurementReducer(
      initialState,
      createRequest.fulfilled(payload)
    );

    expect(state.requests[0]).toEqual(payload);
  });

  test("editRequest fulfilled updates request", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 1,
          vendor: "Dell",
        },
      ],
      selectedRequest: {
        id: 1,
        vendor: "Dell",
      },
    };

    const updated = {
      id: 1,
      vendor: "HP",
    };

    const result = procurementReducer(
      state,
      editRequest.fulfilled(updated)
    );

    expect(result.requests[0]).toEqual(updated);
    expect(result.selectedRequest).toEqual(updated);
  });

  test("removeRequest fulfilled removes request", () => {
    const state = {
      ...initialState,
      requests: [
        { id: 1 },
        { id: 2 },
      ],
      selectedRequest: { id: 1 },
    };

    const result = procurementReducer(
      state,
      removeRequest.fulfilled(1)
    );

    expect(result.requests).toEqual([{ id: 2 }]);
    expect(result.selectedRequest).toBeNull();
  });

  test("approveRequest fulfilled updates request", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 1,
          status: "Pending",
        },
      ],
    };

    const approved = {
      id: 1,
      status: "Approved",
    };

    const result = procurementReducer(
      state,
      approveRequest.fulfilled(approved)
    );

    expect(result.requests[0].status).toBe("Approved");
  });

  test("rejectRequest fulfilled updates request", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 1,
          status: "Pending",
        },
      ],
    };

    const rejected = {
      id: 1,
      status: "Rejected",
    };

    const result = procurementReducer(
      state,
      rejectRequest.fulfilled(rejected)
    );

    expect(result.requests[0].status).toBe("Rejected");
  });

  test("selectRequest reducer", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 10,
          vendor: "Dell",
        },
      ],
    };

    const result = procurementReducer(
      state,
      selectRequest(10)
    );

    expect(result.selectedRequest).toEqual({
      id: 10,
      vendor: "Dell",
    });
  });

  test("selectRequest returns null when id not found", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 1,
        },
      ],
    };

    const result = procurementReducer(
      state,
      selectRequest(100)
    );

    expect(result.selectedRequest).toBeNull();
  });

  test("clearSelectedRequest reducer", () => {
    const state = {
      ...initialState,
      selectedRequest: {
        id: 5,
      },
    };

    const result = procurementReducer(
      state,
      clearSelectedRequest()
    );

    expect(result.selectedRequest).toBeNull();
  });

  test("updateRequestStatus reducer", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 1,
          status: "Pending",
        },
      ],
    };

    const result = procurementReducer(
      state,
      updateRequestStatus({
        id: 1,
        status: "Approved",
      })
    );

    expect(result.requests[0].status).toBe(
      "Approved"
    );
  });

  test("updateRequestStatus does nothing if request missing", () => {
    const state = {
      ...initialState,
      requests: [
        {
          id: 1,
          status: "Pending",
        },
      ],
    };

    const result = procurementReducer(
      state,
      updateRequestStatus({
        id: 5,
        status: "Approved",
      })
    );

    expect(result.requests[0].status).toBe(
      "Pending"
    );
  });

  test("editRequest rejected", () => {
    const state = procurementReducer(
      initialState,
      editRequest.rejected(
        null,
        "",
        undefined,
        "Update Failed"
      )
    );

    expect(state.error).toBeNull();
  });

  test("removeRequest rejected", () => {
    const state = procurementReducer(
      initialState,
      removeRequest.rejected(
        null,
        "",
        undefined,
        "Delete Failed"
      )
    );

    expect(state.requests).toEqual([]);
  });

  test("approveRequest rejected", () => {
    const state = procurementReducer(
      initialState,
      approveRequest.rejected(
        null,
        "",
        undefined,
        "Approve Failed"
      )
    );

    expect(state.requests).toEqual([]);
  });

  test("rejectRequest rejected", () => {
    const state = procurementReducer(
      initialState,
      rejectRequest.rejected(
        null,
        "",
        undefined,
        "Reject Failed"
      )
    );

    expect(state.requests).toEqual([]);
  });
});