import { useQuery } from "@tanstack/react-query";
import { inWishlistForUser } from "../../Api/API/Favourites/Favourites.api";

const useInWishlistForUser = (userId, roomId) => {
  return useQuery({
    queryKey: ["in-wishlist", userId , roomId],
    queryFn: () => inWishlistForUser({ userId, roomId }),
  });
};

export default useInWishlistForUser;
