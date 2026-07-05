import complianceData from "../mocks/complianceData.json";

const compliance = complianceData.compliance || [];

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const complianceService = {
  getAllCompliance: async () => {
    await delay(800);

    return [...compliance];
  },

  getComplianceById: async (id) => {
    await delay(800);

    const record = compliance.find(
      (item) => item.id === id
    );

    if (!record) {
      throw new Error("Compliance record not found.");
    }

    return record;
  },

  createCompliance: async (record) => {
    await delay(800);

    return {
      ...record,
      id: `CMP${Date.now()}`,
    };
  },

  updateCompliance: async (id, updatedRecord) => {
    await delay(800);

    return {
      id,
      ...updatedRecord,
    };
  },

  deleteCompliance: async (id) => {
    await delay(800);

    return id;
  },
};

export default complianceService;