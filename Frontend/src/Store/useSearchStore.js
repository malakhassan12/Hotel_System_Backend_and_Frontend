import { create } from "zustand";

const useSearchStore = create((set) => ({
  statusFilter: "all",
  searchQuery: "",

  setStatusFilter: (status) => set({ statusFilter: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({ statusFilter: "all", searchQuery: "" }),
}));

export default useSearchStore;