import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptBooking,
  checkIn,
  checkOut,
  rejectBooking,
} from "../../Api/API/Booking/Booking.api";
import useAuthStore from "../../Store/authStore";
import { notifications } from "@mantine/notifications";
import useNotificationMutations from "../Notification/useNotificationMutations";

const useBookingMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { sendNotiMutation } = useNotificationMutations();

  // const updateBookingCache = (updatedBooking) => {
  //   queryClient.setQueryData(["bookings", user?.userId], (oldData = []) =>
  //     oldData.map((booking) =>
  //       booking.id === updatedBooking.id
  //         ? { ...booking, ...updatedBooking }
  //         : booking,
  //     ),
  //   );

  //   queryClient.setQueryData(
  //     ["pending-bookings", user?.userId],
  //     (oldData = []) =>
  //       oldData.filter((booking) => booking.id !== updatedBooking.id),
  //   );

  //   queryClient.setQueryData(
  //     ["confirmed-bookings", user?.userId],
  //     (oldData = []) =>
  //       oldData.filter((booking) => booking.id !== updatedBooking.id),
  //   );
  //   queryClient.setQueryData(
  //     ["revenue-bookings", user?.userId],
  //     (oldData = []) =>
  //       oldData.filter((booking) => booking.id !== updatedBooking.id),
  //   );
  // };

  const acceptBookingMutation = useMutation({
    mutationFn: acceptBooking,

    onSuccess: () => {
      queryClient.invalidateQueries(["bookings", user?.userId]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You are accept Booking successfully !!!!",
      };
      sendNotiMutation.mutate(noti);

      notifications.show({
        title: "Success",
        message: "Booking accepted successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to accept booking",
        color: "red",
      });
    },
  });

  const rejectBookingMutation = useMutation({
    mutationFn: rejectBooking,

    onSuccess: () => {
      queryClient.invalidateQueries(["bookings", user?.userId]);
      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You are reject Booking successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Booking rejected successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to reject booking",
        color: "red",
      });
    },
  });

  const checkInBookingMutation = useMutation({
    mutationFn: checkIn,

    onSuccess: () => {
      queryClient.invalidateQueries(["bookings", user?.userId]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You are Check-in Booking successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Check in Make successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Make Check in ",
        color: "red",
      });
    },
  });

  const checkOutBookingMutation = useMutation({
    mutationFn: checkOut,

    onSuccess: () => {
      // updateBookingCache(updatedBooking);
      queryClient.invalidateQueries(["bookings", user?.userId]);

      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "You are Check-out Booking successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Check out Make successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Make Check out ",
        color: "red",
      });
    },
  });

  return {
    acceptBookingMutation,
    rejectBookingMutation,
    checkInBookingMutation,
    checkOutBookingMutation,
  };
};

export default useBookingMutations;
