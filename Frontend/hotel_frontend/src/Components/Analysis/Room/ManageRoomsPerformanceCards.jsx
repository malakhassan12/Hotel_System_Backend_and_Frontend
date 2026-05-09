import React, { useMemo } from "react";
import { SimpleGrid } from "@mantine/core";
import {
  IconBed,
  IconBedOff,
  IconTools,
  IconBuilding,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from "@tabler/icons-react";
import ManageRoomCard from "../../Card/Room/ManageRoomCard";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";

const ManageRoomsPerformanceCards = () => {
  const { data: rooms, isLoading } = useGetAllRooms();
  const safeRooms = Array.isArray(rooms) ? rooms : [];

  // Use useMemo to calculate stats only when rooms data changes
  const stats = useMemo(() => {
    const total = safeRooms.length;
    
    const available = safeRooms.filter(
      (room) => room.status === "AVAILABLE"
    ).length;
    
    const booked = safeRooms.filter(
      (room) => room.status === "Booked"
    ).length;
    
    const maintenance = safeRooms.filter(
      (room) => room.status === "UNAVAILABLE"
    ).length;

    // Calculate percentages
    const availablePercentage = total > 0 ? ((available / total) * 100).toFixed(1) : 0;
    const bookedPercentage = total > 0 ? ((booked / total) * 100).toFixed(1) : 0;
    const maintenancePercentage = total > 0 ? ((maintenance / total) * 100).toFixed(1) : 0;

    return {
      total,
      available,
      booked,
      maintenance,
      availablePercentage,
      bookedPercentage,
      maintenancePercentage,
    };
  }, [safeRooms]);

  // You can also add previous data comparison if you have historical data
  const previousStats = {
    total: 0, // Fetch from localStorage or API
    available: 0,
    booked: 0,
    maintenance: 0,
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return <IconTrendingUp size={16} />;
      case "down": return <IconTrendingDown size={16} />;
      default: return <IconMinus size={16} />;
    }
  };

  const cardsData = [
    {
      title: "Total Rooms",
      value: stats.total.toString(),
      subtitle: `${stats.total} Total`,
      icon: IconBuilding,
      color: "primary",
      trend: stats.total > previousStats.total ? "up" : stats.total < previousStats.total ? "down" : "neutral",
      trendValue: stats.total - previousStats.total,
      trendIcon: getTrendIcon(stats.total > previousStats.total ? "up" : stats.total < previousStats.total ? "down" : "neutral"),
    },
    {
      title: "Available",
      value: stats.available.toString(),
      subtitle: `${stats.availablePercentage}% of total`,
      icon: IconBed,
      color: "green",
      trend: stats.available > previousStats.available ? "up" : stats.available < previousStats.available ? "down" : "neutral",
      trendValue: stats.available - previousStats.available,
      trendIcon: getTrendIcon(stats.available > previousStats.available ? "up" : stats.available < previousStats.available ? "down" : "neutral"),
    },
    {
      title: "Booked",
      value: stats.booked.toString(),
      subtitle: `${stats.bookedPercentage}% of total`,
      icon: IconBedOff,
      color: "blue",
      trend: stats.booked > previousStats.booked ? "up" : stats.booked < previousStats.booked ? "down" : "neutral",
      trendValue: stats.booked - previousStats.booked,
      trendIcon: getTrendIcon(stats.booked > previousStats.booked ? "up" : stats.booked < previousStats.booked ? "down" : "neutral"),
    },
    {
      title: "Maintenance",
      value: stats.maintenance.toString(),
      subtitle: `${stats.maintenancePercentage}% of total`,
      icon: IconTools,
      color: "red",
      trend: stats.maintenance > previousStats.maintenance ? "up" : stats.maintenance < previousStats.maintenance ? "down" : "neutral",
      trendValue: stats.maintenance - previousStats.maintenance,
      trendIcon: getTrendIcon(stats.maintenance > previousStats.maintenance ? "up" : stats.maintenance < previousStats.maintenance ? "down" : "neutral"),
    },
  ];

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {[1, 2, 3, 4].map((index) => (
          <ManageRoomCard key={index} isLoading={true} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {cardsData.map((card, index) => (
        <ManageRoomCard key={index} card={card} />
      ))}
    </SimpleGrid>
  );
};

export default ManageRoomsPerformanceCards;