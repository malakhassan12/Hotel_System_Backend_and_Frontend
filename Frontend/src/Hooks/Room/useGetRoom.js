import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../../Api/API/Room/Room.api";

const useGetRoom = (roomId) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoom(roomId),
  });
};

export default useGetRoom;
