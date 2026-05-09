import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addToFavourites,
  clearFavourites,
  deleteItemFromFavourites,
} from "../../Api/API/Favourites/Favourites.api";
import useAuthStore from "../../Store/authStore";
import { notifications } from "@mantine/notifications";
import useNotificationMutations from "../Notification/useNotificationMutations";

const useFavouritesMutations = (roomId) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { sendNotiMutation } = useNotificationMutations();

  const addToFavouritesMutation = useMutation({
    mutationFn: addToFavourites,
    onSuccess: () => {
      queryClient.invalidateQueries(["in-wishlist", user?.userId, roomId]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You added room Favourites successfully!! ",
      };
      sendNotiMutation.mutate(noti);

      notifications.show({
        title: "Success",
        message: "You added room Favourites successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to added room Favourites successfully",
        color: "red",
      });
    },
  });

  const deleteItemFromFavouritesMutation = useMutation({
    mutationFn: deleteItemFromFavourites,
    onSuccess: () => {
      queryClient.invalidateQueries(["in-wishlist", user?.userId, roomId]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You deleted room Favourites successfully!! ",
      };
      sendNotiMutation.mutate(noti);

      notifications.show({
        title: "Success",
        message: "You deleted room Favourites successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to deleted room Favourites successfully",
        color: "red",
      });
    },
  });

  const clearFavouritesMutation = useMutation({
    mutationFn: clearFavourites,
    onSuccess: () => {
      queryClient.invalidateQueries(["in-wishlist", user?.userId, roomId]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You clear your Favourites successfully!! ",
      };
      sendNotiMutation.mutate(noti);

      notifications.show({
        title: "Success",
        message: "You clear your Favourites successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to clear your Favourites successfully",
        color: "red",
      });
    },
  });

  return {
    addToFavouritesMutation,
    deleteItemFromFavouritesMutation,
    clearFavouritesMutation,
  };
};

export default useFavouritesMutations;
