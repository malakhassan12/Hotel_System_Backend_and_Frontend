import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCountMantenanceRoom } from "../../Api/API/Room/Room.api";

const useGetMantenanceRooms = () => {
  return useQuery({
    queryKey: ["mantenance-rooms"],
    queryFn: () => getCountMantenanceRoom(),
  });
};

export default useGetMantenanceRooms;
