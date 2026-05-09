// ******************************** Mantline UI ********************************

import {
  AppShell,
  Stack,
  Paper,
  Text,
  Group,
  Badge,
  Button,
  Divider,
  ThemeIcon,
} from "@mantine/core";

// ******************************** Icons ********************************

import {
  IconAlertTriangle,
  IconChartBar,
  IconUsers,
  IconCash,
  IconPlus,
  IconActivity,
} from "@tabler/icons-react";

const AdminAside = () => {
  return (
    <AppShell.Aside
      p="md"
      style={{
        gap: "1rem",
        height: "100%",
      }}
    >
      <Stack gap="md">
        {/* 🔴 Alerts */}
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between" mb="xs">
            <Text fw={600}>System Alerts</Text>
            <ThemeIcon color="red" variant="light">
              <IconAlertTriangle size={16} />
            </ThemeIcon>
          </Group>

          <Stack gap={4}>
            <Text size="xs" c="red">
              3 rooms under maintenance
            </Text>
            <Text size="xs" c="orange">
              8 pending payments
            </Text>
            <Text size="xs" c="yellow">
              High traffic detected
            </Text>
          </Stack>
        </Paper>

        {/* 📊 Quick Stats */}
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between" mb="xs">
            <Text fw={600}>Quick Stats</Text>
            <ThemeIcon color="blue" variant="light">
              <IconChartBar size={16} />
            </ThemeIcon>
          </Group>

          <Stack gap={4}>
            <Group justify="space-between">
              <Text size="xs">Occupancy</Text>
              <Badge color="green">78%</Badge>
            </Group>

            <Group justify="space-between">
              <Text size="xs">Revenue</Text>
              <Badge color="blue">$2300</Badge>
            </Group>

            <Group justify="space-between">
              <Text size="xs">Active Users</Text>
              <Badge color="grape">24</Badge>
            </Group>
          </Stack>
        </Paper>

        {/* 👤 Activity */}
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between" mb="xs">
            <Text fw={600}>Recent Activity</Text>
            <ThemeIcon color="grape" variant="light">
              <IconActivity size={16} />
            </ThemeIcon>
          </Group>

          <Stack gap={4}>
            <Text size="xs">Admin added new room</Text>
            <Text size="xs">Booking approved</Text>
            <Text size="xs">Payment completed</Text>
          </Stack>
        </Paper>

        <Divider />
      </Stack>
    </AppShell.Aside>
  );
};

export default AdminAside;
