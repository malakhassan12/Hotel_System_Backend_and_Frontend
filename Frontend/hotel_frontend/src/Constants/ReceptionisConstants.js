const ReceptionistNavLinks = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "",
    icon: "IconDashboard",
    end: true,
  },
  {
    id: "bookingRequests",
    label: "Booking Requests",
    path: "booking-requests",
    icon: "IconCalendarCheck",
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: "IconHotelService",
    children: [
      {
        id: "browseRooms",
        label: "Browse Rooms",
        path: "rooms",
      },
      {
        id: "roomManagement",
        label: "Room Management",
        path: "room-management",
      },
    ],
  },
  {
    id: "check",
    label: "Check Management",
    path: "check-management",
    icon: "IconDoorEnter",
  },
  // {
  //   id: "checkOut",
  //   label: "Check-Out",
  //   path: "check-out-management",
  //   icon: "IconDoorExit",
  // },
  {
    id: "notification",
    label: "Notifications",
    path: "notifications",
    icon: "IconBell",
  },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   path: "settings",
  //   icon: "IconSettings",
  // },
  
  
];

export { ReceptionistNavLinks };
