import { useQuery } from "@tanstack/react-query";
import { getAllStatusReviewsForRoom } from "../../Api/API/Review/Review.api";

const useGetAllStatusReviewsForRoom = (roomId) => {
  return useQuery({
    queryKey: ["status-reviews", roomId],
    queryFn: () => getAllStatusReviewsForRoom(roomId),
  });
};

export default useGetAllStatusReviewsForRoom;
