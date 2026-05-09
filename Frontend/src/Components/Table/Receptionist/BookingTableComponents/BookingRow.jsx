// ******************************** Mantline UI ********************************
import {
  Table,
  Text,
  Badge,
  ActionIcon,
  Group,
  Box,
  ScrollArea,
  Avatar,
  Loader,
  Center,
  Flex,
} from "@mantine/core";
// ******************************** Icons ********************************
import {
  IconEye,
  IconCheck,
  IconX,
  IconDotsVertical,
} from "@tabler/icons-react";

import React from "react";
import BookingModal from "../../../Modal/Booking/BookingModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import useBookingMutations from "../../../../Hooks/Employee/useBookingMutations";

const BookingRow = ({ row }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [_, setSelectedBooking] = useState(null);

  const { acceptBookingMutation, rejectBookingMutation } =
    useBookingMutations();
  console.log("row", row);

  // Handle view booking details
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking.rawData);
    open();
  };

  // Handle confirm booking
  const handleConfirmBooking = async (booking) => {
    acceptBookingMutation.mutate(booking?.id);
  };

  // Handle cancel booking
  const handleCancelBooking = async (booking) => {
    rejectBookingMutation.mutate(booking?.id);
  };

  return (
    <>
      <BookingModal opened={opened} close={close} booking={row} />
      <Table.Tr key={row.id}>
        <Table.Td>
          <Text size="sm" fw={500}>
            {row.id}
          </Text>
        </Table.Td>
        <Table.Td>
          <Group gap="md">
            <Avatar size="sm" radius="xl" color="primary">
              {row.customer?.username?.charAt(0) || "?"}
            </Avatar>
            <Text size="sm">{row.customer?.username}</Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{row?.room?.roomNumber}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{row.checkIn}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{row.checkOut}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{row.guests}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={600}>
            {row.total}
          </Text>
        </Table.Td>
        <Table.Td>
          <Badge size="sm" radius="xl" color={row.paymentColor} variant="light">
            {row.payment}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Badge size="sm" radius="xl" color={row.statusColor}>
            {row.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <ActionIcon
              size="sm"
              variant="light"
              color="blue"
              onClick={() => handleViewBooking(row)}
            >
              <IconEye size={16} />
            </ActionIcon>
            {row?.status == "pending" && (
              <Flex
                mih={50}
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="green"
                  onClick={() => handleConfirmBooking(row)}
                >
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="red"
                  onClick={() => handleCancelBooking(row)}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Flex>
            )}
          </Group>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default BookingRow;
