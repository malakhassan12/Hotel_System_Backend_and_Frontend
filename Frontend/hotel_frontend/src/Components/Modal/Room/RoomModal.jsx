import {
  Modal,
  Group,
  Text,
  Stack,
  Badge,
  Paper,
  Grid,
  Image,
  Divider,
  ThemeIcon,
  ScrollArea,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import {
  IconBed,
  IconUsers,
  IconWifi,
  IconAirConditioning,
  IconParking,
  IconCoffee,
  IconDeviceTv,
  IconBath,
  IconBeach,
  IconDoor,
  IconGlass,
  IconEye,
  IconCurrencyDollar,
  IconMaximize,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react";
import getStatusConfigRoom from "../../../Utils/Room/getStatusConfigRoom";
import NoData from "../../Empty/NoData";
import Loading from "../../Loader/Loading";

const RoomModal = ({ opened, close, room = {} }) => {
  console.log("Room data:", room);

  // Build amenities from room data
  const getAmenities = (room) => {
    const amenities = [];
    if (room?.wifi) amenities.push({ name: "Free WiFi", icon: IconWifi });
    if (room?.smartTv) amenities.push({ name: "Smart TV", icon: IconDeviceTv });
    if (room?.miniBar) amenities.push({ name: "Mini Bar", icon: IconCoffee });
    if (room?.oceanView)
      amenities.push({ name: "Ocean View", icon: IconBeach });
    if (room?.balcony)
      amenities.push({ name: "Private Balcony", icon: IconDoor });
    if (room?.kingBed) amenities.push({ name: "King Bed", icon: IconBed });
    return amenities;
  };

  // Get image URL
  const getImageUrl = (images) => {
    if (!images || images.length === 0) return null;
    return images[0]?.imageUrl || images[0]?.imagePath || null;
  };

  const statusBadge = room
    ? getStatusConfigRoom(room?.status)
    : { label: "Unknown", color: "gray" };
  const amenities = room ? getAmenities(room) : [];
  const mainImage = room ? getImageUrl(room.images) : null;
  const defaultImage =
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop";

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Group gap="sm">
          <Text size="lg" fw={700}>
            Room Details
          </Text>
          <Badge size="lg" radius="xl" color="primary" variant="light">
            Room #{room?.roomNumber}
          </Badge>
        </Group>
      }
      size="lg"
      centered
      transitionProps={{ transition: "fade", duration: 300 }}
    >
      <Stack gap="md" pr="md">
        {/* Room Image */}
        {mainImage && (
          <Image
            src={mainImage}
            height={250}
            alt={`Room ${room.roomNumber}`}
            radius="md"
            fallbackSrc={defaultImage}
            style={{ objectFit: "cover" }}
          />
        )}

        {/* Status Badge */}
        <Badge
          size="xl"
          radius="md"
          color={statusBadge.color}
          variant="filled"
          fullWidth
          style={{ textAlign: "center", padding: "10px" }}
        >
          {statusBadge?.label}
        </Badge>

        {/* Room Basic Info */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Room Information
          </Text>
          <Grid gutter="md">
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconBed size={16} color="var(--mantine-color-primary-6)" />
                <Text size="xs" c="dimmed">
                  Room Type
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {room?.roomType || "Standard"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconUsers size={16} color="var(--mantine-color-primary-6)" />
                <Text size="xs" c="dimmed">
                  Max Guests
                </Text>
              </Group>
              <Text size="sm">{room?.maxNumberOfUsers || 2} Guests</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconCurrencyDollar
                  size={16}
                  color="var(--mantine-color-primary-6)"
                />
                <Text size="xs" c="dimmed">
                  Price per Night
                </Text>
              </Group>
              <Text size="sm" fw={700} c="primary">
                ${room?.pricePerNight}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconEye size={16} color="var(--mantine-color-primary-6)" />
                <Text size="xs" c="dimmed">
                  Status
                </Text>
              </Group>
              <Badge
                size="sm"
                radius="xl"
                color={statusBadge?.color}
                variant="light"
              >
                {statusBadge?.label}
              </Badge>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Description */}
        {room?.description && (
          <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
            <Text size="sm" fw={600} mb="md" c="primary">
              Description
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              {room?.description}
            </Text>
          </Paper>
        )}

        {/* Amenities */}
        {amenities?.length > 0 && (
          <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
            <Text size="sm" fw={600} mb="md" c="primary">
              Amenities & Features
            </Text>
            <Group gap="sm">
              {amenities?.map((amenity, i) => {
                const Icon = amenity.icon;
                return (
                  <Badge
                    key={i}
                    size="lg"
                    radius="xl"
                    variant="light"
                    color="primary"
                    leftSection={<Icon size={14} />}
                  >
                    {amenity.name}
                  </Badge>
                );
              })}
            </Group>
          </Paper>
        )}

        {/* Additional Images */}
        {room?.images && room?.images?.length > 1 && (
          <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
            <Text size="sm" fw={600} mb="md" c="primary">
              More Photos
            </Text>
            <Group gap="sm">
              {room.images.slice(1, 4).map((img, i) => (
                <Image
                  key={i}
                  src={img.imageUrl || img.imagePath}
                  height={80}
                  width={100}
                  radius="md"
                  style={{ cursor: "pointer", objectFit: "cover" }}
                  fallbackSrc={defaultImage}
                />
              ))}
            </Group>
          </Paper>
        )}

        {/* Booking Status if booked */}
        {room?.status === "Booked" && room?.bookingId > 0 && (
          <Paper
            withBorder
            p="md"
            radius="md"
            bg="var(--mantine-color-orange-0)"
          >
            <Group gap="sm">
              <IconAlertCircle
                size={20}
                color="var(--mantine-color-orange-6)"
              />
              <div>
                <Text size="sm" fw={600} c="orange">
                  Currently Booked
                </Text>
                <Text size="xs" c="dimmed">
                  This room is currently booked for booking #{room.bookingId}
                </Text>
              </div>
            </Group>
          </Paper>
        )}

        {/* Room ID Footer */}
        <Divider />
        <Text size="xs" c="dimmed" ta="center">
          Room ID: {room?.id}
        </Text>
      </Stack>
    </Modal>
  );
};

export default RoomModal;
