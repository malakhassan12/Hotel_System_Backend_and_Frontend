import { Center, Paper, Box, Text, Title } from "@mantine/core";
import { lazy, Suspense } from "react";

const Logo = lazy(() => import("../../Logo/Logo"));   

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <Center mih="100vh" bg="gray.0">
      <Paper
        shadow="md"
        radius="lg"
        p={{ base: 20, sm: 40 }}
        w={{ base: "95%", sm: 420 }}
        maw={420}
        style={{ overflow: "hidden" }}
      >
        <Suspense fallback={<div style={{ height: 80 }} />}>
        <Center>
          <Logo />
        </Center>
        </Suspense>

        <Title order={2} ta="center" mt="xl" fw={700}>
          {title}
        </Title>
        <Text ta="center" c="dimmed" mt="xs" size="lg">
          {subtitle}
        </Text>

        {children}
      </Paper>
    </Center>
  );
};

export default AuthCard;