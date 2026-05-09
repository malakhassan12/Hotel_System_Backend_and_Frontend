import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const notificationClient = axios.create({
  baseURL: API_URL + "/notifications",
  headers: {
    "Content-Type": "application/json",
  },
});

notificationClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

notificationClient.interceptors.response.use(
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


export default notificationClient;
