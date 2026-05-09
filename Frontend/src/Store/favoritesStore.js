import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addToFavorites: (room) => {
    const exists = get().favorites.some((item) => item.id === room.id);

    if (!exists) {
      set((state) => ({
        favorites: [...state.favorites, room],
      }));
    }
  },

  removeFromFavorites: (roomId) => {
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== roomId),
    }));
  },

  isFavorite: (roomId) => {
    return get().favorites.some((item) => item.id === roomId);
  },
}));

export default useFavoritesStore;