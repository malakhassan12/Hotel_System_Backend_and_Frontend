// ******************************** Mantine UI ********************************

import { Card, Text, Group, ThemeIcon } from "@mantine/core";

const CheckInPerformanceCard = ({ stat }) => {
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
            {stat.title}
          </Text>
          <Text size="2rem" fw={700} mt={4}>
            {stat.value}
          </Text>
          <Text size="xs" c="dimmed" mt={4}>
            {stat.description}
          </Text>
        </div>
        <ThemeIcon size="lg" radius="md" variant="light" color={stat.color}>
          <stat.icon size={22} />
        </ThemeIcon>
      </Group>
    </Card>
  );
};

export default CheckInPerformanceCard;
