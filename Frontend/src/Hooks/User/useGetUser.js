import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../Api/API/User/User.api";

const useGetUser = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });
};

export default useGetUser;
