import React from "react";
import useFavouritesMutations from "../../Hooks/Favourites/useFavouritesMutations";
import useAuthStore from "../../Store/authStore";
import useGetAllFavourites from "../../Hooks/Favourites/useGetAllFavourites";
import { ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import useInWishlistForUser from "../../Hooks/Favourites/useInWishlistForUser";

const WishListBtn = ({ room }) => {
  // Handel later!!!
  const { addToFavouritesMutation, deleteItemFromFavouritesMutation } =
    useFavouritesMutations(room?.id);

  const { user } = useAuthStore();

  const { data: favorite } = useGetAllFavourites(user?.userId);

  console.log(favorite);

  console.log(room);

  const { data: isliked } = useInWishlistForUser(user?.userId, room?.id);
  const liked = isliked;

  console.log(liked);
  const removeFromFavorites = (roomId) => {
    const finalFav = Array.isArray(favorite) ? favorite : [];
    console.log(roomId);
    console.log(finalFav)

    const wish = finalFav.find((item) => item.roomId === roomId);

    console.log(wish);

    if (wish) {
      deleteItemFromFavouritesMutation.mutate(wish.id);
    }
  };
  const addToFavorites = (room) => {
    const data = {
      userId: user?.userId,
      roomId: room?.id,
    };

    addToFavouritesMutation.mutate(data);
  };
  return (
    <>
      <ActionIcon
        variant="light"
        color="red"
        size="md"
        radius="xl"
        onClick={() => {
          if (liked) {
            removeFromFavorites(room.id);
          } else {
            addToFavorites(room);
          }
        }}
      >
        {liked ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
      </ActionIcon>
    </>
  );
};

export default WishListBtn;
