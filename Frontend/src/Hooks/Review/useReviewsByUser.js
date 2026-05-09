import { useQuery } from "@tanstack/react-query";
import { getReviewsByUserId } from "../../Api/API/Review/Reviews.api";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useReviewsByUser = (userId) => {
  return useQuery({
    queryKey: QUERY_KEYS.REVIEWS_BY_USER(userId),
    queryFn: () => getReviewsByUserId(userId),
  });
};

export default useReviewsByUser;