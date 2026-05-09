import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  ActionIcon,
  Tooltip,
  Box,
  Divider,
  Modal,
} from "@mantine/core";
import {
  IconHeart,
  IconHeartFilled,
  IconBed,
  IconUsers,
  IconWifi,
  IconDeviceTv,
  IconCoffee,
  IconCalendarPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../Store/authStore";
import useGetAllFavourites from "../../../Hooks/Favourites/useGetAllFavourites";
import useGetRoom from "../../../Hooks/Room/useGetRoom";
import useFavouritesMutations from "../../../Hooks/Favourites/useFavouritesMutations";
import Loading from "../../Loader/Loading";

const FavoriteCard = ({ favorite,  }) => {
  const navigate = useNavigate();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  
  // Get user info
  const { user } = useAuthStore();
  
  // Fetch all favorites for the user
  const { data: allFavorites,  } = useGetAllFavourites(user?.userId);
  
  // Fetch room details using roomId from favorite
  const { data: room, isLoading, error,  } = useGetRoom(favorite.roomId);
  
  // Check if room is in wishlist
  
  // Favorite mutations
  const {  deleteItemFromFavouritesMutation } = useFavouritesMutations(favorite.roomId);

  const handleRemove = (e) => {
    e.stopPropagation();
    setDeleteModalOpened(true);
  };

  const confirmRemove = () => {
    const finalFav = Array.isArray(allFavorites) ? allFavorites : [];
    const wish = finalFav.find((item) => item.roomId === favorite.roomId);
    
    if (wish) {
      deleteItemFromFavouritesMutation.mutate(wish.id);
    }
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/customer/rooms/${favorite.roomId}`);
  };

 

  if (isLoading) {
    return (
          <Loading name="Loading room..." />
       
    );
  }

  if (error || !room) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack align="center" py="xl">
          <Text c="red" size="sm">
            Failed to load room details
          </Text>
        </Stack>
      </Card>
    );
  }



  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
       

       

        <Stack gap="xs" mt="md">
          {/* Header with Room Number and Remove Button */}
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <Text fw={700} size="lg">
                Room {room.roomNumber}
              </Text>
              <Badge size="sm" variant="light" color="blue">
                {room.roomType}
              </Badge>
            </Group>
            
            <Tooltip label="Remove from favorites">
              <ActionIcon
                color="red"
                variant="light"
                onClick={handleRemove}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>

          {/* Room Description */}
          <Text size="sm" c="dimmed" lineClamp={2}>
            {room.description || "Beautiful room with amazing amenities"}
          </Text>

          <Divider />

          {/* Room Details */}
          <Group gap="md">
            <Group gap={4}>
              <IconUsers size={16} color="#666" />
              <Text size="xs">{room.maxNumberOfUsers} Guests</Text>
            </Group>
            <Group gap={4}>
              <IconBed size={16} color="#666" />
              <Text size="xs">
                {room.kingBed ? "King Bed" : "Queen Bed"}
              </Text>
            </Group>
          </Group>

          {/* Amenities */}
          <Group gap="xs">
            {room.wifi && (
              <Badge size="sm" variant="light" leftSection={<IconWifi size={12} />}>
                WiFi
              </Badge>
            )}
            {room.smartTv && (
              <Badge size="sm" variant="light" leftSection={<IconDeviceTv size={12} />}>
                Smart TV
              </Badge>
            )}
            {room.balcony && (
              <Badge size="sm" variant="light">
                🌅 Balcony
              </Badge>
            )}
            {room.oceanView && (
              <Badge size="sm" variant="light">
                🌊 Ocean View
              </Badge>
            )}
            {room.miniBar && (
              <Badge size="sm" variant="light" leftSection={<IconCoffee size={12} />}>
                Mini Bar
              </Badge>
            )}
          </Group>

          <Divider />

          {/* Added Date and Price */}
          <Group justify="space-between" align="flex-end">
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                Added on {formatDate(favorite.addedDate)}
              </Text>
              <Text fw={700} size="xl" c="blue">
                ${room.pricePerNight}
                <Text span size="xs" c="dimmed">
                  /night
                </Text>
              </Text>
            </Stack>

            <Button
              variant="filled"
              color="primary"
              onClick={handleBookNow}
              leftSection={<IconCalendarPlus size={18} />}
            >
              Book Now
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Remove from Favorites"
        centered
        size="md"
        padding="xl"
        radius="md"
      >
        <Stack gap="lg">
          <Group gap="md">
            <IconTrash size={40} color="red" />
            <Text size="md">
              Are you sure you want to remove Room {room.roomNumber} from your favorites?
            </Text>
          </Group>
          
          <Group justify="flex-end" mt="md">
            <Button 
              variant="light" 
              onClick={() => setDeleteModalOpened(false)}
            >
              Cancel
            </Button>
            <Button 
              color="red" 
              onClick={confirmRemove}
              loading={deleteItemFromFavouritesMutation.isPending}
              leftSection={<IconTrash size={16} />}
            >
              Remove
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default FavoriteCard;