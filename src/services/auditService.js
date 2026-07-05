import auditData from "../mocks/auditData.json";

const audits = auditData.audits || [];

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const auditService = {
  getAudits: async () => {
    await delay(500);

    return [...audits];
  },

  getAuditById: async (id) => {
    await delay(300);

    const audit = audits.find(
      (item) => item.id === Number(id)
    );

    if (!audit) {
      throw new Error("Audit record not found");
    }

    return audit;
  },

  getAuditHistory: async () => {
    await delay(400);

    return audits.filter(
      (item) => item.status === "Completed"
    );
  },

  getAuditReports: async () => {
    await delay(400);

    return audits.map((item) => ({
      id: item.id,
      auditName: item.auditName,
      reportDate: item.reportDate,
      auditor: item.auditor,
      findings: item.findings,
      status: item.status,
    }));
  },

  getUserActivities: async () => {
    await delay(400);

    return audits.flatMap((item) =>
      item.activities.map((activity) => ({
        auditId: item.id,
        auditName: item.auditName,
        activity,
        auditor: item.auditor,
        auditDate: item.auditDate,
      }))
    );
  },

  getSystemLogs: async () => {
    await delay(400);

    return audits.flatMap((item) =>
      item.logs.map((log) => ({
        auditId: item.id,
        auditName: item.auditName,
        log,
        auditDate: item.auditDate,
      }))
    );
  },
};

export default auditService;