import {
  Table,
  Text,
  Badge,
  Group,
  Avatar,
  Button,
  Paper,
  Stack,
  Box,
  Card,
  Grid,
  Divider,
  Select,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconUserCheck,
  IconMail,
  IconPhone,
  IconCalendar,
  IconClock,
  IconFilter,
} from "@tabler/icons-react";
import { useState } from "react";
import useAuthMutations from "../../../Hooks/Auth/useAuthMutations";
import UserModal from "../../Modal/Admin/UserModal";

const UserTable = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const { approveEmployeeMutation, rejectEmployeeMutation } = useAuthMutations();
  const theme = useMantineTheme();

  const onAccept = (userId) => approveEmployeeMutation.mutate(userId);
  const onReject = (userId) => rejectEmployeeMutation.mutate(userId);
  const openUserModal = (user) => {
    setSelectedUser(user);
    setModalOpened(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleColor = (role) => {
    const colors = { ADMIN: "red", EMPLOYEE: "blue", CUSTOMER: "green" };
    return colors[role] || "gray";
  };

  const getRoleLabel = (role) => {
    const labels = { ADMIN: "Admin", EMPLOYEE: "Employee", CUSTOMER: "Customer" };
    return labels[role] || role;
  };

  const getInitials = (username) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  // Filter users based on status
  const filteredUsers = users.filter((user) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "approved") return user.approved === true;
    if (statusFilter === "pending") return user.approved === false;
    return true;
  });

  // const pendingCount = users.filter(u => !u.approved).length;
  // const approvedCount = users.filter(u => u.approved).length;

  // Mobile Card View
  const UserCard = ({ user }) => (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="start">
          <Group gap="sm" style={{ flex: 1, cursor: "pointer" }} onClick={() => openUserModal(user)}>
            <Avatar radius="xl" color={getRoleColor(user.role)} size="md">
              {getInitials(user.username)}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Text fw={600} size="sm">{user.username || "Unnamed User"}</Text>
              <Text size="xs" c="dimmed">ID: {user.id}</Text>
            </div>
          </Group>
          <Badge color={user.approved ? "green" : "yellow"} variant="filled">
            {user.approved ? "Approved" : "Pending"}
          </Badge>
        </Group>

        <Divider />

        <Stack gap="xs">
          <Group gap="xs">
            <IconMail size={14} color={theme.colors.gray[5]} />
            <Text size="sm">{user.email}</Text>
          </Group>
          {user?.phone && (
            <Group gap="xs">
              <IconPhone size={14} color={theme.colors.gray[5]} />
              <Text size="sm">{user?.phone}</Text>
            </Group>
          )}
        </Stack>

        <Grid>
          <Grid.Col span={6}>
            <Badge color={getRoleColor(user.role)} variant="light" fullWidth>
              {getRoleLabel(user.role)}
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group gap="xs" justify="center">
              <IconCalendar size={12} color={theme.colors.gray[5]} />
              <Text size="xs">{formatDate(user.created_at)}</Text>
            </Group>
          </Grid.Col>
        </Grid>

        {!user.approved && (
          <Group grow mt="xs">
            <Button color="green" leftSection={<IconCheck size={14} />} onClick={() => onAccept(user.id)} size="sm">
              Approve
            </Button>
            <Button color="red" variant="light" leftSection={<IconX size={14} />} onClick={() => onReject(user.id)} size="sm">
              Reject
            </Button>
          </Group>
        )}
      </Stack>
    </Card>
  );

  // Empty State
  if (users.length === 0) {
    return (
      <Paper p="xl" radius="md" withBorder style={{ textAlign: "center" }}>
        <Stack align="center" gap="md">
          <IconUserCheck size={48} color={theme.colors.gray[5]} />
          <Text size="lg" fw={500} c="dimmed">No users found</Text>
          <Text size="sm" c="dimmed">Users will appear here once they register</Text>
        </Stack>
      </Paper>
    );
  }

  return (
    <>
      <UserModal opened={modalOpened} onClose={() => setModalOpened(false)} user={selectedUser} />

      <Stack gap="md">
        {/* Filter Bar */}
        {/* <Paper p="sm" radius="md" withBorder>
          <Group justify="space-between" wrap="wrap">
            <Group gap="xs">
              <IconFilter size={18} color={theme.colors.gray[6]} />
              <Text fw={500} size="sm">Filter by Status:</Text>
            </Group>
            
            <Group gap="sm">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                data={[
                  { value: "all", label: `All (${users.length})` },
                  { value: "pending", label: `Pending (${pendingCount})` },
                  { value: "approved", label: `Approved (${approvedCount})` },
                ]}
                style={{ width: 200 }}
                size="sm"
              />
            </Group>
          </Group>
        </Paper> */}

        {/* Results count */}
        {filteredUsers.length !== users.length && (
          <Group justify="flex-end">
            <Badge size="md" variant="light" radius="md">
              Showing {filteredUsers.length} of {users.length} users
            </Badge>
          </Group>
        )}

        {/* No results for filter */}
        {filteredUsers.length === 0 && (
          <Paper p="xl" radius="md" withBorder style={{ textAlign: "center" }}>
            <Stack align="center" gap="md">
              <Text size="lg" fw={500} c="dimmed">
                No {statusFilter === "pending" ? "pending" : "approved"} users found
              </Text>
              <Button variant="light" onClick={() => setStatusFilter("all")} size="sm">
                Show all users
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Mobile View - Cards */}
        {filteredUsers.length > 0 && (
          <>
            <Box  >
              <Stack gap="md">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </Stack>
            </Box>

         
          </>
        )}
      </Stack>
    </>
  );
};

export default UserTable;