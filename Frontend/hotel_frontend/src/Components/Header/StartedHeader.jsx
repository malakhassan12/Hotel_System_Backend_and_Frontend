// ******************************** Mantline UI ********************************

import { AppShell, Burger, Button, Group } from "@mantine/core";
// ******************************** Components ********************************

import Logo from "../Logo/Logo";
import ThemeToggle from "../Buttons/ThemeToggle";
import { useNavigate } from "react-router-dom";

const StartedHeader = ({ opened, toggle }) => {
  const navigate = useNavigate();

  const Buttons = () => {
    return (
      <Group gap="sm">
        <Button variant="default" onClick={() => navigate("/login")}>
          Sign in
        </Button>
        <Button variant="light" onClick={() => navigate("/register")}>
          Sign up
        </Button>
        <ThemeToggle />
      </Group>
    );
  };

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Logo />
          </Group>
          <Group visibleFrom="sm">{Buttons()} </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px="md" hiddenFrom="sm">
        {Buttons()}
      </AppShell.Navbar>
    </>
  );
};

export default StartedHeader;
