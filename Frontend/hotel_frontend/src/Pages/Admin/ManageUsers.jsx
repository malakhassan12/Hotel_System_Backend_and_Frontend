import { Container, Title, Text, Stack, Group, Paper, ThemeIcon, Badge, SimpleGrid } from "@mantine/core";
import { IconUsers, IconUserCheck, IconClock } from "@tabler/icons-react";
import UserTable from "../../Components/Table/Admin/UserTable";
import useGetPendingEmployees from "../../Hooks/User/useGetPendingEmployees";

const ManageUsers = () => {
  const { data = [] } = useGetPendingEmployees();
  const employees = Array.isArray(data) ? data : [];

  console.log(employees)

  const pendingCount = employees.filter(u => !u.approved).length;
  const approvedCount = employees.filter(u => u.approved).length;

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header Section */}
        <Paper p="xl" radius="md" shadow="sm" withBorder>
          <Group justify="space-between" align="center">
            <Group gap="md">
              <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                <IconUsers size={24} />
              </ThemeIcon>
              <div>
                <Title order={3}>User Management</Title>
                <Text size="sm" c="dimmed" mt={4}>
                  Manage and review all system users
                </Text>
              </div>
            </Group>
            <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              Total: {employees.length}
            </Badge>
          </Group>
        </Paper>

        {/* Stats Overview */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="md">
          <Paper p="md" radius="md" withBorder >
            <Group justify="space-between" align="center">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Pending Approval</Text>
                <Text fw={700} size="2rem" c="yellow">{pendingCount}</Text>
              </div>
              <ThemeIcon size="lg" radius="xl" color="yellow" variant="light">
                <IconClock size={20} />
              </ThemeIcon>
            </Group>
          </Paper>

          <Paper p="md" radius="md" withBorder >
            <Group justify="space-between" align="center">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Approved Users</Text>
                <Text fw={700} size="2rem" c="green">{approvedCount}</Text>
              </div>
              <ThemeIcon size="lg" radius="xl" color="green" variant="light">
                <IconUserCheck size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        </SimpleGrid>

        {/* User Table */}
        <Paper withBorder radius="md" style={{ overflow: "hidden" }}>
          <UserTable users={employees} />
        </Paper>
      </Stack>
    </Container>
  );
};

export default ManageUsers;