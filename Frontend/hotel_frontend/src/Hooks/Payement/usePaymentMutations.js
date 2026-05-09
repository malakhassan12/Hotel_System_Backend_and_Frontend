import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../Store/authStore";
import { createPayment, makeConfirm ,  } from "../../Api/API/Payment/Payment.api";
import { notifications } from "@mantine/notifications";
import useNotificationMutations from "../Notification/useNotificationMutations";

const usePaymentMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { sendNotiMutation } = useNotificationMutations();

  const createPaymentMutation = useMutation({
    mutationFn: createPayment,

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.userId]);
      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "Maked Payment successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Maked Payment successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Maked Payment  ",
        color: "red",
      });
    },
  });

  const makeConfirmMutation = useMutation({
    mutationFn: makeConfirm,

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", user?.userId]);
      const noti = {
        userId: user?.userId,
        email: user?.email,
        message: "Maked Confirmed Payment successfully !!!!",
      };
      sendNotiMutation.mutate(noti);
      notifications.show({
        title: "Success",
        message: "Maked Confirmed Payment successfully ✅",
        color: "green",
      });
    },

    onError: (err) => {
      notifications.show({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Maked Payment  ",
        color: "red",
      });
    },
  });

  // const confirmStripeMutation = useMutation({
  //   mutationFn: stripeConfirm,

  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["notifications", user?.userId]);
  //     const noti = {
  //       userId: user?.userId,
  //       email: user?.email,
  //       message: "Maked Confirmed Payment successfully !!!!",
  //     };
  //     sendNotiMutation.mutate(noti);
  //     notifications.show({
  //       title: "Success",
  //       message: "Maked Confirmed Payment successfully ✅",
  //       color: "green",
  //     });
  //   },

  //   onError: (err) => {
  //     notifications.show({
  //       title: "Error",
  //       message:
  //         err?.response?.data?.message ||
  //         err?.message ||
  //         "Failed to Maked Payment  ",
  //       color: "red",
  //     });
  //   },
  // });



  return {
    createPaymentMutation,
    makeConfirmMutation,
    // confirmStripeMutation
  };
};

export default usePaymentMutations;
