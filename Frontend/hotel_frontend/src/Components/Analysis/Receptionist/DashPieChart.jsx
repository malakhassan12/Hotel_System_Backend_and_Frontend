import { Card, Text, Group, Badge, Stack, Title, Center } from "@mantine/core";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";

const DashPieChart = () => {
  const { data: rooms } = useGetAllRooms();
  console.log("Rooms data:", rooms);

  // Calculate room status counts from API data
  const calculateStatusCounts = () => {
    if (!Array.isArray(rooms) || rooms.length === 0) {
      return { available: 0, booked: 0, maintenance: 0 };
    }

    let available = 0;
    let booked = 0;
    let maintenance = 0;

    rooms.forEach((room) => {
      const status = room.status?.toUpperCase();
      if (status === "AVAILABLE") {
        available++;
      } else if (status === "BOOKED") {
        booked++;
      } else if (status === "MAINTENANCE") {
        maintenance++;
      }
    });

    return { available, booked, maintenance };
  };

  const counts = calculateStatusCounts();

  const data = [
    { name: "Available", value: counts.available, color: "#22c55e" },
    { name: "Booked", value: counts.booked, color: "#FDD835" },
    { name: "Maintenance", value: counts.maintenance, color: "#ef4444" },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

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
        <Group justify="space-between">
          <Title order={5}>Room Status</Title>
          <Badge variant="light" color="primary">
            Total: {total}
          </Badge>
        </Group>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <Group justify="center" gap="lg">
          {data.map((item, i) => (
            <Group key={i} gap="xs">
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color }} />
              <Text size="xs">{item.name}</Text>
              <Text size="xs" fw={600}>{item.value}</Text>
            </Group>
          ))}
        </Group>
      </Stack>
    </Card>
  );
};

export default DashPieChart;