import {
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Title,
  Center,
  useMantineTheme,
  Loader,
  Alert,
} from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useGetRevenueByMonth from "../../../Hooks/Card/useGetRevenueByMonth";
import { IconAlertCircle } from "@tabler/icons-react";
import Loading from "../../Loader/Loading";
import Error from "../../Loader/Error";
import NoData from "../../Empty/NoData";

const ReceptionistLineChart = () => {
  const { data: revenueData, isLoading, error } = useGetRevenueByMonth();
  console.log("Revenue data:", revenueData);

  const theme = useMantineTheme();

  // Month names mapping
  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  // Transform API data to chart format
  const transformData = () => {
    if (!Array.isArray(revenueData) || revenueData.length === 0) {
      return [];
    }

    // Sort by month
    const sortedData = [...revenueData].sort((a, b) => a.month - b.month);

    // Transform to chart format
    return sortedData.map((item) => ({
      name: monthNames[item.month] || `Month ${item.month}`,
      month: item.month,
      year: item.year,
      revenue: item.totalRevenue,
    }));
  };

  const chartData = transformData();

  // Calculate total revenue
  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.revenue, 0);

  // Calculate average revenue
  const averageRevenue =
    chartData.length > 0 ? totalRevenue / chartData.length : 0;

  // Find max revenue
  const maxRevenue =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.revenue)) : 0;

  if (isLoading) {
    return <Loading name={"revenue"} />;
  }

  if (error) {
    return <Error name={"revenue"} error={error} />;
  }

  if (chartData.length === 0) {
    return <NoData name={"revenue"} />;
  }

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
      <Stack gap="md">
        <Group justify="space-between" wrap="wrap">
          <Title order={5}>Revenue Overview</Title>
          <Group gap="sm">
            <Badge variant="light" color="green">
              Avg: $
              {averageRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Badge>
            <Badge variant="light" color="primary">
              Total: $
              {totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Badge>
          </Group>
        </Group>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--mantine-color-gray-2)"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--mantine-color-dimmed)" }}
              label={{ value: "Month", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              tick={{ fill: "var(--mantine-color-dimmed)" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              label={{
                value: "Revenue ($)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--mantine-color-body)",
                border: "1px solid var(--mantine-color-gray-2)",
                borderRadius: "8px",
              }}
              formatter={(value) => [
                `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                "Revenue",
              ]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={theme.colors.primary[6]}
              strokeWidth={3}
              dot={{
                fill: theme.colors.primary[6],
                r: 5,
                strokeWidth: 2,
                stroke: "white",
              }}
              activeDot={{
                r: 7,
                stroke: theme.colors.primary[8],
                strokeWidth: 2,
              }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Stats Summary */}
        <Group justify="space-between" wrap="wrap">
          <Group gap="xs">
            <div
              style={{
                width: 20,
                height: 3,
                backgroundColor: theme.colors.primary[6],
              }}
            />
            <Text size="xs">Monthly Revenue</Text>
          </Group>
          <Group gap="md">
            <div>
              <Text size="xs" c="dimmed">
                Best Month
              </Text>
              <Text size="sm" fw={600}>
                {chartData.find((d) => d.revenue === maxRevenue)?.name}: $
                {maxRevenue.toLocaleString()}
              </Text>
            </div>
            <div>
              <Text size="xs" c="dimmed">
                Months Tracked
              </Text>
              <Text size="sm" fw={600}>
                {chartData.length}
              </Text>
            </div>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default ReceptionistLineChart;
