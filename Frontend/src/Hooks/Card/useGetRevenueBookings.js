import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../Store/authStore";
import { getRevenueBookings } from "../../Api/API/Booking/Booking.api";
const useGetRevenueBookings = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["revenue-bookings", user?.userId],
    queryFn: () => getRevenueBookings(),
  });
};

export default useGetRevenueBookings;
