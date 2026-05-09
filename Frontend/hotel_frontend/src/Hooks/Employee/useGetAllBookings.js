import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../Api/API/Booking/Booking.api";
import useAuthStore from "../../Store/authStore";
const useGetAllBookings = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["bookings", user?.userId],
    queryFn: getAllBookings,
  });
};

export default useGetAllBookings;
