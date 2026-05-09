import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../Store/authStore";
import authClient from "../Api/Client/Auth/Auth.client";
import { jwtDecode } from "jwt-decode";
import { roles } from "../Constants/ConstantsFromBack";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const loginUser = async (values) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await authClient.post("/login", values);
      const { token } = res.data;

      console.log(res);

      const decoded = jwtDecode(token);

      const role = decoded.role;
      const userEmail = decoded.sub;

      const userId = decoded.userId;

      console.log(role, userEmail, userId);

      login(token, role, { email: userEmail, userId: userId });

      notifications.show({
        title: "Login Successful",
        message: "Welcome back!",
        color: "green",
      });

      // // 4. التوجيه حسب الصلاحية
      if (role === roles[0]) navigate("/admin");
      if (role === roles[2]) navigate("/receptionist");
      if (role === roles[1]) navigate("/customer");

      // console.log(localStorage.getItem("token"));
      // console.log(localStorage.getItem("role"));
      // console.log(localStorage.getItem("user"));

      return { success: true };
    } catch (err) {
      console.log(err?.response);
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Login  ",
        color: "red",
      });
      const errorMsg =
        err?.response?.data?.error ||
        err.response?.data?.message ||
        "Invalid email or password";

      if (errorMsg === "Employee account is pending approval") {
        navigate("/waiting-approval", { state: { status: "pending" } });
      } else if (errorMsg === "Employee account is rejected approval") {
        navigate("/waiting-approval", { state: { status: "rejected" } });
      }
      setServerError(errorMsg);

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, serverError, setServerError };
};
