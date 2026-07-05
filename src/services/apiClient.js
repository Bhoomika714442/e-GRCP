import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const session = JSON.parse(
      localStorage.getItem("egrcp_session")
    );

    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    console.log(
      `[Request] ${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error("Network Error");
    } else {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request");
          break;

        case 401:
          console.error("Unauthorized");
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Resource Not Found");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error(error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;