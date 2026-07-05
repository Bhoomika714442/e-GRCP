import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import riskService from "../../services/riskService";

vi.mock("axios");

describe("riskService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns risks", async () => {
      const risks = [{ id: 1, title: "Risk 1" }];

      axios.get.mockResolvedValue({
        data: risks,
      });

      const result = await riskService.getAll();

      expect(axios.get).toHaveBeenCalledWith("/api/risks");
      expect(result).toEqual(risks);
    });

    it("throws api error", async () => {
      axios.get.mockRejectedValue({
        response: {
          data: {
            message: "Server Error",
          },
        },
      });

      await expect(
        riskService.getAll()
      ).rejects.toThrow("Server Error");
    });

    it("throws default error", async () => {
      axios.get.mockRejectedValue(new Error());

      await expect(
        riskService.getAll()
      ).rejects.toThrow("Failed to load risks.");
    });
  });

  describe("getById", () => {
    it("returns one risk", async () => {
      axios.get.mockResolvedValue({
        data: { id: 10 },
      });

      const result =
        await riskService.getById(10);

      expect(axios.get).toHaveBeenCalledWith(
        "/api/risks/10"
      );

      expect(result.id).toBe(10);
    });

    it("throws api message", async () => {
      axios.get.mockRejectedValue({
        response: {
          data: {
            message: "Risk Missing",
          },
        },
      });

      await expect(
        riskService.getById(99)
      ).rejects.toThrow("Risk Missing");
    });

    it("throws default message", async () => {
      axios.get.mockRejectedValue({});

      await expect(
        riskService.getById(99)
      ).rejects.toThrow(
        "Failed to load risk."
      );
    });
  });

  describe("create", () => {
    it("creates risk", async () => {
      const payload = {
        title: "Risk",
      };

      axios.post.mockResolvedValue({
        data: payload,
      });

      const result =
        await riskService.create(payload);

      expect(axios.post).toHaveBeenCalledWith(
        "/api/risks",
        payload
      );

      expect(result).toEqual(payload);
    });

    it("throws api message", async () => {
      axios.post.mockRejectedValue({
        response: {
          data: {
            message: "Cannot Create",
          },
        },
      });

      await expect(
        riskService.create({})
      ).rejects.toThrow("Cannot Create");
    });

    it("throws default message", async () => {
      axios.post.mockRejectedValue({});

      await expect(
        riskService.create({})
      ).rejects.toThrow(
        "Failed to create risk."
      );
    });
  });

  describe("update", () => {
    it("updates risk", async () => {
      axios.put.mockResolvedValue({
        data: {
          id: 1,
          status: "Open",
        },
      });

      const result =
        await riskService.update(1, {
          status: "Open",
        });

      expect(axios.put).toHaveBeenCalledWith(
        "/api/risks/1",
        {
          status: "Open",
        }
      );

      expect(result.status).toBe("Open");
    });

    it("throws api message", async () => {
      axios.put.mockRejectedValue({
        response: {
          data: {
            message: "Update Failed",
          },
        },
      });

      await expect(
        riskService.update(1, {})
      ).rejects.toThrow("Update Failed");
    });

    it("throws default message", async () => {
      axios.put.mockRejectedValue({});

      await expect(
        riskService.update(1, {})
      ).rejects.toThrow(
        "Failed to update risk."
      );
    });
  });

  describe("remove", () => {
    it("deletes risk", async () => {
      axios.delete.mockResolvedValue({});

      await expect(
        riskService.remove(5)
      ).resolves.toBeUndefined();

      expect(axios.delete).toHaveBeenCalledWith(
        "/api/risks/5"
      );
    });

    it("throws api message", async () => {
      axios.delete.mockRejectedValue({
        response: {
          data: {
            message: "Delete Failed",
          },
        },
      });

      await expect(
        riskService.remove(5)
      ).rejects.toThrow("Delete Failed");
    });

    it("throws default message", async () => {
      axios.delete.mockRejectedValue({});

      await expect(
        riskService.remove(5)
      ).rejects.toThrow(
        "Failed to delete risk."
      );
    });
  });

  describe("updateStatus", () => {
    it("updates status", async () => {
      axios.patch.mockResolvedValue({
        data: {
          id: 2,
          status: "Closed",
        },
      });

      const result =
        await riskService.updateStatus(
          2,
          "Closed"
        );

      expect(axios.patch).toHaveBeenCalledWith(
        "/api/risks/2",
        {
          status: "Closed",
        }
      );

      expect(result.status).toBe("Closed");
    });

    it("throws api message", async () => {
      axios.patch.mockRejectedValue({
        response: {
          data: {
            message:
              "Status Update Failed",
          },
        },
      });

      await expect(
        riskService.updateStatus(
          2,
          "Closed"
        )
      ).rejects.toThrow(
        "Status Update Failed"
      );
    });

    it("throws default message", async () => {
      axios.patch.mockRejectedValue({});

      await expect(
        riskService.updateStatus(
          2,
          "Closed"
        )
      ).rejects.toThrow(
        "Failed to update status."
      );
    });
  });
});