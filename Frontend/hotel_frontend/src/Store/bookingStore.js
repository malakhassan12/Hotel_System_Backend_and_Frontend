import { create } from "zustand";

const useBookingStore = create((set) => ({
  myBookings: JSON.parse(localStorage.getItem("myBookings") || "[]"),

  addBooking: (newBooking) =>
    set((state) => {
      const updated = [...state.myBookings, newBooking];
      localStorage.setItem("myBookings", JSON.stringify(updated));
      return { myBookings: updated };
    }),

  removeBooking: (id) =>
    set((state) => {
      const updated = state.myBookings.filter(
        (b) => String(b.id) !== String(id)
      );
      localStorage.setItem("myBookings", JSON.stringify(updated));
      return { myBookings: updated };
    }),

  updateBookingStatus: (id, status) =>
    set((state) => {
      const updated = state.myBookings.map((b) =>
        String(b.id) === String(id)
          ? { ...b, status }
          : b
      );

      localStorage.setItem("myBookings", JSON.stringify(updated));
      return { myBookings: updated };
    }),
}));

export default useBookingStore;