import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifications } from "@mantine/notifications";
import { approveEmployee, rejectEmployee } from "../../Api/API/Auth/Auth.api";
import useAuthStore from "../../Store/authStore";
import useNotificationMutations from "../Notification/useNotificationMutations";

const useAuthMutations = () => {
  const queryClient = useQueryClient();

  const { user } = useAuthStore();
  const { sendNotiMutation } = useNotificationMutations();

  const approveEmployeeMutation = useMutation({
    mutationFn: approveEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries(["pending-employees"]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You are Approved successfully !!!!",
      };
      sendNotiMutation.mutate(noti);

      notifications.show({
        title: "Success",
        message: "Employee accepted successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to accept Employee",
        color: "red",
      });
    },
  });

  const rejectEmployeeMutation = useMutation({
    mutationFn: rejectEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries(["pending-employees"]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You are Rejected successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Employee rejected successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to reject Employee",
        color: "red",
      });
    },
  });

  return {
    rejectEmployeeMutation,
    approveEmployeeMutation,
  };
};

export default useAuthMutations;
