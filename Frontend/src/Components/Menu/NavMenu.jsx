import {
  Avatar,
  Badge,
  Grid,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../Store/authStore";
import Screens from "../../Utils/Screens/Screens";

const NavMenu = () => {
  const { user, role } = useAuthStore();
  const { isMobile } = Screens();
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Group gap="md" align="center" wrap="nowrap">
            <Avatar size="sm" color="primary" radius="xl">
              <IconUser size={14} />
            </Avatar>

            {!isMobile && (
              <Stack gap={4} style={{ flex: 1 }}>
                <Text
                  size="sm"
                  fw={600}
                  lineClamp={1}
                  style={{
                    background:
                      "linear-gradient(45deg, var(--mantine-color-primary-6), var(--mantine-color-primary-4))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {user?.email || "user@example.com"}
                </Text>

                <Badge
                  size="sm"
                  radius="xl"
                  variant="light"
                  color="primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  {role || "Customer"}
                </Badge>
              </Stack>
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>


        <Menu.Divider />

        {/* <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
          Logout
        </Menu.Item> */}
        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          component={Link}
          to="/logout"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavMenu;
