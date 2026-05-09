import React from "react";
import {
  Table,
  Text,
  Badge,
  Group,
  Stack,
  Container,
  Paper,
  Box,
  Card,
  ScrollArea,
} from "@mantine/core";
import {
  IconLogin,
  IconCalendarPlus,
  IconSettings,
  IconFileCheck,
  IconUserPlus,
} from "@tabler/icons-react";

const LogsTable = () => {
  const logs = [
    {
      timestamp: "2026/4/6, 8:00:00 AM",
      action: "User Login",
      color: "blue",
      icon: <IconLogin size={14} />,
      user: "Robert Wilson",
      userId: "U005",
      details: "Admin logged in from IP: 192.168.1.1",
    },
    {
      timestamp: "2026/4/5, 10:30:00 AM",
      action: "Booking Created",
      color: "teal",
      icon: <IconCalendarPlus size={14} />,
      user: "John Doe",
      userId: "U001",
      details: "New booking B001 created for Standard Room",
    },
    {
      timestamp: "2026/4/5, 2:15:00 PM",
      action: "Room Status Updated",
      color: "orange",
      icon: <IconSettings size={14} />,
      user: "Emily Davis",
      userId: "U004",
      details: "Room 6 status changed to Maintenance",
    },
    {
      timestamp: "2026/4/5, 3:00:00 PM",
      action: "Booking Confirmed",
      color: "gray",
      icon: <IconFileCheck size={14} />,
      user: "Emily Davis",
      userId: "U004",
      details: "Booking B002 confirmed by receptionist",
    },
    {
      timestamp: "2026/4/5, 9:00:00 AM",
      action: "User Registered",
      color: "violet",
      icon: <IconUserPlus size={14} />,
      user: "John Doe",
      userId: "U001",
      details: "New customer account created",
    },
  ];

  const DesktopTable = () => (
    <ScrollArea>
      <Table verticalSpacing="md" horizontalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Timestamp</Table.Th>
            <Table.Th>Action</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {logs.map((log, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <Text size="sm" c="dimmed">
                  {log.timestamp}
                </Text>
              </Table.Td>

              <Table.Td>
                <Group justify="space-between" mb="xs">
                  <Badge
                    variant="light"
                    color={log.color}
                    leftSection={log.icon}
                  >
                    {log.action}
                  </Badge>
                  <Text size="xs" c="dimmed">
                    {log.timestamp}
                  </Text>
                </Group>
              </Table.Td>

              <Table.Td>
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {log.user}
                  </Text>
                  <Text size="xs" c="dimmed">
                    ID: {log.userId}
                  </Text>
                </Stack>
              </Table.Td>

              <Table.Td>
                <Text size="sm" c="dimmed">
                  {log.details}
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );

  const MobileCards = () => (
    <Stack gap="md">
      {logs.map((log, index) => (
        <Card key={index}>
          <Group justify="space-between" mb="xs">
            <Badge variant="light" color={log.color} leftSection={log.icon}>
              {log.action}
            </Badge>
            <Text size="xs" c="dimmed">
              {log.timestamp}
            </Text>
          </Group>

          <Stack gap="xs">
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                User:
              </Text>
              <Text size="sm" fw={500}>
                {log.user}
              </Text>
              <Text size="xs" c="dimmed">
                ({log.userId})
              </Text>
            </Group>

            <Text size="sm" c="dimmed">
              {log.details}
            </Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  return (
    <Container size="xl" py="md">
      <Paper withBorder radius="md">
        <Box p="md">
          <Stack gap="xs">
            <Text fw={600} size="xl">
              Activity Logs
            </Text>
            <Text size="sm" c="dimmed">
              Detailed system activity history
            </Text>
          </Stack>
        </Box>

        {/* Desktop */}
        <Box visibleFrom="md">
          <DesktopTable />
        </Box>

        {/* Mobile */}
        <Box hiddenFrom="md" p="md">
          <MobileCards />
        </Box>
      </Paper>
    </Container>
  );
};

export default LogsTable;
