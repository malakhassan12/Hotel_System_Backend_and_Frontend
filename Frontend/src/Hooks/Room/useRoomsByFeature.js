import { useQuery } from "@tanstack/react-query";
import { getRoomsByFeature } from "../../Api/API/Room/Rooms.api";
import { QUERY_KEYS } from "../../constants/queryKeys";

const useRoomsByFeature = (feature) => {
  return useQuery({
    queryKey: QUERY_KEYS.ROOMS_BY_FEATURE(feature),

    queryFn: () => getRoomsByFeature(feature),

  });
};

export default useRoomsByFeature;