import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const roomClient = axios.create({
  baseURL: API_URL + "/rooms",
  headers: {
    "Content-Type": "application/json",
  },
});

roomClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

roomClient.interceptors.response.use(
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
export default roomClient;
