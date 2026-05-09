import {
  Modal,
  Group,
  Text,
  Stack,
  Avatar,
  Badge,
  Divider,
  Paper,
  Grid,
  ThemeIcon,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconId,
  IconMapPin,
  IconCalendar,
  IconUser,
  IconAlertCircle,
  IconCheck,
  IconClock,
  IconBuilding,
  IconStar,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import Loading from "../../Loader/Loading";
import Error from "../../Loader/Error";
import NoData from "../../Empty/NoData";

const CustomerModal = ({ opened, close, customer = {} }) => {

  const user = customer;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dayjs(dateString).format("MMMM DD, YYYY - hh:mm A");
  };

  const roleBadge = { label: "Customer", color: "blue", icon: IconUser }

  const RoleIcon = roleBadge.icon;
  const defaultAvatar =
    "https://ui-avatars.com/api/?background=228be6&color=fff&rounded=true&size=128&bold=true&name=" +
    (user?.username?.charAt(0) || "U");

 

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Group gap="sm">
          <Avatar size="md" radius="xl" color="primary" src={defaultAvatar}>
            {user?.username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <div>
            <Text size="lg" fw={700}>
              Customer Details
            </Text>
            <Text size="xs" c="dimmed">
              ID: #{user?.id}
            </Text>
          </div>
        </Group>
      }
      size="lg"
      centered
      transitionProps={{ transition: "fade", duration: 300 }}
    >
      <Stack gap="md">
        {/* Role Badge */}
        <Badge
          size="xl"
          radius="md"
          color={roleBadge?.color}
          variant="filled"
          fullWidth
          leftSection={<RoleIcon size={16} />}
          style={{ textAlign: "center", padding: "10px" }}
        >
          {roleBadge?.label}
        </Badge>

        {/* Personal Information */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Personal Information
          </Text>

          <Grid gutter="md">
            <Grid.Col span={12}>
              <Group gap="xs" align="flex-start" wrap="nowrap">
                <IconUser size={16} color="var(--mantine-color-primary-6)" />
                <div>
                  <Text size="xs" c="dimmed">
                    Username
                  </Text>
                  <Text size="sm" fw={600}>
                    {user?.username || "N/A"}
                  </Text>
                </div>
              </Group>
            </Grid.Col>

            <Grid.Col span={12}>
              <Group gap="xs" align="flex-start" wrap="nowrap">
                <IconMail size={16} color="var(--mantine-color-primary-6)" />
                <div>
                  <Text size="xs" c="dimmed">
                    Email Address
                  </Text>
                  <Text size="sm">{user?.email || "N/A"}</Text>
                </div>
              </Group>
            </Grid.Col>

            <Grid.Col span={12}>
              <Group gap="xs" align="flex-start" wrap="nowrap">
                <IconPhone size={16} color="var(--mantine-color-primary-6)" />
                <div>
                  <Text size="xs" c="dimmed">
                    Phone Number
                  </Text>
                  <Text size="sm">{user?.phone || "Not provided"}</Text>
                </div>
              </Group>
            </Grid.Col>

            <Grid.Col span={12}>
              <Group gap="xs" align="flex-start" wrap="nowrap">
                <IconCalendar
                  size={16}
                  color="var(--mantine-color-primary-6)"
                />
                <div>
                  <Text size="xs" c="dimmed">
                    Member Since
                  </Text>
                  <Text size="sm">{formatDate(user?.created_at)}</Text>
                </div>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Account Status */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Account Status
          </Text>

          <Grid>
            <Grid.Col span={6}>
              <Group gap="xs">
                <ThemeIcon size="sm" radius="xl" color="green" variant="light">
                  <IconCheck size={12} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">
                    Status
                  </Text>
                  <Badge size="sm" radius="xl" color="green" variant="light">
                    Active
                  </Badge>
                </div>
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group gap="xs">
                <ThemeIcon
                  size="sm"
                  radius="xl"
                  color="primary"
                  variant="light"
                >
                  <IconStar size={12} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">
                    Account Type
                  </Text>
                  <Text size="sm" fw={500}>
                    {roleBadge.label}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Security Information */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Security
          </Text>

          <Stack gap="sm">
            <Group gap="xs">
              <IconId size={16} color="var(--mantine-color-primary-6)" />
              <div>
                <Text size="xs" c="dimmed">
                  User ID
                </Text>
                <Text size="sm">{user?.id}</Text>
              </div>
            </Group>

            <Group gap="xs">
              <IconClock size={16} color="var(--mantine-color-primary-6)" />
              <div>
                <Text size="xs" c="dimmed">
                  Last Updated
                </Text>
                <Text size="sm">{formatDate(user?.created_at)}</Text>
              </div>
            </Group>
          </Stack>
        </Paper>

        {/* Footer */}
        <Divider />
        <Text size="xs" c="dimmed" ta="center">
          Customer since {dayjs(user?.created_at).format("YYYY")}
        </Text>
      </Stack>
    </Modal>
  );
};

export default CustomerModal;
