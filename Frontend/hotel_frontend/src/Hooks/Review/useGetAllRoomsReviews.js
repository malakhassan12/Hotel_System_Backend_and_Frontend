import { useQuery } from "@tanstack/react-query";
import { getAllRoomsReviews } from "../../Api/API/Review/Review.api";

const useGetAllRoomsReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllRoomsReviews(),
  });
};



export default useGetAllRoomsReviews;