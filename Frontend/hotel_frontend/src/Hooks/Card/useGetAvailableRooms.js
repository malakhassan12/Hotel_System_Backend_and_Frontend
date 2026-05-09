import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCountAvailableRoom } from "../../Api/API/Room/Room.api";

const useGetAvailableRooms = () => {
  return useQuery({
    queryKey: ["available-rooms", ],
    queryFn: () => getCountAvailableRoom(),
  });
};

export default useGetAvailableRooms;
