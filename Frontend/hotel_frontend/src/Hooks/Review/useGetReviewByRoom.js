import { useQuery } from "@tanstack/react-query";
import { getReviewsByRoom } from "../../Api/API/Review/Review.api";

const useGetReviewByRoom = (roomId) => {
  return useQuery({
    queryKey: ["reviews", roomId],
    queryFn: () => getReviewsByRoom(roomId),
  });
};

export default useGetReviewByRoom;
