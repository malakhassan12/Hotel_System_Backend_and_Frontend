import { create } from "zustand";

const useSearchRoomStore = create((set) => ({
  searchQuery: "",
  availability: "all",
  
  // Actions
  setSearchQuery: (val) => set({ searchQuery: val }),
  setAvailability: (val) => set({ availability: val }),
  clearFilters: () => set({ searchQuery: "", priceRange: "all", availability: "all" }),
}));

export default useSearchRoomStore;