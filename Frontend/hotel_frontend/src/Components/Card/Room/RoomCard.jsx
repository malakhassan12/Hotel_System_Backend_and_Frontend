import React, { useState } from "react";
// ******************************** Mantline UI ********************************
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Image,
  Stack,
  Rating,
  ActionIcon,
  Menu,
  Divider,
} from "@mantine/core";
// ******************************** ICons ********************************
import {
  IconHeart,
  IconHeartFilled,
  IconUsers,
  IconCheck,
  IconTools,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
// import useFavoritesStore from "../../../Store/favoritesStore";
import { useNavigate, useLocation } from "react-router-dom";
import { roles, roomStatus } from "../../../Constants/ConstantsFromBack";
import useRoomMutations from "../../../Hooks/Room/useRoomMutations";
import getStatusConfigRoom from "../../../Utils/Room/getStatusConfigRoom";
import WishListBtn from "../../Buttons/WishListBtn";
import useGetImagesByRoom from "../../../Hooks/Room/useGetImagesByRoom";

const RoomCard = ({ item, role = "CUSTOMER" }) => {
  const navigate = useNavigate();

  console.log("object", item);

  const { data: res = [] } = useGetImagesByRoom(item?.id);

  const images = Array.isArray(res) ? res : [];
  console.log(images);

  const roleNavigate =
    role == "EMPLOYEE"
      ? "receptionist"
      : role == "ADMIN"
        ? "admin"
        : "customer";
  console.log(item.status);
  const [currentStatus, setCurrentStatus] = useState(
    item.status || "Available",
  );

  const { updateRoomStatusMutation } = useRoomMutations();

  // const { addToFavorites, removeFromFavorites, isFavorite } =
  //   useFavoritesStore();

  // const liked = isFavorite(item.id);

  const defaultImage =
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=250&fit=crop";

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);

    console.log(item.id, newStatus);

    updateRoomStatusMutation.mutate({
      roomId: item.id,
      status: newStatus,
    });

    // Here you can add API call to update room status
    console.log(`Room ${item.id} status changed to ${newStatus}`);
  };

  const location = useLocation();
  const Favorite = location.pathname.endsWith("/favourites");

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-sm)";
      }}
    >
      <Card.Section>
        <Image
          src={images[0] || defaultImage}
          height={200}
          alt={item.title}
          fallbackSrc="https://placehold.co/400x250?text=Room+Image"
        />
      </Card.Section>

      <Badge
        size="sm"
        radius="xl"
        color={getStatusConfigRoom(item.status).color || "gray"}
        variant="light"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          backdropFilter: "blur(4px)",
        }}
      >
        {currentStatus}
      </Badge>

      <Stack gap="sm" mt="md">
        <Group justify="space-between" align="center">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              Room {item.roomNumber || item.category || "Deluxe"}
            </Text>
            <Text size="lg" fw={700}>
              {item.title}
            </Text>
          </div>
          <div style={{ textAlign: "right" }}>
            <Text size="xl" fw={700} c="primary">
              {item.price}
            </Text>
            <Text size="xs" c="dimmed">
              per night
            </Text>
          </div>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {item.description}
        </Text>

        <Group justify="space-between">
          <Group gap="xs">
            <IconUsers size={14} />
            <Text size="xs" c="dimmed">
              {item.guests} {item.guests === 1 ? "Guest" : "Guests"}
            </Text>
          </Group>
        </Group>

        <Group gap="sm" wrap="wrap">
          {item.features?.map((feature, i) => (
            <Badge key={i} size="sm" variant="light" color="gray" radius="xl">
              {feature}
            </Badge>
          ))}
        </Group>

        <Divider />

        <Group justify="space-between" mt="sm">
          <Button
            // component={Link}
            // to={Favorite ? `/customer/${item.id}` : `${item.id}`}
            variant="light"
            color="primary"
            size="sm"
            onClick={() => navigate(`/${roleNavigate}/rooms/${item.id}`)}
          >
            View Details
          </Button>

          {role === roles[2] || role === roles[0] ? (
            // Receptionist: Update Status Button with Menu
            <Menu shadow="md" width={150} position="bottom-end">
              <Menu.Target>
                <Button
                  variant="filled"
                  color={getStatusConfigRoom(item.status).color}
                  size="sm"
                >
                  Update Status
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Change Status</Menu.Label>
                {roomStatus.map((status) => (
                  <Menu.Item
                    key={status}
                    color={getStatusConfigRoom(status).color}
                    onClick={() => handleStatusChange(status)}
                    leftSection={React.createElement(
                      getStatusConfigRoom(status).icon,
                      {
                        size: 16,
                      },
                    )}
                  >
                    {status}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            // Customer: Book Now Button with Love Icon
            <Group gap="xs">
              <WishListBtn room={item} />
              <Button
                onClick={() => navigate(`/customer/rooms/book-room/${item.id}`)}
                variant="filled"
                size="sm"
                color="primary"
                disabled={item.status !== roomStatus[0]}
              >
                {item.status === roomStatus[0] ? "Book Now" : "Not Available"}
              </Button>
            </Group>
          )}
        </Group>
      </Stack>
    </Card>
  );
};

export default RoomCard;
