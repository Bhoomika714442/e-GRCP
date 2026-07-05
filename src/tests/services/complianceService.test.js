import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import complianceService from "../../services/complianceService";
import complianceData from "../../mocks/complianceData.json";

describe("complianceService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const resolvePromise = async (promise) => {
    vi.runAllTimers();
    return await promise;
  };

  describe("getAllCompliance", () => {
    it("should return all compliance records", async () => {
      const result = await resolvePromise(
        complianceService.getAllCompliance()
      );

      expect(result).toEqual(complianceData.compliance);
      expect(result).toHaveLength(complianceData.compliance.length);
    });

    it("should return a copy of the array", async () => {
      const result = await resolvePromise(
        complianceService.getAllCompliance()
      );

      expect(result).not.toBe(complianceData.compliance);
    });
  });

  describe("getComplianceById", () => {
    it("should return the requested compliance record", async () => {
      const record = complianceData.compliance[0];

      const result = await resolvePromise(
        complianceService.getComplianceById(record.id)
      );

      expect(result).toEqual(record);
    });

    it("should throw an error when the record does not exist", async () => {
      const promise =
        complianceService.getComplianceById("INVALID");

      vi.runAllTimers();

      await expect(promise).rejects.toThrow(
        "Compliance record not found."
      );
    });
  });

  describe("createCompliance", () => {
    it("should create a compliance record with generated id", async () => {
      vi.spyOn(Date, "now").mockReturnValue(123456);

      const newRecord = {
        vendorName: "Test Vendor",
        regulation: "ISO 27001",
        status: "Pending",
      };

      const result = await resolvePromise(
        complianceService.createCompliance(newRecord)
      );

      expect(result).toEqual({
        id: "CMP123456",
        ...newRecord,
      });
    });
  });

  describe("updateCompliance", () => {
    it("should update and return the compliance record", async () => {
      const updatedRecord = {
        vendorName: "Updated Vendor",
        status: "Compliant",
      };

      const result = await resolvePromise(
        complianceService.updateCompliance(
          "CMP001",
          updatedRecord
        )
      );

      expect(result).toEqual({
        id: "CMP001",
        ...updatedRecord,
      });
    });
  });

  describe("deleteCompliance", () => {
    it("should return deleted compliance id", async () => {
      const result = await resolvePromise(
        complianceService.deleteCompliance("CMP001")
      );

      expect(result).toBe("CMP001");
    });
  });
});