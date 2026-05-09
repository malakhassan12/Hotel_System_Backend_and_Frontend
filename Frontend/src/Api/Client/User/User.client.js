import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const userClient = axios.create({
  baseURL: API_URL + "/users",
  headers: {
    "Content-Type": "application/json",
  },
});

// userClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default userClient;
