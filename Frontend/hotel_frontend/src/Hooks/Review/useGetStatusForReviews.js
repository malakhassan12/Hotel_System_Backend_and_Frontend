import { useQuery } from "@tanstack/react-query";
import { getStatusForReviews } from "../../Api/API/Review/Review.api";

const useGetStatusForReviews = () => {
  return useQuery({
    queryKey: ["status-reviews"],
    queryFn: () => getStatusForReviews(),
  });
};

export default useGetStatusForReviews;
