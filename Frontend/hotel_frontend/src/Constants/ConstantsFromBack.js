const roles = ["ADMIN", "CUSTOMER", "EMPLOYEE"];

const bookingStatus = [
  "PENDING",
  "ACCEPTED",
  "CANCELLED",
  "REJECTED",
  "CHECKED_IN",
  "COMPLETED",
  "CHECKED_OUT",
];

const roomStatus = ["AVAILABLE", "Booked", "MAINTENANCE"];

 const roomTypeMap = {
      SINGLE: "Single Room",
      DOUBLE: "Double Room",
      SUITE: "Suite",
      DELUXE: "Deluxe Room",
      FAMILY: "Family Suite",
    };

const roomTypes = [
  { value: "SINGLE", label: "Single Room" },
  { value: "DOUBLE", label: "Double Room" },
  { value: "TRIPLE", label: "Triple Room" },
  { value: "SUITE", label: "Suite" },
  { value: "DELUXE", label: "Deluxe Room" },
];

export { roles, bookingStatus, roomStatus , roomTypeMap , roomTypes };

    

