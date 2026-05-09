import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../../Api/API/Review/Reviews.api";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../Store/authStore";
import { useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useAddReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (data) => {
      if (!user?.userId) throw new Error("User not logged in");
      if (!roomId) throw new Error("Room ID missing");

      return addReview({
        ...data,
        user_id: user?.userId,
        room_id: Number(roomId),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", roomId],
      });
      notifications.show({
        title: "Review Added",
        message: "Thanks for your feedback ",
        color: "green",
      });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Failed to add review";

      notifications.show({
        title: "Error",
        message,
        color: "red",
      });
    },
  });
};

export default useAddReview;
