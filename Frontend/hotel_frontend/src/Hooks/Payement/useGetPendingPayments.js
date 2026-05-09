import { useQuery } from "@tanstack/react-query";
import { getPendingPayment } from "../../Api/API/Payment/Payment.api";

const useGetPendingPayments = () => {
  return useQuery({
    queryKey: ["pending-payment"],
    queryFn: () => getPendingPayment(),
  });
};

export default useGetPendingPayments;
