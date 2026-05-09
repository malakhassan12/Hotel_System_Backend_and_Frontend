import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOneBooking } from "../../Api/API/Booking/Bookings.api";
const useGetOneBooking = ( userId, roomId ) => {
  return useQuery({
    queryKey: ["one-booking", userId, roomId],
    queryFn: () => getOneBooking({ userId, roomId }),
    enabled: !!userId && !!roomId,
  });
};

export default useGetOneBooking;
