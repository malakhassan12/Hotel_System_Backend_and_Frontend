import React from "react";
import { Card, Text, Group, ThemeIcon } from "@mantine/core";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from "@tabler/icons-react";

const BookingCard = ({ item }) => {
  const { title, value, icon: Icon, color, trend } = item;

  const getTrendIcon = () => {
    if (!trend && trend !== 0) return null;
    if (trend === 0) return <IconMinus size={14} />;
    if (trend > 0) return <IconTrendingUp size={14} />;
    return <IconTrendingDown size={14} />;
  };

  const getTrendColor = () => {
    if (!trend && trend !== 0) return "gray";
    if (trend === 0) return "gray";
    if (trend > 0) return "green";
    return "red";
  };

  const getTrendText = () => {
    if (!trend && trend !== 0) return "";
    if (trend === 0) return "No change";
    if (trend > 0) return `+${trend}% of total`;
    return `${trend}% of total`;
  };

  // Format the display value
  const formatDisplayValue = () => {
    if (title === "Total Revenue") {
      // Format as currency
      return `$${value?.toLocaleString() || 0}`;
    }
    // Format as number
    return value?.toLocaleString() || 0;
  };

  return (
    <Card
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-sm)";
      }}
    >
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
            {title}
          </Text>
          <Text size="2rem" fw={700} mt={4}>
            {formatDisplayValue()}
          </Text>
        </div>

        <ThemeIcon size="lg" radius="md" variant="light" color={color}>
          <Icon size={22} />
        </ThemeIcon>
      </Group>

      {trend !== undefined && (
        <Group justify="space-between" mt="md">
          <Group gap="xs">
            <Text size="xs" c={getTrendColor()}>
              {getTrendIcon()}
            </Text>
            <Text size="xs" c={getTrendColor()} fw={500}>
              {getTrendText()}
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            of total bookings
          </Text>
        </Group>
      )}
    </Card>
  );
};

export default BookingCard;