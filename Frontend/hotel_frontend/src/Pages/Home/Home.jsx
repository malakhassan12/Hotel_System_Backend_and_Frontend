import { lazy } from "react";

// ******************************** Mantline UI ********************************

import { useDisclosure } from "@mantine/hooks";

import {
  AppShell,
  Box,
  Container,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Space,
  Flex,
} from "@mantine/core";
// ******************************** Components ********************************

const StartedHeader = lazy(
  () => import("../../Components/Header/StartedHeader"),
);
const HomeCard = lazy(() => import("../../Components/Card/HomeCard"));
const Footer = lazy(() => import("../../Components/Footer/Footer"));

// ******************************** Constants ********************************

import { cardsData } from "../../Constants/HomeConstants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [opened, { toggle }] = useDisclosure();

  const navigate = useNavigate();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <StartedHeader toggle={toggle} opened={opened} />

      <AppShell.Main>
        <Container size="lg" py={80}>
          <div data-aos="fade-down">
            <Stack align="center" gap="xl">
              {/* Title Section */}
              <Box
                ta="center"
                bg={"gold.2"}
                bdrs={"xl"}
                style={{ padding: ".29rem" }}
              >
                <Title order={6} c="gold.6">
                  Professional Hotel Management System
                </Title>
              </Box>

              {/* Subtitle Section */}
              <Box ta="center" maw={700} mx="auto">
                <Title
                  order={2}
                  fw={700}
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Manage Your Hotel with Ease
                </Title>

                <Text
                  size="lg"
                  c="dimmed"
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                    lineHeight: 1.6,
                  }}
                >
                  A comprehensive hotel management solution with role-based
                  access for customers, receptionists, and administrators.
                  Streamline bookings, manage rooms, and track everything in one
                  place.
                </Text>
              </Box>

              {/* Buttons Section */}
              <Group gap="md" mt="xl">
                <Button
                  size="sm"
                  radius="md"
                  variant="filled"
                  style={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Get Started →
                </Button>

                <Button variant="outline">View Demo</Button>
              </Group>
            </Stack>
          </div>
          <Space h="50vh" />

          <div data-aos="fade-down">
            {/* Subtitle Section */}
            <Box ta="center" maw={700} mx="auto">
              <Title
                order={2}
                fw={700}
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  marginBottom: "1.5rem",
                }}
              >
                Three Powerful Portals{" "}
              </Title>

              <Text
                size="lg"
                c="dimmed"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  lineHeight: 1.6,
                }}
              >
                Designed for different roles to manage hotel operations
                efficiently
              </Text>
            </Box>
            <Space h="xl" />

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: "sm", sm: "lg" }}
              justify={{ sm: "center" }}
            >
              {cardsData.map((card, index) => (
                <HomeCard key={index} item={card} />
              ))}
            </Flex>
          </div>

          <Space h="50vh" />
          <div data-aos="fade-down">
            <Footer />
          </div>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default Home;
