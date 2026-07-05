import axios from "axios";

const API_URL = "/api/risks";

const riskService = {
  async getAll() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to load risks."
      );
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to load risk."
      );
    }
  },

  async create(risk) {
    try {
      const response = await axios.post(API_URL, risk);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to create risk."
      );
    }
  },

  async update(id, risk) {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        risk
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to update risk."
      );
    }
  },

  async remove(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to delete risk."
      );
    }
  },

  async updateStatus(id, status) {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to update status."
      );
    }
  },
};

export default riskService;