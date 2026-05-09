import { Modal, Text, Stack, Group, Badge, Avatar, Divider, Paper, SimpleGrid } from "@mantine/core";
import { IconMail, IconPhone, IconCalendar, IconId, IconBriefcase, IconUserCheck, IconUserX } from "@tabler/icons-react";

const UserModal = ({ opened, onClose, user }) => {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "ADMIN": return "Administrator";
      case "EMPLOYEE": return "Employee";
      case "CUSTOMER": return "Customer";
      default: return role;
    }
  };

  const getInitials = (username) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  return (
    <Modal opened={opened} onClose={onClose} size="md" centered padding="xl">
      <Stack gap="lg">
        {/* User Profile Header */}
        <Group justify="center" direction="column" style={{ textAlign: "center" }}>
          <Avatar size={80} radius="xl" color="blue">
            <Text size="xl" fw={700}>{getInitials(user.username)}</Text>
          </Avatar>
          <div>
            <Text size="xl" fw={700}>{user.username}</Text>
            <Badge color={user.approved ? "green" : "yellow"} size="md" mt="xs">
              {user.approved ? "✓ Approved" : "⏳ Pending"}
            </Badge>
          </div>
        </Group>

        <Divider />

        {/* User Details */}
        <SimpleGrid cols={2} spacing="md">
          <div>
            <Text size="xs" c="dimmed">User ID</Text>
            <Text size="sm" fw={500}>{user.id}</Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">Role</Text>
            <Badge color="blue" variant="light" size="sm">
              {getRoleLabel(user.role)}
            </Badge>
          </div>
        </SimpleGrid>

        <Divider />

        {/* Contact Info */}
        <div>
          <Text size="xs" c="dimmed" mb="xs">Contact Information</Text>
          <Stack gap="xs">
            <Group gap="xs">
              <IconMail size={16} />
              <Text size="sm">{user.email}</Text>
            </Group>
            <Group gap="xs">
              <IconPhone size={16} />
              <Text size="sm">{user.phone || "Not provided"}</Text>
            </Group>
          </Stack>
        </div>

        <Divider />

        {/* Registration Info */}
        <div>
          <Text size="xs" c="dimmed" mb="xs">Registration Date</Text>
          <Group gap="xs">
            <IconCalendar size={16} />
            <Text size="sm">{formatDate(user.created_at)}</Text>
          </Group>
        </div>
      </Stack>
    </Modal>
  );
};

export default UserModal;