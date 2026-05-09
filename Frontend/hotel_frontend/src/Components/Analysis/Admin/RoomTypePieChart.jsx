import React, { useMemo } from "react";
// ******************************** Recharts ********************************

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ******************************** Mantline UI ********************************

import {
  Card,
  Text,
  Group,
  ThemeIcon,
  Stack,
  useMantineTheme,
  SimpleGrid,
} from "@mantine/core";
// ******************************** Icons ********************************

import { IconChartPie, IconBed, IconBuilding } from "@tabler/icons-react";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";

const roomTypeLabels = {
  SINGLE: "Single Room",
  DOUBLE: "Double Room",
  TRIPLE: "Triple Room",
  SUITE: "Suite",
  DELUXE: "Deluxe Room",
};

const roomTypeColors = {
  SINGLE: { value: "blue", percentage: 10 },
  DOUBLE: { value: "green", percentage: 28 },
  TRIPLE: { value: "orange", percentage: 15 },
  SUITE: { value: "purple", percentage: 12 },
  DELUXE: { value: "pink", percentage: 35 },
};

const RoomTypePieChart = () => {
  const theme = useMantineTheme();
  const { data: rooms } = useGetAllRooms();
  const safeData = Array.isArray(rooms) ? rooms : [];

  // Calculate room type distribution from actual data
  const roomTypeDistribution = useMemo(() => {
    const distribution = {};
    
    safeData.forEach((room) => {
      const roomType = room.roomType;
      distribution[roomType] = (distribution[roomType] || 0) + 1;
    });
    
    return distribution;
  }, [safeData]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const data = [];
    let total = 0;
    
    // Calculate total first
    Object.values(roomTypeDistribution).forEach((count) => {
      total += count;
    });
    
    // Build chart data
    Object.entries(roomTypeDistribution).forEach(([type, count]) => {
      const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
      const colorConfig = roomTypeColors[type] || { value: "gray", percentage: 0 };
      
      data.push({
        name: roomTypeLabels[type] || type,
        value: count,
        color: theme.colors[colorConfig.value][6],
        percentage: parseFloat(percentage),
        roomType: type,
      });
    });
    
    return data;
  }, [roomTypeDistribution, theme]);

  const totalRooms = safeData.length;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "var(--mantine-color-body)",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--mantine-color-gray-3)",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Text size="sm" fw={600}>
            {data.name}
          </Text>
          <Text size="xs" c="dimmed">
            Rooms: {data.value}
          </Text>
          <Text size="xs" c="dimmed">
            Percentage: {data.percentage}%
          </Text>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <SimpleGrid cols={2} spacing="xs" verticalSpacing={4} mt="md">
        {payload.map((entry, index) => {
          const chartItem = chartData.find((d) => d.name === entry.value);
          return (
            <Group key={index} gap="xs">
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                }}
              />
              <Text size="xs" c="dimmed">
                {entry.value}
              </Text>
              <Text size="xs" fw={500}>
                {chartItem?.value || 0} rooms
              </Text>
            </Group>
          );
        })}
      </SimpleGrid>
    );
  };

  if (totalRooms === 0) {
    return (
      <Card withBorder padding="lg" radius="md" shadow="sm">
        <Stack align="center" gap="md" py="xl">
          <ThemeIcon size="xl" radius="xl" variant="light" color="gray">
            <IconBed size={32} />
          </ThemeIcon>
          <Text fw={500} c="dimmed">
            No rooms available
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Add rooms to see the distribution chart
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card withBorder padding="lg" radius="md" shadow="sm">
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              Room Distribution
            </Text>
            <Text size="sm" fw={500}>
              Breakdown by room type
            </Text>
          </div>
          <Group gap="xs">
            <ThemeIcon size="sm" radius="xl" variant="light" color="primary">
              <IconBuilding size={12} />
            </ThemeIcon>
            <Text size="xs" c="dimmed">
              Total: {totalRooms} rooms
            </Text>
          </Group>
        </Group>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={{
                stroke: "var(--mantine-color-gray-4)",
                strokeWidth: 1,
              }}
              isAnimationActive={true}
              animationDuration={500}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="var(--mantine-color-body)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend
              content={CustomLegend}
              verticalAlign="bottom"
              height={100}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Quick Stats */}
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mt="md">
          {chartData.map((item, index) => (
            <Card key={index} withBorder padding="xs" radius="md" ta="center">
              <Text size="xs" c="dimmed" truncate>
                {item.name}
              </Text>
              <Text size="xl" fw={700} c={item.color.split(".")[0]}>
                {item.value}
              </Text>
              <Text size="xs" c="dimmed">
                {item.percentage}%
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

export default RoomTypePieChart;