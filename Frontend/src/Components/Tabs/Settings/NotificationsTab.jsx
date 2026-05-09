import { useState } from "react";
import {
  Stack,
  Title,
  Text,
  Divider,
  Group,
  Button,
  TextInput,
  ScrollArea,
  Card,
  ActionIcon,
  ThemeIcon,
  Space,
  Badge,
} from "@mantine/core";
import { IconSearch, IconX, IconMail, IconCheck } from "@tabler/icons-react";
import useGetAllNotificationByUserId from "../../../Hooks/Notification/useGetAllNotificationByUserId";
import useAuthStore from "../../../Store/authStore";
import NoData from "../../Empty/NoData";
import useNotificationMutations from "../../../Hooks/Notification/useNotificationMutations";

const NotificationsTab = () => {
  const { user } = useAuthStore();
  const { data: apiData } = useGetAllNotificationByUserId(user?.userId);
  const [search, setSearch] = useState("");

  const notifications = Array.isArray(apiData) ? apiData : [];

  const filtered = notifications.filter((n) =>
    n.message.toLowerCase().includes(search.toLowerCase()),
  );

  const { deleteNotiMutation, deleteAllNotiMutation } =
    useNotificationMutations();

  const deleteOne = (id) => {
    deleteNotiMutation.mutate(id);
  };

  const deleteAll = () => {
    deleteAllNotiMutation.mutate(user?.userId);
  };

  return (
    <Stack gap="md">
      <Space h="md" />

      <Group justify="space-between">
        <Group>
          <Button
            size="xs"
            color="red"
            variant="light"
            onClick={deleteAll}
            loading={deleteAllNotiMutation.isPending}
            leftSection={<IconX size={14} />}
          >
            Delete all
          </Button>
        </Group>
      </Group>

      <Divider />

      <TextInput
        placeholder="Search..."
        leftSection={<IconSearch size={14} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="sm"
      />

      <ScrollArea h={450}>
        <Stack gap="xs">
          {filtered.length === 0 ? (
            <NoData name={"No notifications"} />
          ) : (
            filtered.map((n) => (
              <Card key={n.id} withBorder p="xs">
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="sm" style={{ flex: 1 }}>
                    <ThemeIcon
                      size="sm"
                      radius="xl"
                      color={n.read ? "gray" : "blue"}
                      variant="light"
                    >
                      <IconMail size={12} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={n.read ? 400 : 600}>
                        {n.message}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {n.time}
                      </Text>
                    </div>
                  </Group>
                  <ActionIcon
                    size="sm"
                    onClick={() => deleteOne(n.id)}
                    loading={deleteNotiMutation.isPending}
                  >
                    <IconX size={12} />
                  </ActionIcon>
                </Group>
              </Card>
            ))
          )}
        </Stack>
      </ScrollArea>

      {notifications.length > 0 && (
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            Total: {notifications.length}
          </Text>
        </Group>
      )}
    </Stack>
  );
};

export default NotificationsTab;
