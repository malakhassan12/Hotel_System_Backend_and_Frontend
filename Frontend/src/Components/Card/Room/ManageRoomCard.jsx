import React from "react";
import { Card, Text, Group, Badge, Skeleton } from "@mantine/core";

const ManageRoomCard = ({ card, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card withBorder padding="lg" radius="md">
        <Skeleton height={40} circle mb="md" />
        <Skeleton height={20} width="60%" mb="sm" />
        <Skeleton height={30} width="40%" />
      </Card>
    );
  }

  const Icon = card.icon;

  return (
    <Card withBorder padding="lg" radius="md" shadow="sm">
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            {card.title}
          </Text>
          <Text fw={700} size="xl">
            {card.value}
          </Text>
          {card.subtitle && (
            <Text size="xs" c="dimmed" mt={4}>
              {card.subtitle}
            </Text>
          )}
        </div>
        <Icon size={25} color={card.color === "primary" ? "#228be6" : card.color === "green" ? "#40c057" : card.color === "blue" ? "#339af0" : "#fa5252"} />
      </Group>

      <Group justify="space-between" mt="md">
        {card.trend && (
          <Badge
            color={
              card.trend === "up" ? "green" : card.trend === "down" ? "red" : "gray"
            }
            variant="light"
            leftSection={card.trendIcon}
          >
            {card.trendValue > 0 ? `+${card.trendValue}` : card.trendValue}
          </Badge>
        )}
      </Group>
    </Card>
  );
};

export default ManageRoomCard;