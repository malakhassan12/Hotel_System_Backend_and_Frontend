import { useQuery } from "@tanstack/react-query";
import { canReview } from "../../Api/API/Booking/Bookings.api";
import useAuthStore from "../../Store/authStore";
import { QUERY_KEYS } from "../../Constants/queryKeys";

const useCanReview = (roomId) => {
  const { user } = useAuthStore();

  const userId = user?.userId;

  return useQuery({
    queryKey: ["can-review", user?.userId],
    queryFn: () => canReview({ userId, roomId }),
    enabled: !!user?.userId,
  });
};

export default useCanReview;
