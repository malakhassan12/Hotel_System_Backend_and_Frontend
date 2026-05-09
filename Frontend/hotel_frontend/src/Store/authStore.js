import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  user: (() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null; 
  })(),
  isAuthenticated: localStorage.getItem("token") ? true : false,

  login: (token, role, user = {}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      token,
      role,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    set({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false,
    });
  },

  loadAuthFromStorage: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userStr = localStorage.getItem("user");

    if (token && role) {
      const user = userStr ? JSON.parse(userStr) : {};
      set({
        token,
        role,
        user,
        isAuthenticated: true,
      });
    }
  },
}));

export default useAuthStore;
