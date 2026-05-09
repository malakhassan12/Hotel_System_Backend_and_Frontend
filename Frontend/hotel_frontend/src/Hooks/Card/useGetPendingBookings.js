import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../Store/authStore";
import { getPendingBookings } from "../../Api/API/Booking/Booking.api";
const useGetPendingBookings = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["pending-bookings", user?.userId],
    queryFn: () => getPendingBookings(),
  });
};

export default useGetPendingBookings;
