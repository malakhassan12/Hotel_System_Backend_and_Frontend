import { useQuery } from "@tanstack/react-query";
import { getAVGReviews } from "../../Api/API/Review/Review.api";

const useGetAVGReviewsByRoom = (roomId) => {
  return useQuery({
    queryKey: ["avg-reviews", roomId],
    queryFn: () => getAVGReviews(roomId),
  });
};



export default useGetAVGReviewsByRoom