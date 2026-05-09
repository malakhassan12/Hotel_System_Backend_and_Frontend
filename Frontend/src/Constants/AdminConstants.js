const AdminNavLinks = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "",
    icon: "IconDashboard",
    end: true,
  },
  {
    id: "manage users",
    label: "Manage Users",
    path: "manage-users",
    icon: "IconUsers",
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
        path: "rooms/manage-rooms",
      },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    path: "reviews",
    icon: "IconStars",
  },
  // {
  //   id: "system-logs",
  //   label: "System Logs",
  //   path: "system-logs",
  //   icon: "IconLogs",
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
export { AdminNavLinks };
