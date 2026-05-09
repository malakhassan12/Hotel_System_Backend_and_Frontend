import { useQuery } from "@tanstack/react-query";
import { getAllNotificationByUserId } from "../../Api/API/Notification/Notification.api";

const useGetAllNotificationByUserId = (userId) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getAllNotificationByUserId(userId),
  });
};

export default useGetAllNotificationByUserId;
