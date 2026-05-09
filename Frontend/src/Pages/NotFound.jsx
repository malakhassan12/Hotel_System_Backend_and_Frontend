import { Container, Title, Text, Button, Stack, Group, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconHome, IconArrowLeft } from "@tabler/icons-react";
import useAuthStore from "../Store/authStore";

const NotFound = () => {
  const navigate = useNavigate();

const { role } = useAuthStore();

const roomsPath =
  role === "admin"
    ? "/admin/rooms"
    : role === "receptionist"
    ? "/receptionist/rooms"
    : "/customer";
  return (
    <Box bg="gray.0" mih="100vh" py={80}>
      <Container size="md">
        <Stack align="center" justify="center" mih="70vh" gap="xl" ta="center">
          
        
          <Box>
            <Title 
              order={1} 
              size={180} 
              fw={900} 
              c="gray.3"
              style={{ lineHeight: 1 }}
            >
              404
            </Title>
          </Box>

          {/* Message */}
          <Stack gap="xs">
            <Title order={2} fw={700}>
              Page Not Found
            </Title>
            <Text size="lg" c="dimmed" maw={460}>
              Oops! The page you're looking for doesn't exist or has been moved.
            </Text>
          </Stack>

         
          <Group gap="md" mt="xl">
            <Button
              size="lg"
              radius="md"
              leftSection={<IconHome size={20} />}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>

            <Button
              size="lg"
              radius="md"
              variant="outline"
              leftSection={<IconArrowLeft size={20} />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Group>

         
          <Text size="sm" c="dimmed" mt={40}>
            Looking for something else? Try these:
          </Text>
          
          <Group gap="lg" mt="xs">
            <Text 
              component="a" 
              href={roomsPath}
              c="blue.6" 
              td="underline"
              style={{ cursor: "pointer" }}
            >
              Browse Rooms
            </Text>
            <Text 
              component="a" 
              href="/login"
              c="blue.6" 
              td="underline"
              style={{ cursor: "pointer" }}
            >
              Login
            </Text>
            <Text 
              component="a" 
              href="/register"
              c="blue.6" 
              td="underline"
              style={{ cursor: "pointer" }}
            >
              Create Account
            </Text>
          </Group>

        </Stack>
      </Container>
    </Box>
  );
};

export default NotFound;