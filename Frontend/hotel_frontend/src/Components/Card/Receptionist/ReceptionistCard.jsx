// ******************************** Mantine UI ********************************
import { Card, Text, Group, Badge, ThemeIcon } from "@mantine/core";
// ******************************** Icons ********************************
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
} from "@tabler/icons-react";

const ReceptionistCard = ({ item }) => {
  const { label, value, icon: Icon, color, bg, trend, trendColor } = item;

  const getTrendIcon = () => {
    if (trend === "0") return <IconMinus size={14} />;
    if (trendColor === "green") return <IconTrendingUp size={14} />;
    return <IconTrendingDown size={14} />;
  };

  const getTrendColor = () => {
    if (trend === "0") return "gray";
    if (trendColor === "green") return "green";
    return "red";
  };

  return (
    <Card
      style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
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
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            {label}
          </Text>
          <Text size="xl" fw={700} mt={4}>
            {value}
          </Text>
        </div>

        <ThemeIcon
          size="lg"
          radius="md"
          variant="light"
          color={color}
          style={{
            backgroundColor: `light-dark(${bg}, var(--mantine-color-${color}-9))`,
          }}
        >
          <Icon size={22} />
        </ThemeIcon>
      </Group>

      <Group justify="space-between" mt="md">
        <Badge
          size="sm"
          radius="xl"
          variant="light"
          color={getTrendColor()}
          leftSection={getTrendIcon()}
        >
          {trend === "0" ? "No change" : `${trend} from last month`}
        </Badge>

        <Text size="xs" c="dimmed">
          vs last month
        </Text>
      </Group>
    </Card>
  );
};

export default ReceptionistCard;
