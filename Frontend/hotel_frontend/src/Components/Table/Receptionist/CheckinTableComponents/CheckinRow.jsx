import React, { useState } from "react";
// ******************************** Mantline UI ********************************
import {
  Table,
  Text,
  Badge,
  Group,
  Avatar,
  ActionIcon,
  Tooltip,
  Stack,
} from "@mantine/core";

// ******************************** Icons ********************************
import {
  IconEye,
  IconReceipt,
  IconDoorEnter,
  IconPhone,
  IconCalendar,
  IconUsers,
  IconDoorExit,
} from "@tabler/icons-react";

// ******************************** Components ********************************
import CustomerModal from "../../../Modal/Customer/CustomerModal";
import BookingModal from "../../../Modal/Booking/BookingModal";
import RoomModal from "../../../Modal/Room/RoomModal";
import { useDisclosure } from "@mantine/hooks";
import useBookingMutations from "../../../../Hooks/Employee/useBookingMutations";

const CheckinRow = ({ checkin }) => {
  console.log(checkin);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Extract data from mapped checkin object
  const bookingId = checkin.id;
  const customer = checkin.customer;
  const room = checkin.room;
  const checkInDate = checkin.checkIn;
  const checkOutDate = checkin.checkOut;
  const guests = checkin.guests;
  const total = checkin.total;
  const payment = checkin.payment;
  const paymentColor = checkin.paymentColor;
  const status = checkin.status;
  const statusColor = checkin.statusColor;
  const phone = checkin.phone;

  const { checkInBookingMutation ,  checkOutBookingMutation} = useBookingMutations();

  // Handle Check In action (only for ACCEPTED/PENDING status)
  const handleCheckIn = async () => {
    checkInBookingMutation.mutate(checkin?.bookingId);
  };


  const handleCheckOut = ()=>{
    checkOutBookingMutation.mutate(checkin?.bookingId);

  }

  // Handle customer click
  const handleCustomerClick = () => {
    setSelectedCustomer(checkin.customer);
    setCustomerModalOpen(true);
  };

  // Handle room click
  const handleRoomClick = () => {
    setSelectedRoom(checkin.room);
    setRoomModalOpen(true);
  };

  // Show check-in action for pending or confirmed statuses

  // Get customer name
  const customerName =
    typeof customer === "object"
      ? customer.username || `Customer ${checkin.customerId}`
      : customer;

  // Get room number
  const roomNumber =
    typeof room === "object" ? room.roomNumber || checkin.roomId : room;

  return (
    <>
      <Table.Tr style={{ transition: "all 0.2s ease" }}>
        {/* Booking ID */}
        <Table.Td>
          <Text
            size="sm"
            fw={600}
            style={{
              cursor: "pointer",
              color: "var(--mantine-color-primary-6)",
              textDecoration: "underline",
            }}
            onClick={() => {
              setSelectedBooking(checkin);
              open();
            }}
          >
            #{bookingId}
          </Text>
        </Table.Td>

        {/* Customer */}
        <Table.Td>
          <Group gap="sm" wrap="nowrap">
            <Avatar size="md" radius="xl" color="primary">
              {customerName?.charAt(0) || "G"}
            </Avatar>
            <div>
              <Text
                size="sm"
                fw={500}
                style={{
                  cursor: "pointer",
                  color: "var(--mantine-color-primary-6)",
                }}
                onClick={handleCustomerClick}
              >
                {customerName}
              </Text>
              <Group gap={4}>
                <IconPhone size={12} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">
                  {phone || "N/A"}
                </Text>
              </Group>
            </div>
          </Group>
        </Table.Td>

        {/* Room */}
        <Table.Td>
          <Text
            size="sm"
            fw={500}
            style={{
              cursor: "pointer",
              color: "var(--mantine-color-primary-6)",
            }}
            onClick={handleRoomClick}
          >
            {roomNumber}
          </Text>
          <Text size="xs" c="dimmed">
            Room ID: {checkin.roomId}
          </Text>
        </Table.Td>

        {/* Dates */}
        <Table.Td>
          <Stack gap={2}>
            <Group gap={4}>
              <IconCalendar size={12} color="var(--mantine-color-dimmed)" />
              <Text size="sm">In: {checkInDate?.split(" ")[0]}</Text>
            </Group>
            <Group gap={4}>
              <IconCalendar size={12} color="var(--mantine-color-dimmed)" />
              <Text size="sm">Out: {checkOutDate?.split(" ")[0]}</Text>
            </Group>
          </Stack>
        </Table.Td>

        {/* Guests */}
        <Table.Td ta="center">
          <Group gap={4} justify="center">
            <IconUsers size={14} color="var(--mantine-color-dimmed)" />
            <Text size="sm">{guests}</Text>
          </Group>
        </Table.Td>

        {/* Payment */}
        <Table.Td>
          <Text size="sm" fw={700} c="primary">
            {total}
          </Text>
          <Badge size="xs" radius="xl" color={paymentColor} variant="light">
            {payment}
          </Badge>
        </Table.Td>

        {/* Status */}
        <Table.Td>
          <Badge
            size="md"
            radius="xl"
            color={statusColor}
            variant={status === "pending" ? "light" : "filled"}
            leftSection={<IconDoorEnter size={12} />}
          >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </Badge>
        </Table.Td>

        {/* Actions */}
        <Table.Td>
          <Group gap="xs" justify="center">
            {/* View Details Button */}
            <Tooltip label="View Details" position="top" withArrow>
              <ActionIcon
                size="md"
                variant="subtle"
                color="blue"
                onClick={() => {
                  setSelectedBooking(checkin);
                  open();
                }}
              >
                <IconEye size={16} />
              </ActionIcon>
            </Tooltip>

            {/* Check In Button - Only for pending/confirmed status */}
            {status == "accepted" && (
              <Tooltip label="Check In Guest" position="top" withArrow>
                <ActionIcon
                  size="md"
                  variant="filled"
                  color="green"
                  onClick={handleCheckIn}
                  loading={checkInBookingMutation.isPending}
                >
                  <IconDoorEnter size={16} />
                </ActionIcon>
              </Tooltip>
            )}

            {(status == "checked in" ) && (
              <Tooltip label="Check Out Guest" position="top" withArrow>
                <ActionIcon
                  size="md"
                  variant="filled"
                  color="orange"
                  onClick={handleCheckOut}
                  loading={checkOutBookingMutation.isPending}
                >
                  <IconDoorExit  size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Table.Td>
      </Table.Tr>

      {/* Modals */}
      <CustomerModal
        opened={customerModalOpen}
        close={() => setCustomerModalOpen(false)}
        customer={selectedCustomer || {}}
      />

      <BookingModal
        opened={opened}
        close={close}
        booking={selectedBooking}
        type="check-in"
      />

      <RoomModal
        opened={roomModalOpen}
        close={() => setRoomModalOpen(false)}
        room={selectedRoom || {}}
      />
    </>
  );
};

export default CheckinRow;
