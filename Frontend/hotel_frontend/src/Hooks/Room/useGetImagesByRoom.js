import { useQuery } from "@tanstack/react-query";
import { getImagesByRoom,  } from "../../Api/API/Room/Room.api";

const useGetImagesByRoom = (roomId) => {
  return useQuery({
    queryKey: ["room-images", roomId],
    queryFn: () => getImagesByRoom(roomId),
  });
};

export default useGetImagesByRoom;
