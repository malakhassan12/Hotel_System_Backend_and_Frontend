import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../Store/authStore";
import { getConfirmedBookings } from "../../Api/API/Booking/Booking.api";
const useGetConfirmedBookings = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["confirmed-bookings", user?.userId],
    queryFn: () => getConfirmedBookings(),
  });
};

export default useGetConfirmedBookings;
