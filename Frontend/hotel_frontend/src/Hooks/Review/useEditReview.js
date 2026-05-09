import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReview } from "../../Api/API/Review/Reviews.api";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../Store/authStore";
import { useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useEditReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (data) => {
      if (!user?.userId) throw new Error("User not logged in");
      if (!roomId) throw new Error("Room ID missing");

      return editReview({
        reviewId: data?.reviewId,

        rating: data?.rating,
        comment: data?.comment,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", roomId],
      });
      notifications.show({
        title: "Review Edited",
        message: "Thanks for your feedback ",
        color: "green",
      });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Failed to edit review";

      notifications.show({
        title: "Error",
        message,
        color: "red",
      });
    },
  });
};

export default useEditReview;
