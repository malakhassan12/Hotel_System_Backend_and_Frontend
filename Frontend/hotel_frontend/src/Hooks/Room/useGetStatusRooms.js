import { useQuery } from "@tanstack/react-query";
import { getStatusOfRooms } from "../../Api/API/Room/Room.api";

const useGetStatusRooms = () => {
  return useQuery({
    queryKey: ["status-rooms"],
    queryFn: () => getStatusOfRooms(),
  });
};

export default useGetStatusRooms;
