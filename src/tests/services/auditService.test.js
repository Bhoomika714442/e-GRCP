import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import auditService from "../../services/auditService";
import auditData from "../../mocks/auditData.json";

describe("auditService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const resolvePromise = async (promise) => {
    vi.runAllTimers();
    return await promise;
  };

  it("should return all audits", async () => {
    const result = await resolvePromise(auditService.getAudits());

    expect(result).toEqual(auditData.audits);
    expect(result).toHaveLength(auditData.audits.length);
  });

  it("should return audit by id", async () => {
    const audit = auditData.audits[0];

    const result = await resolvePromise(
      auditService.getAuditById(audit.id)
    );

    expect(result).toEqual(audit);
  });

  it("should throw error for invalid audit id", async () => {
    const promise = auditService.getAuditById(999);

    vi.runAllTimers();

    await expect(promise).rejects.toThrow(
      "Audit record not found"
    );
  });

  it("should return completed audit history", async () => {
    const result = await resolvePromise(
      auditService.getAuditHistory()
    );

    expect(result.every((item) => item.status === "Completed")).toBe(true);
  });

  it("should return audit reports", async () => {
    const result = await resolvePromise(
      auditService.getAuditReports()
    );

    expect(result).toHaveLength(auditData.audits.length);

    expect(result[0]).toEqual({
      id: auditData.audits[0].id,
      auditName: auditData.audits[0].auditName,
      reportDate: auditData.audits[0].reportDate,
      auditor: auditData.audits[0].auditor,
      findings: auditData.audits[0].findings,
      status: auditData.audits[0].status,
    });
  });

  it("should return flattened user activities", async () => {
    const result = await resolvePromise(
      auditService.getUserActivities()
    );

    const totalActivities = auditData.audits.reduce(
      (count, audit) => count + audit.activities.length,
      0
    );

    expect(result).toHaveLength(totalActivities);

    if (result.length > 0) {
      expect(result[0]).toHaveProperty("auditId");
      expect(result[0]).toHaveProperty("auditName");
      expect(result[0]).toHaveProperty("activity");
      expect(result[0]).toHaveProperty("auditor");
      expect(result[0]).toHaveProperty("auditDate");
    }
  });

  it("should return flattened system logs", async () => {
    const result = await resolvePromise(
      auditService.getSystemLogs()
    );

    const totalLogs = auditData.audits.reduce(
      (count, audit) => count + audit.logs.length,
      0
    );

    expect(result).toHaveLength(totalLogs);

    if (result.length > 0) {
      expect(result[0]).toHaveProperty("auditId");
      expect(result[0]).toHaveProperty("auditName");
      expect(result[0]).toHaveProperty("log");
      expect(result[0]).toHaveProperty("auditDate");
    }
  });
});