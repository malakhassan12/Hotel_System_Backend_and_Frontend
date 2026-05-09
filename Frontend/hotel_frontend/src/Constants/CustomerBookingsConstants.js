export const bookingTabs = [
  { key: "all", label: "All Bookings" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "checked-in", label: "Checked-In" },
];

export const mockMyBookings = [
  {
    id: "B001",
    customer: "Ahmed Mohamed",
    room: "Deluxe Suite",
    checkIn: "2026-04-10",
    checkOut: "2026-04-15",
    guests: 2,
    total: "$1,250",
    payment: "paid",
    status: "confirmed",
  },
  {
    id: "B004",
    customer: "Sara Hassan",
    room: "Standard Room",
    checkIn: "2026-04-06",
    checkOut: "2026-04-09",
    guests: 2,
    total: "$450",
    payment: "pending",
    status: "pending",
  },
  {
    id: "B008",
    customer: "John Doe",
    room: "Executive Suite",
    checkIn: "2026-03-20",
    checkOut: "2026-03-25",
    guests: 3,
    total: "$2,100",
    payment: "paid",
    status: "confirmed",
  },
];