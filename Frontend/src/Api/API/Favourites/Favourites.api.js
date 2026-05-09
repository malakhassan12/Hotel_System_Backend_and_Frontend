import favouritesClient from "../../Client/Favourites/Favourites.client";

const getAllFavourites = async (userId) => {
  const res = await favouritesClient.get(`/${userId}`);

  return res?.data;
};

const addToFavourites = async (data) => {
  const res = await favouritesClient.post(`/add`, data);

  return res?.data;
};

const deleteItemFromFavourites = async (wishlistId) => {
  const res = await favouritesClient.delete(`/remove/${wishlistId}`);

  return res?.data;
};

const clearFavourites = async (userId) => {
  const res = await favouritesClient.delete(`/clear/${userId}`);

  return res?.data;
};

const inWishlistForUser = async ({userId, roomId}) => {
  console.log(userId, roomId)
  const res = await favouritesClient.get(`/InWishlistForUser`, {
    params: {
      userId: userId,
      roomId: roomId,
    },
  });

  return res?.data;
};

export {
  getAllFavourites,
  deleteItemFromFavourites,
  clearFavourites,
  addToFavourites,
  inWishlistForUser,
};
