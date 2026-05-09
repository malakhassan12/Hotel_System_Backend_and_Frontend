// ******************************** Mantline UI ********************************

import {
  Tabs,
  Card,
  Title,
  Text,
  Group,
  ThemeIcon,
  Box,
  Space,
} from "@mantine/core";
// ******************************** Icons ********************************

import React from "react";
import {
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconTrendingUp,
  IconCalendar,
} from "@tabler/icons-react";
// ******************************** Compoenents ********************************

import OccupancyBarChart from "../../Analysis/Admin/OccupancyBarChart";
import RevenueLineChart from "../../Analysis/Admin/RevenueLineChart";
import RoomTypePieChart from "../../Analysis/Admin/RoomTypePieChart";

const AdminDashTabs = () => {
  return (
    <Card withBorder padding="lg" radius="md" shadow="sm">
      <Group justify="space-between" mb="md">
        <div>
          <Title order={4}>Analytics Dashboard</Title>
          <Text size="sm" c="dimmed">
            View hotel performance metrics and insights
          </Text>
        </div>
        <Group gap="xs">
          <ThemeIcon size="sm" radius="xl" variant="light" color="gray">
            <IconCalendar size={12} />
          </ThemeIcon>
          <Text size="xs" c="dimmed">
            Last 30 days
          </Text>
        </Group>
      </Group>

      <Tabs
        defaultValue="occupancy"
        variant="outline"
        radius="md"
        color="primary"
      >
        <Tabs.List grow>
          <Tabs.Tab value="occupancy" leftSection={<IconChartBar size={16} />}>
            Occupancy Rate
          </Tabs.Tab>
          <Tabs.Tab value="revenue" leftSection={<IconChartLine size={16} />}>
            Revenue Tracking
          </Tabs.Tab>
          <Tabs.Tab value="roomType" leftSection={<IconChartPie size={16} />}>
            Room Distribution
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="occupancy" pt="lg">
          <Box>
            <Group justify="space-between" mb="md">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Monthly Occupancy Analysis
                </Text>
                <Text size="sm" fw={500}>
                  Room occupancy rate over time
                </Text>
              </div>
              <Group gap="xs">
                <IconTrendingUp
                  size={14}
                  color="var(--mantine-color-green-6)"
                />
                <Text size="xs" c="green" fw={500}>
                  +5.2% vs last month
                </Text>
              </Group>
            </Group>
            <OccupancyBarChart />
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="revenue" pt="lg">
          <Box>
            <Group justify="space-between" mb="md">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Revenue Analysis
                </Text>
                <Text size="sm" fw={500}>
                  Total revenue and income tracking
                </Text>
              </div>
              <Group gap="xs">
                <IconTrendingUp
                  size={14}
                  color="var(--mantine-color-green-6)"
                />
                <Text size="xs" c="green" fw={500}>
                  +12.5% vs last month
                </Text>
              </Group>
            </Group>
            <RevenueLineChart />
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="roomType" pt="lg">
          <Box>
            <Group justify="space-between" mb="md">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Room Type Distribution
                </Text>
                <Text size="sm" fw={500}>
                  Breakdown by room category
                </Text>
              </div>
            </Group>
            <RoomTypePieChart />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default AdminDashTabs;
