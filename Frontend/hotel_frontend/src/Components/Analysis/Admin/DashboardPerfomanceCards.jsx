import React from "react";
import { SimpleGrid } from "@mantine/core";
import {
  IconCurrencyDollar,
  IconUsers,
  IconBuilding,
  IconCalendarCheck,
  IconCalendarClock,
  IconTools,
  IconUserPlus,
  IconBed,
} from "@tabler/icons-react";
import AdminDashCard from "../../Card/Admin/AdminDashCard";
import useGetAvailableRooms from "../../../Hooks/Card/useGetAvailableRooms";
import useGetConfirmedBookings from "../../../Hooks/Card/useGetConfirmedBookings";
import useGetMantenanceRooms from "../../../Hooks/Card/useGetMantenanceRooms";
import useGetPendingBookings from "../../../Hooks/Card/useGetPendingBookings";
import useGetRevenueBookings from "../../../Hooks/Card/useGetRevenueBookings";
import useGetPendingEmployees from "../../../Hooks/User/useGetPendingEmployees";
import useGetAllUser from "../../../Hooks/User/useGetAllUser";

const DashboardPerfomanceCards = () => {
  const { data: availableRooms = 0 } = useGetAvailableRooms();
  const { data: confirmedBookings = 0 } = useGetConfirmedBookings();
  const { data: maintenanceRooms = 0 } = useGetMantenanceRooms();
  const { data: pendingBookings = 0 } = useGetPendingBookings();
  const { data: revenue = 0 } = useGetRevenueBookings();
  const { data: users = [] } = useGetAllUser();
  const { data: pendingUsers = [] } = useGetPendingEmployees();

  const totalUsers = users?.length || 0;
  const totalPendingUsers = pendingUsers?.length || 0;
  const totalRooms = availableRooms + maintenanceRooms;
  const totalBookings = confirmedBookings + pendingBookings;

  const cardsData = [
    {
      title: "Total Revenue",
      value: `$${(revenue || 0).toLocaleString()}`,
      icon: IconCurrencyDollar,
      color: "green",
      trend: revenue > 0 ? "up" : "neutral",
      trendValue: revenue > 0 ? "+12.5%" : "0%",
      bgColor: "#f0fdf4",
    },
    {
      title: "Total Users",
      value: totalUsers.toString(),
      icon: IconUsers,
      color: "blue",
      trend: totalUsers > 0 ? "up" : "neutral",
      trendValue: totalUsers > 0 ? "+3 new" : "0 new",
      bgColor: "#eff6ff",
    },
    {
      title: "Pending Users",
      value: totalPendingUsers.toString(),
      icon: IconUserPlus,
      color: "yellow",
      trend: totalPendingUsers > 0 ? "up" : "neutral",
      trendValue: totalPendingUsers > 0 ? "awaiting" : "none",
      bgColor: "#fefce8",
    },
    {
      title: "Total Rooms",
      value: totalRooms.toString(),
      icon: IconBuilding,
      color: "grape",
      trend: totalRooms > 0 ? "up" : "neutral",
      trendValue: "total capacity",
      bgColor: "#f3e8ff",
    },
    {
      title: "Available Rooms",
      value: availableRooms.toString(),
      icon: IconBed,
      color: "green",
      trend: availableRooms > 0 ? "up" : "down",
      trendValue: "ready to book",
      bgColor: "#f0fdf4",
    },
    {
      title: "Maintenance Rooms",
      value: maintenanceRooms.toString(),
      icon: IconTools,
      color: "red",
      trend: maintenanceRooms > 0 ? "down" : "up",
      trendValue: "under repair",
      bgColor: "#fef2f2",
    },
    {
      title: "Total Bookings",
      value: totalBookings.toString(),
      icon: IconCalendarCheck,
      color: "indigo",
      trend: totalBookings > 0 ? "up" : "neutral",
      trendValue: "all time",
      bgColor: "#eef2ff",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings.toString(),
      icon: IconCalendarCheck,
      color: "teal",
      trend: confirmedBookings > 0 ? "up" : "neutral",
      trendValue: "active",
      bgColor: "#f0fdfa",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings.toString(),
      icon: IconCalendarClock,
      color: "orange",
      trend: pendingBookings > 0 ? "up" : "neutral",
      trendValue: "awaiting confirmation",
      bgColor: "#fff7ed",
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {cardsData.map((card, i) => (
        <div
          key={i}
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="700"
          data-aos-delay={i * 100}
        >
          <AdminDashCard card={card} />
        </div>
      ))}
    </SimpleGrid>
  );
};

export default DashboardPerfomanceCards;