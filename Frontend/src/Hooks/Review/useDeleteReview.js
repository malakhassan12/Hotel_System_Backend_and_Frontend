import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteReview } from "../../Api/API/Review/Reviews.api";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../Store/authStore";
import { useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (reviewId) => {
      if (!user?.userId) throw new Error("User not logged in");
      if (!roomId) throw new Error("Room ID missing");

      return deleteReview(reviewId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", roomId],
      });
      notifications.show({
        title: "Review Deleted",
        message: "Thanks for your feedback ",
        color: "green",
      });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Failed to deleted review";

      notifications.show({
        title: "Error",
        message,
        color: "red",
      });
    },
  });
};

export default useDeleteReview;
