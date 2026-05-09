import React from "react";
import { SimpleGrid } from "@mantine/core";
import {
  IconFileText,
  IconUserCheck,
  IconCalendarEvent,
  IconSettings,
} from "@tabler/icons-react";
import LogsCard from "../../Card/Admin/LogsCard";

const LogsPerformanceCards = () => {
  const cardsData = [
    {
      title: "Total Logs",
      value: "5",
      icon: IconFileText,
      color: "primary",
      trend: "up",
      trendValue: "+2",
      bgColor: "var(--mantine-color-primary-0)",
    },
    {
      title: "User Actions",
      value: "2",
      icon: IconUserCheck,
      color: "green",
      trend: "neutral",
      trendValue: "0",
      bgColor: "var(--mantine-color-green-0)",
    },
    {
      title: "Bookings",
      value: "2",
      icon: IconCalendarEvent,
      color: "blue",
      trend: "up",
      trendValue: "+1",
      bgColor: "var(--mantine-color-blue-0)",
    },
    {
      title: "System Updates",
      value: "1",
      icon: IconSettings,
      color: "orange",
      trend: "neutral",
      trendValue: "0",
      bgColor: "var(--mantine-color-orange-0)",
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {cardsData.map((card, index) => (
        <div
          key={index}
          span={{ base: 12, sm: 6, lg: 4 }}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="700"
          data-aos-delay={index * 100}
        >
          <LogsCard card={card} />
        </div>
      ))}
    </SimpleGrid>
  );
};

export default LogsPerformanceCards;
