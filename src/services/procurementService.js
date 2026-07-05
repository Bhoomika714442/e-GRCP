import requestsData from "../mocks/requests.json";

const REQUESTS_KEY = "egrcp_requests";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const initializeRequests = () => {
  const requests = localStorage.getItem(REQUESTS_KEY);

  if (!requests) {
    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requestsData.requests)
    );
  }
};

initializeRequests();

const procurementService = {
  async getAll() {
    await delay(500);

    return JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );
  },

  async getById(id) {
    await delay(300);

    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );

    const request = requests.find(
      (r) => Number(r.id) === Number(id)
    );

    if (!request) {
      throw new Error("Procurement request not found.");
    }

    return request;
  },

  async create(data) {
    await delay(500);

    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );

    const newRequest = {
      id: Date.now(),
      requestNumber: `PR-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
      ...data,
    };

    requests.unshift(newRequest);

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requests)
    );

    return newRequest;
  },

  async update(id, updatedData) {
    await delay(500);

    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );

    const index = requests.findIndex(
      (r) => Number(r.id) === Number(id)
    );

    if (index === -1) {
      throw new Error("Procurement request not found.");
    }

    requests[index] = {
      ...requests[index],
      ...updatedData,
    };

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requests)
    );

    return requests[index];
  },

  async approve(id, approver) {
    await delay(400);

    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );

    const index = requests.findIndex(
      (r) => Number(r.id) === Number(id)
    );

    if (index === -1) {
      throw new Error("Procurement request not found.");
    }

    requests[index].status = "Approved";
    requests[index].approvedBy = approver;
    requests[index].approvedDate =
      new Date().toISOString();

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requests)
    );

    return requests[index];
  },

  async reject(id, remarks) {
    await delay(400);

    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );

    const index = requests.findIndex(
      (r) => Number(r.id) === Number(id)
    );

    if (index === -1) {
      throw new Error("Procurement request not found.");
    }

    requests[index].status = "Rejected";
    requests[index].remarks = remarks;

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requests)
    );

    return requests[index];
  },

  async remove(id) {
    await delay(400);

    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );

    const filtered = requests.filter(
      (r) => Number(r.id) !== Number(id)
    );

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(filtered)
    );

    return true;
  },
};

export default procurementService;