import { useState } from "react";
import { notifications } from "@mantine/notifications";
import authClient from "../Api/Client/Auth/Auth.client";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const registerUser = async (values) => {
    setLoading(true);
    setServerError("");
    console.log(values ,"From use ")

    try {
      const res = await authClient.post("/register", values);
      const data = res.data;

      // 2. Handle Success
      notifications.show({
        title: "Account Created",
        message: `Welcome ${values.username}!`,
        color: "green",
      });


      return { success: true, data };

    } catch (err) {
      // 3. Handle Errors (Validation, Email taken, etc.)
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setServerError(errorMsg);
      
      notifications.show({
        title: "Registration Failed",
        message: errorMsg,
        color: "red",
      });

      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, serverError, setServerError };
};