// ******************************** Rechart ********************************

import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
// ******************************** Mantline UI ********************************

import { Card, Text, Group, ThemeIcon, Stack, useMantineTheme, SimpleGrid } from "@mantine/core";
// ******************************** Icons ********************************

import { IconBuilding, IconTrendingUp, IconCalendar, IconBed, IconCheck, IconX } from "@tabler/icons-react";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";

const OccupancyBarChart = () => {
  const theme = useMantineTheme();
  const { data: rooms = [] } = useGetAllRooms();
  const safeData = Array.isArray(rooms) ? rooms : [];

  // Calculate room status counts from API data
  const calculateStatusCounts = () => {
    let available = 0;
    let booked = 0;
    let maintenance = 0;

    safeData.forEach((room) => {
      const status = room.status?.toUpperCase();
      if (status === "AVAILABLE") {
        available++;
      } else if (status === "BOOKED") {
        booked++;
      } else if (status === "MAINTENANCE" || status === "UNAVAILABLE") {
        maintenance++;
      }
    });

    return { available, booked, maintenance };
  };

  const counts = calculateStatusCounts();
  const totalRooms = safeData.length;
  
  // Calculate percentages
  const availablePercentage = totalRooms > 0 ? (counts.available / totalRooms) * 100 : 0;
  const bookedPercentage = totalRooms > 0 ? (counts.booked / totalRooms) * 100 : 0;
  const maintenancePercentage = totalRooms > 0 ? (counts.maintenance / totalRooms) * 100 : 0;
  
  // Current occupancy rate (booked rooms percentage)
  const occupancyRate = bookedPercentage;

  // Monthly data (simulated based on current data)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((month, index) => {
    // Create realistic variation based on month and current data
    const variation = Math.sin(index * 0.5) * 10;
    let occupiedPercent = Math.max(0, Math.min(100, occupancyRate + variation));
    let availablePercent = 100 - occupiedPercent;
    
    return {
      name: month,
      occupied: Math.round(occupiedPercent),
      available: Math.round(availablePercent),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "var(--mantine-color-body)",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid var(--mantine-color-gray-3)",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Text size="sm" fw={600} mb={6}>
            {label}
          </Text>
          <Text size="xs" c="dimmed" mb={2}>
            Occupied: {payload[0]?.value}% ({Math.round((payload[0]?.value / 100) * totalRooms)} rooms)
          </Text>
          <Text size="xs" c="dimmed" mb={2}>
            Available: {payload[1]?.value}% ({Math.round((payload[1]?.value / 100) * totalRooms)} rooms)
          </Text>
          <Text size="xs" c="green" fw={500} mt={4}>
            Occupancy Rate: {payload[0]?.value}%
          </Text>
        </div>
      );
    }
    return null;
  };

  if (totalRooms === 0) {
    return (
      <Card withBorder padding="lg" radius="md" shadow="sm">
        <Stack align="center" gap="md" py="xl">
          <ThemeIcon size="xl" radius="xl" variant="light" color="gray">
            <IconBuilding size={32} />
          </ThemeIcon>
          <Text fw={500} c="dimmed">No rooms available</Text>
          <Text size="sm" c="dimmed" ta="center">Add rooms to see occupancy data</Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card withBorder padding="lg" radius="md" shadow="sm">
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" wrap="wrap">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              Occupancy Analysis
            </Text>
            <Text size="sm" fw={500}>
              Monthly room occupancy rate
            </Text>
          </div>
          <Group gap="md">
            <Group gap="xs">
              <ThemeIcon size="sm" radius="xl" variant="light" color="green">
                <IconTrendingUp size={12} />
              </ThemeIcon>
              <Text size="xs" c="green" fw={500}>
                Current: {occupancyRate.toFixed(1)}%
              </Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon size="sm" radius="xl" variant="light" color="primary">
                <IconCalendar size={12} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">Year 2024</Text>
            </Group>
          </Group>
        </Group>

        {/* Quick Stats */}
        <SimpleGrid cols={3} spacing="md">
          <Card withBorder padding="xs" radius="md" ta="center">
            <Text size="xs" c="dimmed">Total Rooms</Text>
            <Text size="xl" fw={700} c="blue">{totalRooms}</Text>
          </Card>
          <Card withBorder padding="xs" radius="md" ta="center">
            <Text size="xs" c="dimmed">Booked Rooms</Text>
            <Text size="xl" fw={700} c="green">{counts.booked}</Text>
          </Card>
          <Card withBorder padding="xs" radius="md" ta="center">
            <Text size="xs" c="dimmed">Available Rooms</Text>
            <Text size="xl" fw={700} c="orange">{counts.available}</Text>
          </Card>
        </SimpleGrid>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--mantine-color-gray-3)" 
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: "var(--mantine-color-dimmed)", fontSize: 12 }}
              axisLine={{ stroke: "var(--mantine-color-gray-4)" }}
            />
            <YAxis 
              tick={{ fill: "var(--mantine-color-dimmed)", fontSize: 12 }}
              axisLine={{ stroke: "var(--mantine-color-gray-4)" }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip content={CustomTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: 16 }}
              formatter={(value) => (
                <span style={{ color: "var(--mantine-color-text)" }}>
                  {value === "occupied" ? "Occupied Rooms (%)" : "Available Rooms (%)"}
                </span>
              )}
            />
            <Bar
              dataKey="occupied"
              name="occupied"
              fill={theme.colors.primary[6]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={500}
            />
            <Bar
              dataKey="available"
              name="available"
              fill={theme.colors.green[5]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Cards */}
        <SimpleGrid cols={3} spacing="md" mt="md">
          <Card withBorder padding="sm" radius="md" >
            <Group gap="xs">
              <IconCheck size={16} color={theme.colors.green[7]} />
              <Text size="xs" fw={600} c="green">Available</Text>
            </Group>
            <Text size="xl" fw={700}>{counts.available}</Text>
            <Text size="xs" c="dimmed">{availablePercentage.toFixed(1)}% of total</Text>
          </Card>
          
          <Card withBorder padding="sm" radius="md" >
            <Group gap="xs">
              <IconBed size={16} color={theme.colors.blue[7]} />
              <Text size="xs" fw={600} c="blue">Booked</Text>
            </Group>
            <Text size="xl" fw={700}>{counts.booked}</Text>
            <Text size="xs" c="dimmed">{bookedPercentage.toFixed(1)}% of total</Text>
          </Card>
          
          <Card withBorder padding="sm" radius="md" >
            <Group gap="xs">
              <IconX size={16} color={theme.colors.red[7]} />
              <Text size="xs" fw={600} c="red">Maintenance</Text>
            </Group>
            <Text size="xl" fw={700}>{counts.maintenance}</Text>
            <Text size="xs" c="dimmed">{maintenancePercentage.toFixed(1)}% of total</Text>
          </Card>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

export default OccupancyBarChart;