import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../Api/API/User/User.api";

const useGetAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};

export default useGetAllUser;
