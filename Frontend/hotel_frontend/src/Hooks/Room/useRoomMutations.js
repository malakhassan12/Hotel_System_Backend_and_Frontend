import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { notifications } from "@mantine/notifications";
import {
  addRoom,
  deleteRoom,
  editRoomStatus,
  updateRoom,
} from "../../Api/API/Room/Room.api";
import useNotificationMutations from "../Notification/useNotificationMutations";
import useAuthStore from "../../Store/authStore";

const useRoomMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { sendNotiMutation } = useNotificationMutations();

  const updateRoomStatusMutation = useMutation({
    mutationFn: editRoomStatus,

    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);

      
      notifications.show({
        title: "Success",
        message: "Room updated successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to updated room",
        color: "red",
      });
    },
  });

  const addRoomMutation = useMutation({
    mutationFn: addRoom,

    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "Created Room successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Room added successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to added room",
        color: "red",
      });
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: updateRoom,

    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "Updated Room successfully !!!!",
      };
      sendNotiMutation.mutate(noti);

      notifications.show({
        title: "Success",
        message: "Room updated successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to updated room",
        color: "red",
      });
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: deleteRoom,

    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "Deleted Room successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Room deleted successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to deleted room",
        color: "red",
      });
    },
  });

  return {
    updateRoomStatusMutation,
    addRoomMutation,
    updateRoomMutation,
    deleteRoomMutation,
  };
};

export default useRoomMutations;
