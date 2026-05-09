// ******************************** Mantine UI ********************************
import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  Indicator,
  Box,
  Divider,
} from "@mantine/core";

// ******************************** Icons ********************************
import { IconBell } from "@tabler/icons-react";
// ******************************** Components ********************************
import ThemeToggle from "../Buttons/ThemeToggle";
import Logo from "../Logo/Logo";
import NavMenu from "../Menu/NavMenu";

// ******************************** Screens ********************************

import Screens from "../../Utils/Screens/Screens";
import { Link } from "react-router-dom";

const GeneralHeader = ({
  mobileOpened,
  toggleMobile,
  desktopOpened,
  toggleDesktop,
}) => {
  const { isMobile } = Screens();

  return (
    <AppShell.Header
      style={{
        backgroundColor:
          "light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))",
        borderBottom:
          "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
        boxShadow: "0 1px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group gap="xs" wrap="nowrap">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
            style={{
              transition: "all 0.2s ease",
            }}
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
            style={{
              transition: "all 0.2s ease",
            }}
          />

          <Divider orientation="vertical" mx={4} visibleFrom="sm" />

          {!isMobile && <Logo />}
        </Group>

        <Group gap="sm" wrap="nowrap">
          {/* Theme Toggle Button */}
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeToggle />
          </Box>

          {/* Notifications Button with Indicator */}
          <UnstyledButton
            component={Link}
            to="notifications"
            style={{
              padding: "8px",
              borderRadius: "50%",
              transition: "all 0.2s ease",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor:
                  "light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))",
              },
            }}
          >
            <Indicator color="red" size={10} processing offset={5} withBorder>
              <IconBell
                size={20}
                style={{
                  color:
                    "light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))",
                }}
              />
            </Indicator>
          </UnstyledButton>

          {/* User Menu Button */}
          <NavMenu />
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default GeneralHeader;
