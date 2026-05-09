import {
  Avatar,
  Group,
  Table,
  Text,
  Badge,
  ActionIcon,
  Stack,
  Tooltip,
} from "@mantine/core";
import React, { useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import ManageRoomModal from "../../../Modal/Room/ManageRoomModal";
import DeleteRoom from "../../../Modal/Room/DeleteRoom";
import { useDisclosure } from "@mantine/hooks";
import useRoomMutations from "../../../../Hooks/Room/useRoomMutations";

// Status color mapping without conditionals
const STATUS_COLOR_MAP = {
  AVAILABLE: "green",
  BOOKED: "orange",
  UNAVAILABLE: "gray",
};

const DEFAULT_STATUS_COLOR = "gray";

const getStatusColor = (status) =>
  STATUS_COLOR_MAP[status] || DEFAULT_STATUS_COLOR;

// Amenity icons mapping
const AMENITY_ICONS = {
  oceanView: "🌊",
  kingBed: "👑",
  balcony: "🏠",
  miniBar: "🍷",
  wifi: "📶",
  smartTv: "📺",
};

const getRoomImage = (room) => {
  const hasImages = room.images && room.images.length > 0;
  return hasImages
    ? room.images[0].imageUrl
    : "https://via.placeholder.com/400?text=No+Image";
};

const ManageRoomsRow = ({ room }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [roomSelected, setRoomSelected] = useState(null);
  const [mode, setMode] = useState("view");

  const { updateRoomMutation, addRoomMutation } = useRoomMutations();

  const handleSubmit = (formData) => {
    console.log(formData);
    console.log([...formData.entries()]);

    if (mode === "edit" && roomSelected?.id) {
      updateRoomMutation.mutate({ roomId: roomSelected.id, data: formData });
    } else if (mode === "create") {
      addRoomMutation.mutate(formData);
    }

    if (updateRoomMutation?.isSuccess) {
      close();
    }
    if (addRoomMutation?.isSuccess) {
      close();
    }
  };

  const isLoading = updateRoomMutation.isLoading || addRoomMutation.isLoading;

  return (
    <>
      <ManageRoomModal
        opened={opened}
        close={close}
        room={roomSelected}
        mode={mode}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <DeleteRoom
        opened={openedDelete}
        close={closeDelete}
        room={roomSelected}
      />

      <Table.Tr key={room.id}>
        <Table.Td>
          <Group>
            <Avatar src={getRoomImage(room)} size="md" radius="md" />
            <div>
              <Text fw={500}>Room {room.roomNumber}</Text>
              <Stack gap={2}>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {room.description}
                </Text>
              </Stack>
            </div>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge variant="light" size="sm">
            {room.roomType}
          </Badge>
        </Table.Td>

        <Table.Td fw={700} c="blue">
          ${room.pricePerNight}
        </Table.Td>

        <Table.Td>
          <Group gap={5}>
            <Text size="sm">{room.maxNumberOfUsers}</Text>
            <Text size="xs" c="dimmed">
              {room.maxNumberOfUsers === 1 ? "guest" : "guests"}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Group gap={5}>
            {room.oceanView && <Text>🌊</Text>}
            {room.balcony && <Text>🏠</Text>}
            {room.wifi && <Text>📶</Text>}
            {room.smartTv && <Text>📺</Text>}
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge color={getStatusColor(room.status)} variant="filled" size="md">
            {room.status}
          </Badge>
        </Table.Td>

        <Table.Td>
          <Group gap={5}>
            <Tooltip label="Edit room">
              <ActionIcon
                variant="subtle"
                onClick={() => {
                  setRoomSelected(room);
                  setMode("edit");
                  open();
                }}
              >
                <IconPencil size={18} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Delete room">
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => {
                  setRoomSelected(room);
                  openDelete();
                }}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default ManageRoomsRow;
