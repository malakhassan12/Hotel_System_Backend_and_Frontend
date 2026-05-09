// ******************************** Mantline UI ********************************
import {
  Box,
  Grid,
  Space,
  Image,
  Text,
  Title,
  Group,
  Badge,
  Button,
  Stack,
  Divider,
  Rating,
  ThemeIcon,
  List,
  Paper,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackBtn from "../../Components/Buttons/BackBtn";
import {
  IconBed,
  IconUsers,
  IconCheck,
  IconMapPin,
  IconClock,
  IconWifi,
  IconDeviceTv,
  IconBeach,
  IconGlass,
  IconDoor,
  IconStar,
} from "@tabler/icons-react";
import useAuthStore from "../../Store/authStore";
import useGetRoom from "../../Hooks/Room/useGetRoom";
import { roles, roomStatus } from "../../Constants/ConstantsFromBack";
import { mapRoomData } from "../../Functions/Room/RoomFunctions";
import Loading from "../../Components/Loader/Loading";
import NoData from "../../Components/Empty/NoData";
import ReviewCard from "../../Components/Card/Review/ReviewCard";
import useGetImagesByRoom from "../../Hooks/Room/useGetImagesByRoom";
import WishListBtn from "../../Components/Buttons/WishListBtn";

const RoomDetails = () => {
  const { roomId } = useParams();
  const { data: apiRoom, isLoading, error } = useGetRoom(roomId);
  const { role } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: images = [] } = useGetImagesByRoom(roomId);

  console.log(images);
  // Map API data to display format

  const room = mapRoomData(apiRoom);

  if (isLoading) {
    return <Loading name={"Room"} />;
  }

  if (error) {
    return <Error name={"Room"} error={error} />;
  }

  if (!room) {
    return <NoData name={"Room"} />;
  }

  return (
    <div>
      <Space h="md" />
      <Box>
        <BackBtn />
      </Box>
      <Space h="md" />

      <Box>
        <Grid gutter="xl">
          <Grid.Col
            span={
              role === roles[2] || role === roles[0]
                ? { base: 12 }
                : { base: 12, lg: 8 }
            }
          >
            <Stack gap="xl">
              {/* Header with Category and Rating */}
              <div>
                <Group gap="sm" mb={4}>
                  <Badge size="lg" radius="xl" color="primary" variant="light">
                    {room.category}
                  </Badge>
                </Group>
                <Title order={3} fw={"bold"}>
                  {room.title}
                </Title>
              </div>

              {/* Image Gallery */}
              <Paper withBorder radius="md" p="sm">
              
                {room.images.length > 1 && (
                  <Group mt="sm" gap="sm">
                    {images?.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        height={80}
                        width={100}
                        radius="md"
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          border:
                            selectedImage === i
                              ? "2px solid var(--mantine-color-primary-6)"
                              : "none",
                          opacity: selectedImage === i ? 1 : 0.7,
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => setSelectedImage(i)}
                      />
                    ))}
                  </Group>
                )}
              </Paper>

              {/* Description */}
              <div>
                <Title order={3} mb="sm">
                  Description
                </Title>
                <Text size="md" c="dimmed" lh={1.6}>
                  {room.description}
                </Text>
              </div>

              <Divider />

              {/* Room Features */}
              <div>
                <Title order={3} mb="md">
                  Room Features
                </Title>
                <Grid>
                  {room.features.map((feature, i) => (
                    <Grid.Col key={i} span={6}>
                      <Group gap="xs">
                        {feature === "Ocean View" && (
                          <IconBeach
                            size={16}
                            color="var(--mantine-color-primary-6)"
                          />
                        )}
                        {feature === "King Bed" && (
                          <IconBed
                            size={16}
                            color="var(--mantine-color-primary-6)"
                          />
                        )}
                        {feature === "Balcony" && (
                          <IconDoor
                            size={16}
                            color="var(--mantine-color-primary-6)"
                          />
                        )}
                        {feature === "Mini Bar" && (
                          <IconGlass
                            size={16}
                            color="var(--mantine-color-primary-6)"
                          />
                        )}
                        {feature === "Free WiFi" && (
                          <IconWifi
                            size={16}
                            color="var(--mantine-color-primary-6)"
                          />
                        )}
                        {feature === "Smart TV" && (
                          <IconDeviceTv
                            size={16}
                            color="var(--mantine-color-primary-6)"
                          />
                        )}
                        {!feature.includes("Ocean") &&
                          !feature.includes("King") &&
                          !feature.includes("Balcony") &&
                          !feature.includes("Mini") &&
                          !feature.includes("WiFi") &&
                          !feature.includes("Smart") && (
                            <IconBed
                              size={16}
                              color="var(--mantine-color-primary-6)"
                            />
                          )}
                        <Text size="sm">{feature}</Text>
                      </Group>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>

              <Divider />

              {/* Guest Info */}
              <Group justify="space-between" wrap="wrap">
                <Group gap="xs">
                  <ThemeIcon
                    size="md"
                    radius="xl"
                    variant="light"
                    color="primary"
                  >
                    <IconUsers size={16} />
                  </ThemeIcon>
                  <Text size="sm" fw={500}>
                    Max {room.maxGuests} Guests
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={16} />
                  <Text size="sm" c="dimmed">
                    Check-in: 2:00 PM | Check-out: 12:00 PM
                  </Text>
                </Group>
              </Group>

              <Divider />

              {/* Amenities List */}
              <div>
                <Title order={4} mb="md">
                  Amenities
                </Title>
                <List
                  spacing="sm"
                  size="sm"
                  icon={
                    <ThemeIcon color="green" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  {room.amenities.map((amenity, i) => (
                    <List.Item key={i}>{amenity}</List.Item>
                  ))}
                </List>
              </div>

              <Divider />

              <ReviewCard roomId={roomId} />
              {/* ========== END REVIEWS SECTION ========== */}
            </Stack>
          </Grid.Col>

          {/* Booking Sidebar - Hidden for Receptionist */}
          <Grid.Col
            span={{ base: 12, lg: 4 }}
            style={{
              display:
                role === roles[2] || role === roles[0] ? "none" : "block",
            }}
          >
            <Box
              style={{
                position: "sticky",
                top: 80,
                alignSelf: "start",
              }}
            >
              <Paper
                withBorder
                p="xl"
                radius="lg"
                shadow="md"
                bg="var(--mantine-color-body)"
              >
                <Stack gap="lg">
                  {/* Status Badge */}
                  <Badge
                    size="xl"
                    radius="xl"
                    color={room.statusColor}
                    variant="light"
                    fullWidth
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    {room.statusLabel}
                  </Badge>

                  {/* Book This Room */}
                  <div>
                    <Title order={3} mb={4}>
                      Book This Room
                    </Title>
                    <Text size="sm" c="dimmed">
                      Reserve your perfect stay
                    </Text>
                  </div>

                  <Divider />

                  {/* Price */}
                  <Group justify="space-between" align="center">
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase">
                        Price per night
                      </Text>
                      <Text size="2rem" fw={700} c="primary">
                        {room.price}
                      </Text>
                    </div>
                    <Badge
                      size="lg"
                      radius="xl"
                      color={room.statusColor}
                      variant="light"
                    >
                      {room.statusLabel}
                    </Badge>
                  </Group>

                  {/* Book Now Button */}
                  <Button
                    component={Link}
                    to={`/customer/rooms/book-room/${room.id}`}
                    variant="light"
                    color="primary"
                    size="sm"
                    disabled={room.status !== roomStatus[0]}
                  >
                    {room.status === roomStatus[0]
                      ? "Book Now"
                      : "Not Available"}
                  </Button>

                  {/* Cancellation Policy */}
                  <Group gap="xs" justify="center">
                    <IconClock size={14} />
                    <Text size="xs" c="dimmed">
                      Free cancellation within 24 hours
                    </Text>
                  </Group>

                  <Divider />

                  {/* Amenities Short List */}
                  <Stack gap="xs">
                    {room.amenities.slice(0, 4).map((amenity, i) => (
                      <Group key={i} gap="xs">
                        <IconCheck
                          size={14}
                          color="var(--mantine-color-green-6)"
                        />
                        <Text size="sm" c="dimmed">
                          {amenity}
                        </Text>
                      </Group>
                    ))}
                  </Stack>

                  <WishListBtn room={room} />
                </Stack>
              </Paper>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  );
};

export default RoomDetails;
