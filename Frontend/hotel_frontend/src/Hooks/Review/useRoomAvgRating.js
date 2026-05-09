import { useQuery } from "@tanstack/react-query";
import { getAvgRatingForRoom } from "../../Api/API/Review/Reviews.api";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useRoomAvgRating = (roomId) => {
  return useQuery({
    queryKey: QUERY_KEYS.ROOM_AVG_RATING(roomId),
    queryFn: () => getAvgRatingForRoom(roomId),
  });
};

export default useRoomAvgRating;