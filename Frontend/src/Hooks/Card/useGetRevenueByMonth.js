import { useQuery } from "@tanstack/react-query";
import { getRevenueByMonth } from "../../Api/API/Booking/Booking.api";

const useGetRevenueByMonth = () => {
  return useQuery({
    queryKey: ["revenue-month"],
    queryFn: () => getRevenueByMonth(),
  });
};

export default useGetRevenueByMonth;
