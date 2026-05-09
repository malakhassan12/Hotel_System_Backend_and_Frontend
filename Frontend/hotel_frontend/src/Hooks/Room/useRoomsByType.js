import { useQuery } from "@tanstack/react-query";
import { getRoomsByType } from "../../Api/API/Room/Rooms.api";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useRoomsByType = (type) => {
  return useQuery({
    queryKey: QUERY_KEYS.ROOMS_BY_TYPE(type),
    queryFn: () => getRoomsByType(type),
  });
};

export default useRoomsByType;