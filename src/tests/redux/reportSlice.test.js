import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import reportReducer, {
  fetchReports,
  exportCSV,
  exportExcel,
  saveReport,
} from "../../store/reportSlice";

import reportService from "../../services/reportService";

vi.mock("../../services/reportService", () => ({
  default: {
    getReports: vi.fn(),
    exportCSV: vi.fn(),
    exportExcel: vi.fn(),
    saveReport: vi.fn(),
  },
}));

describe("reportSlice", () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(console, "log").mockImplementation(() => {});

    store = configureStore({
      reducer: {
        reports: reportReducer,
      },
    });
  });

  it("returns initial state", () => {
    expect(
      reportReducer(undefined, {
        type: "@@INIT",
      })
    ).toEqual({
      reports: [],
      savedReports: [],
      loading: false,
      error: null,
    });
  });

  it("fetchReports pending", () => {
    const state = reportReducer(
      undefined,
      fetchReports.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("fetchReports fulfilled", async () => {
    const reports = [
      {
        id: 1,
        title: "Monthly Report",
      },
      {
        id: 2,
        title: "Annual Report",
      },
    ];

    reportService.getReports.mockResolvedValue(reports);

    await store.dispatch(fetchReports());

    const state = store.getState().reports;

    expect(state.loading).toBe(false);
    expect(state.reports).toEqual(reports);
    expect(state.error).toBeNull();
  });

  it("fetchReports rejected", async () => {
    reportService.getReports.mockRejectedValue(
      new Error("Fetch Failed")
    );

    await store.dispatch(fetchReports());

    const state = store.getState().reports;

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Fetch Failed");
  });

  it("saveReport fulfilled", async () => {
    const report = {
      id: 10,
      title: "Risk Summary",
    };

    reportService.saveReport.mockResolvedValue(report);

    await store.dispatch(saveReport(report));

    expect(
      store.getState().reports.savedReports
    ).toContainEqual(report);
  });

  it("exportCSV fulfilled", async () => {
    reportService.exportCSV.mockResolvedValue(true);

    await store.dispatch(exportCSV());

    expect(console.log).toHaveBeenCalledWith(
      "CSV Export Completed"
    );
  });

  it("exportExcel fulfilled", async () => {
    reportService.exportExcel.mockResolvedValue(true);

    await store.dispatch(exportExcel());

    expect(console.log).toHaveBeenCalledWith(
      "Excel Export Completed"
    );
  });

  it("handles exportCSV action in reducer", () => {
    const state = reportReducer(
      undefined,
      exportCSV.fulfilled(true, "", undefined)
    );

    expect(state).toEqual({
      reports: [],
      savedReports: [],
      loading: false,
      error: null,
    });
  });

  it("handles exportExcel action in reducer", () => {
    const state = reportReducer(
      undefined,
      exportExcel.fulfilled(true, "", undefined)
    );

    expect(state).toEqual({
      reports: [],
      savedReports: [],
      loading: false,
      error: null,
    });
  });

  it("saveReport appends multiple reports", () => {
    let state = reportReducer(
      undefined,
      saveReport.fulfilled(
        { id: 1, title: "Report A" },
        "",
        undefined
      )
    );

    state = reportReducer(
      state,
      saveReport.fulfilled(
        { id: 2, title: "Report B" },
        "",
        undefined
      )
    );

    expect(state.savedReports).toHaveLength(2);
    expect(state.savedReports[0].title).toBe("Report A");
    expect(state.savedReports[1].title).toBe("Report B");
  });
});