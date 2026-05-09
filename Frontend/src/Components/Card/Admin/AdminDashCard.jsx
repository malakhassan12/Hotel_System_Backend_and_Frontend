import React from "react";
import { Paper, Text, Group, ThemeIcon, Stack, Badge } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";

const AdminDashCard = ({ card }) => {
  const { title, value, icon: Icon, color, trend, trendValue, bgColor } = card;

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <IconTrendingUp size={14} />;
      case "down":
        return <IconTrendingDown size={14} />;
      default:
        return <IconMinus size={14} />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "green";
      case "down":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Paper
      p="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: bgColor || "white",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap={4} style={{ flex: 1 }}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
            {title}
          </Text>
          <Text fw={800} size="2rem" style={{ lineHeight: 1.2 }}>
            {value}
          </Text>
          
          {trend && trendValue && (
            <Badge
              color={getTrendColor()}
              variant="light"
              size="sm"
              leftSection={getTrendIcon()}
              style={{ width: "fit-content" }}
            >
              {trendValue}
            </Badge>
          )}
        </Stack>

        <ThemeIcon
          size="lg"
          radius="md"
          color={color || "blue"}
          variant="light"
        >
          <Icon size={24} stroke={1.5} />
        </ThemeIcon>
      </Group>
    </Paper>
  );
};

export default AdminDashCard;