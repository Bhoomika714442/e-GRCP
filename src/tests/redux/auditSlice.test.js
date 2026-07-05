import { describe, test, expect } from "vitest";

import auditReducer, {
  fetchAudits,
  fetchAuditById,
  fetchAuditHistory,
  fetchAuditReports,
  fetchUserActivities,
  fetchSystemLogs,
} from "../../store/auditSlice";

describe("auditSlice", () => {
  test("returns initial state", () => {
    const state = auditReducer(undefined, {
      type: "@@INIT",
    });

    expect(state).toEqual({
      audits: [],
      selectedAudit: null,
      auditHistory: [],
      auditReports: [],
      userActivities: [],
      systemLogs: [],
      loading: false,
      error: null,
    });
  });

  test("fetchAudits pending", () => {
    const state = auditReducer(
      undefined,
      fetchAudits.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("fetchAudits fulfilled", () => {
    const payload = [
      {
        id: 1,
        title: "Audit 1",
      },
    ];

    const state = auditReducer(
      undefined,
      fetchAudits.fulfilled(payload, "", undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.audits).toEqual(payload);
  });

  test("fetchAudits rejected", () => {
    const state = auditReducer(
      undefined,
      fetchAudits.rejected(
        null,
        "",
        undefined,
        "Something went wrong"
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Something went wrong");
  });

  test("fetchAuditById fulfilled", () => {
    const payload = {
      id: 2,
      title: "Internal Audit",
    };

    const state = auditReducer(
      undefined,
      fetchAuditById.fulfilled(payload, "", 2)
    );

    expect(state.selectedAudit).toEqual(payload);
  });

  test("fetchAuditHistory fulfilled", () => {
    const payload = [
      {
        id: 1,
        action: "Created",
      },
    ];

    const state = auditReducer(
      undefined,
      fetchAuditHistory.fulfilled(payload, "", undefined)
    );

    expect(state.auditHistory).toEqual(payload);
  });

  test("fetchAuditReports fulfilled", () => {
    const payload = [
      {
        id: 1,
        report: "Monthly",
      },
    ];

    const state = auditReducer(
      undefined,
      fetchAuditReports.fulfilled(payload, "", undefined)
    );

    expect(state.auditReports).toEqual(payload);
  });

  test("fetchUserActivities fulfilled", () => {
    const payload = [
      {
        id: 1,
        user: "Admin",
      },
    ];

    const state = auditReducer(
      undefined,
      fetchUserActivities.fulfilled(payload, "", undefined)
    );

    expect(state.userActivities).toEqual(payload);
  });

  test("fetchSystemLogs fulfilled", () => {
    const payload = [
      {
        id: 1,
        log: "Server Started",
      },
    ];

    const state = auditReducer(
      undefined,
      fetchSystemLogs.fulfilled(payload, "", undefined)
    );

    expect(state.systemLogs).toEqual(payload);
  });
});