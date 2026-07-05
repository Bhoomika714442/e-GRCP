import reportsData from "../mocks/reports.json";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const reportService = {
  async getReports() {
    await delay(500);
    return reportsData.reports;
  },

  async exportCSV() {
    await delay(300);

    return {
      success: true,
      message: "CSV exported successfully",
    };
  },

  async exportExcel() {
    await delay(300);

    return {
      success: true,
      message: "Excel exported successfully",
    };
  },

  async saveReport(report) {
    await delay(300);

    return report;
  },
};

export default reportService;