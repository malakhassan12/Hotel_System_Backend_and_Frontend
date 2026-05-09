import React from "react";
import {
  Container,
  Paper,
  Stack,
  Title,
  Text,
  ThemeIcon,
  Button,
  Box,
} from "@mantine/core";
import { IconClock, IconArrowBack } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const WaitingApproval = () => {
  const navigate = useNavigate();
  const status = location.state?.status || "pending";

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container size="xs">
        <Paper shadow="md" radius="md" p="xl" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={80} radius="xl" color="orange" variant="light">
              <IconClock size={40} />
            </ThemeIcon>

            <Title order={2} ta="center">
              You are {status}
            </Title>

            <Text c="dimmed" ta="center" size="sm">
              Your employee account is {status} approval from the administrator.
              <br />
              You will be notified once approved.
            </Text>

            <Button
              variant="light"
              color="orange"
              onClick={() => navigate("/login")}
              leftSection={<IconArrowBack size={16} />}
              fullWidth
            >
              Back to Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default WaitingApproval;
