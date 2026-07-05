import approvalsData from "../mocks/approvals.json";

let approvals = [...approvalsData.approvals];

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const approvalService = {
  getAllApprovals: async () => {
    await delay(500);
    return [...approvals];
  },

  approve: async (id) => {
    await delay(500);

    approvals = approvals.map((item) =>
      item.id === id ? { ...item, status: "Approved" } : item
    );

    return [...approvals];
  },

  reject: async (id) => {
    await delay(500);

    approvals = approvals.map((item) =>
      item.id === id ? { ...item, status: "Rejected" } : item
    );

    return [...approvals];
  },

  sendBack: async (id) => {
    await delay(500);

    approvals = approvals.map((item) =>
      item.id === id ? { ...item, status: "Pending" } : item
    );

    return [...approvals];
  },

  delegate: async (id) => {
    await delay(500);

    approvals = approvals.map((item) =>
      item.id === id ? { ...item, status: "Escalated" } : item
    );

    return [...approvals];
  }
};

export default approvalService;