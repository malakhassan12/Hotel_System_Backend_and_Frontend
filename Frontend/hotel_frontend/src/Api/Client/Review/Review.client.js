import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const reviewClient = axios.create({
  baseURL: API_URL + "/reviews",
  headers: {
    "Content-Type": "application/json",
  },
});

reviewClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

reviewClient.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      console.log("Access Forbidden or Unauthorized! Redirecting to login...");

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default reviewClient;
