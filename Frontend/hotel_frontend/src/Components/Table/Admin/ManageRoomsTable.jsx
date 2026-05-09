import React, { useState } from "react";
// ******************************** Mantline UI ********************************

import {
  Table,
  Badge,
  ActionIcon,
  Group,
  Text,
  Avatar,
  ScrollArea,
  Box,
  Card,
  SimpleGrid,
  Pagination,
  Space,
  Center,
} from "@mantine/core";

// ******************************** Icons ********************************

import { IconPencil, IconTrash } from "@tabler/icons-react";
// ******************************** Utils ********************************

import Screens from "../../../Utils/Screens/Screens";
// ******************************** Components ********************************

import ManageRoomModal from "../../Modal/Room/ManageRoomModal";
import DeleteRoom from "../../Modal/Room/DeleteRoom";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";
import ManageRoomsRow from "./ManageRoomsTableComponents/ManageRoomsRow";
import useSearchRoomStore from "../../../Store/useSearchRoomStore";
import NoData from "../../Empty/NoData";

// Status color mapping without conditionals
const STATUS_COLOR_MAP = {
  AVAILABLE: "green",
  BOOKED: "orange",
  UNAVAILABLE: "gray",
};

// Default status color for any other status
const DEFAULT_STATUS_COLOR = "gray";

// Helper function to get status color without if statements
const getStatusColor = (status) =>
  STATUS_COLOR_MAP[status] || DEFAULT_STATUS_COLOR;

// Helper function to get room description without conditionals
const getRoomDescription = (room) => {
  const features = [];
  if (room.oceanView) features.push("🌊 Ocean View");
  if (room.balcony) features.push("🏠 Balcony");
  if (room.miniBar) features.push("🍷 Mini Bar");
  if (room.wifi) features.push("📶 WiFi");
  if (room.smartTv) features.push("📺 Smart TV");
  if (room.kingBed) features.push("👑 King Bed");

  return features.length > 0 ? features.join(" • ") : room.description;
};

// Helper to get room image (first image or default)
const getRoomImage = (room) => {
  const hasImages = room.images && room.images.length > 0;
  return hasImages
    ? room.images[0].imageUrl
    : "https://via.placeholder.com/400?text=No+Image";
};

const ManageRoomsTable = () => {
  const { data: apiData } = useGetAllRooms();

  const safeBookings = Array.isArray(apiData) ? apiData : [];

  const { searchQuery, availability } = useSearchRoomStore();

  const rooms = safeBookings || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this to adjust items per page

  const filteredRooms = rooms.filter((room) => {
    const searchLower = searchQuery.toLowerCase();

    const roomNumStr = room?.roomNumber?.toString() || "";

    const matchesSearch =
      room?.roomType?.toLowerCase().includes(searchLower) ||
      room?.description?.toLowerCase().includes(searchLower) ||
      roomNumStr.includes(searchQuery);

    const matchesAvailability =
      availability === "all" || room.status === availability;

    return matchesSearch && matchesAvailability;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, availability]);

  // Process the actual data from API
  const { isMobile } = Screens();

  return (
    <>
      {isMobile ? (
        <>
          <SimpleGrid cols={1}>
            {paginatedRooms.length === 0 ? (
              <NoData name={"Filtered Results"} />
            ) : (
              <>
                {paginatedRooms.map((room) => (
                  <Card key={room.id} withBorder padding="md">
                    <Group align="flex-start">
                      <Avatar src={getRoomImage(room)} size="xl" radius="md" />

                      <Box style={{ flex: 1 }}>
                        <Text fw={600} size="lg">
                          Room {room.roomNumber}
                        </Text>
                        <Text size="xs" c="dimmed" mb="xs">
                          {getRoomDescription(room)}
                        </Text>

                        <Group justify="space-between" mt="sm">
                          <Box>
                            <Text size="xs" c="dimmed">
                              Price per night
                            </Text>
                            <Text fw={700} size="lg" c="blue">
                              ${room.pricePerNight}
                            </Text>
                          </Box>
                          <Badge
                            color={getStatusColor(room.status)}
                            variant="filled"
                          >
                            {room.status}
                          </Badge>
                        </Group>

                        <Group justify="space-between" mt="xs">
                          <Box>
                            <Text size="xs" c="dimmed">
                              Max Guests
                            </Text>
                            <Text size="sm" fw={500}>
                              {room.maxNumberOfUsers}
                            </Text>
                          </Box>
                          <Box>
                            <Text size="xs" c="dimmed">
                              Room Type
                            </Text>
                            <Text size="sm" fw={500}>
                              {room.roomType}
                            </Text>
                          </Box>
                        </Group>
                      </Box>

                      <Group gap={5}>
                        <ActionIcon
                          variant="subtle"
                          onClick={() => {
                            // Handle edit
                            console.log("Edit room:", room.id);
                          }}
                        >
                          <IconPencil size={18} />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          variant="light"
                          onClick={() => {
                            // Handle delete
                            console.log("Delete room:", room.id);
                          }}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Card>
                ))}
              </>
            )}
          </SimpleGrid>

          {/* Pagination for Mobile */}
          {totalPages > 1 && (
            <>
              <Space h="lg" />
              <Center>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                  color="primary"
                  radius="md"
                  withEdges
                  size="sm"
                />
              </Center>
              <Center mt="xs">
                <Text size="xs" c="dimmed">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredRooms.length)}{" "}
                  of {filteredRooms.length} rooms
                </Text>
              </Center>
            </>
          )}

          {/* Show total count even without pagination */}
          {filteredRooms.length > 0 && totalPages <= 1 && (
            <Center mt="md">
              <Text size="xs" c="dimmed">
                Total {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""}
              </Text>
            </Center>
          )}
        </>
      ) : (
        <>
          <ScrollArea>
            <Table highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Room</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Price/Night</Table.Th>
                  <Table.Th>Max Guests</Table.Th>
                  <Table.Th>Amenities</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {paginatedRooms.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <NoData name="Filtered Results" />
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  paginatedRooms.map((room) => (
                    <ManageRoomsRow key={room.id} room={room} />
                  ))
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>

          {/* Pagination for Desktop */}
          {totalPages > 1 && (
            <>
              <Space h="lg" />
              <Center>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                  color="primary"
                  radius="md"
                  withEdges
                  size="md"
                />
              </Center>
              <Center mt="xs">
                <Text size="xs" c="dimmed">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredRooms.length)}{" "}
                  of {filteredRooms.length} rooms
                </Text>
              </Center>
            </>
          )}

          {/* Show total count even without pagination */}
          {filteredRooms.length > 0 && totalPages <= 1 && (
            <Center mt="md">
              <Text size="xs" c="dimmed">
                Total {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""}
              </Text>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default ManageRoomsTable;