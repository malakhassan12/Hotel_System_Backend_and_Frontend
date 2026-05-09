import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Loader, Text, Stack } from "@mantine/core";
import useAuthStore from "../../../Store/authStore";

const Logout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    
    logout();

    
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800);

    return () => clearTimeout(timer);
  }, [logout, navigate]);   

 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Center mih="100vh" bg="gray.0">
      <Stack align="center" gap="md">
        <Loader size="lg" color="dark" />
        <Text size="lg" fw={500}>
          Signing you out...
        </Text>
        <Text size="sm" c="dimmed">
          Please wait while we securely log you out
        </Text>
      </Stack>
    </Center>
  );
};

export default Logout;