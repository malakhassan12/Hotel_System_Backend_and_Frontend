import { useQuery } from "@tanstack/react-query";
import { getAllFavourites } from "../../Api/API/Favourites/Favourites.api";

const useGetAllFavourites = (userId) => {
  return useQuery({
    queryKey: ["favourites", userId],
    queryFn: () => getAllFavourites(userId),
  });
};

export default useGetAllFavourites;
