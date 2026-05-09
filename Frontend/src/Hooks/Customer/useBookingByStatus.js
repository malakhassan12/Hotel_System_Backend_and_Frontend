import { useQuery } from "@tanstack/react-query";
import { getBookingsByStatus } from "../../Api/API/Booking/Bookings.api";
import useAuthStore from "../../Store/authStore";

const useBookingsByStatus = (status) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["bookings", status, user?.userId],
    queryFn: () => getBookingsByStatus(user?.userId, status),
    enabled: !!user?.id && !!status,
  });
};

export default useBookingsByStatus;