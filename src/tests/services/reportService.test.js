import reportService from "../../services/reportService";

describe("reportService", () => {
  test("should fetch all reports", async () => {
    const reports = await reportService.getReports();

    expect(Array.isArray(reports)).toBe(true);
    expect(reports.length).toBeGreaterThan(0);
  });

  test("should export CSV successfully", async () => {
    const result = await reportService.exportCSV();

    expect(result.success).toBe(true);
    expect(result.message).toBe(
      "CSV exported successfully"
    );
  });

  test("should export Excel successfully", async () => {
    const result = await reportService.exportExcel();

    expect(result.success).toBe(true);
    expect(result.message).toBe(
      "Excel exported successfully"
    );
  });

  test("should save report", async () => {
    const report = {
      id: 100,
      title: "Monthly Procurement Report",
      type: "Procurement",
      generatedBy: "Admin",
    };

    const savedReport =
      await reportService.saveReport(report);

    expect(savedReport).toEqual(report);
  });
});