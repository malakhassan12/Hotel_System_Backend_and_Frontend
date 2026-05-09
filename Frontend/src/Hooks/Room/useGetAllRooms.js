import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "../../Api/API/Room/Room.api";

const useGetAllRooms = ({ page = 0, size = 10 } = {}) => {
  return useQuery({
    queryKey: ["rooms", page, size],
    queryFn: () => getAllRooms({ page, size }),
  });
};

export default useGetAllRooms;
