import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../Store/authStore";
import { notifications } from "@mantine/notifications";
import {
  deleteAllNotis,
  deleteNoti,
  sendNoti,
} from "../../Api/API/Notification/Notification.api";

const useNotificationMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const sendNotiMutation = useMutation({
    mutationFn: sendNoti,

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.userId]);
      notifications.show({
        title: "Success",
        message: "Sended Notification successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Send Notification ",
        color: "red",
      });
    },
  });

  const deleteNotiMutation = useMutation({
    mutationFn: deleteNoti,

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.userId]);
      notifications.show({
        title: "Success",
        message: "Delete Notification successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Delete Notification ",
        color: "red",
      });
    },
  });

  const deleteAllNotiMutation = useMutation({
    mutationFn: deleteAllNotis,

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.userId]);
      notifications.show({
        title: "Success",
        message: "Delete All Notifications successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to All Notifications ",
        color: "red",
      });
    },
  });

  return {
    deleteNotiMutation,
    sendNotiMutation,
    deleteAllNotiMutation,
  };
};

export default useNotificationMutations;
