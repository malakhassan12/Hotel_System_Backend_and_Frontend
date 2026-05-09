import {
  Card,
  Text,
  Group,
  ThemeIcon,
  Stack,
  Badge,
} from "@mantine/core";

const PerformanceRoomCard = ({ item }) => {
  const { title, value, icon: Icon, color, image, status } = item;

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
      <Stack gap={8} mt={image ? "md" : 0}>
        <Group justify="space-between" align="center">
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
            {title}
          </Text>
          <ThemeIcon size="md" radius="xl" variant="light" color={color}>
            <Icon size={16} />
          </ThemeIcon>
        </Group>

        <Text size="2rem" fw={700} lh={1}>
          {value}
        </Text>

        {status && (
          <Badge size="sm" radius="xl" color={color} variant="light">
            {status}
          </Badge>
        )}
      </Stack>
    </Card>
  );
};

export default PerformanceRoomCard;
