import { useQuery } from "@tanstack/react-query";
import { getPendingEmployees } from "../../Api/API/Auth/Auth.api";

const useGetPendingEmployees = () => {
  return useQuery({
    queryKey: ["pending-employees"],
    queryFn: () => getPendingEmployees(),
  });
};

export default useGetPendingEmployees;
