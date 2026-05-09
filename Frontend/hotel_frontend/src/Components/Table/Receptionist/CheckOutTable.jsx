import { useState } from "react";
// ******************************** Mantline UI ********************************

import {
  Table,
  Text,
  Badge,
  Group,
  Avatar,
  ActionIcon,
  ScrollArea,
  Box,
} from "@mantine/core";
// ******************************** ICons ********************************

import { IconEye, IconCheck, IconX, IconReceipt } from "@tabler/icons-react";
// ******************************** Components ********************************

import CustomerModal from "../../Modal/Customer/CustomerModal";
import RoomModal from "../../Modal/Room/RoomModal";
import BookingModal from "../../Modal/Booking/BookingModal";
import InvoiceModal from "../../Modal/Invoice/InvoiceModal";

const CheckOutTable = () => {
  // Booking Modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Customer Modal state
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Room Modal state
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const checkouts = [
    {
      id: "CHKOUT001",
      bookingId: "B004",
      bookingDetails: {
        id: "B004",
        customerName: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8901",
        room: "Executive Suite",
        roomNumber: "101",
        checkIn: "2026-04-06",
        checkOut: "2026-04-13",
        guests: 2,
        totalAmount: "$2,660",
        paymentMethod: "Online",
        paymentStatus: "Paid",
        status: "Confirmed",
        specialRequests: "Late check-out",
        createdAt: "2026-03-20",
      },
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8901",
        idNumber: "A12345678",
        nationality: "American",
        address: "123 Main Street, New York, USA",
        passportImage: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      room: {
        id: "R101",
        number: "101",
        type: "Executive Suite",
        floor: 1,
        price: "$380",
        maxGuests: 2,
        beds: "King Bed",
        amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Mini Bar"],
      },
      checkInDate: "2026-04-06",
      checkOutDate: "2026-04-13",
      nights: 7,
      totalAmount: "$2,660",
      paymentStatus: "Paid",
      checkOutStatus: "Pending",
      // ✅ بيانات الفاتورة
      invoice: {
        invoiceNumber: "INV-2024-001",
        bookingId: "B004",
        customerName: "John Doe",
        checkIn: "2026-04-06",
        checkOut: "2026-04-13",
        nights: 7,
        roomCharges: {
          pricePerNight: 380,
          total: 2660,
        },
        additionalServices: [
          { name: "Airport Transfer", amount: 80.0 },
          { name: "Extra Bed", amount: 40.0 },
        ],
        totalAmount: 2780.0,
        paidAmount: 2660.0,
        paymentStatus: "Paid",
        invoiceDate: "2026-04-13",
      },
    },
    {
      id: "CHKOUT002",
      bookingId: "B005",
      bookingDetails: {
        id: "B005",
        customerName: "Sarah Ahmed",
        email: "sarah@example.com",
        phone: "+20 123 456 789",
        room: "Deluxe Suite",
        roomNumber: "204",
        checkIn: "2026-04-07",
        checkOut: "2026-04-10",
        guests: 2,
        totalAmount: "$1,125",
        paymentMethod: "Online",
        paymentStatus: "Pending",
        status: "Confirmed",
        specialRequests: "Extra towels",
        createdAt: "2026-03-25",
      },
      customer: {
        name: "Sarah Ahmed",
        email: "sarah@example.com",
        phone: "+20 123 456 789",
        idNumber: "E98765432",
        nationality: "Egyptian",
        address: "45 Nile Street, Cairo, Egypt",
        passportImage: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      room: {
        id: "R204",
        number: "204",
        type: "Deluxe Suite",
        floor: 2,
        price: "$375",
        maxGuests: 2,
        beds: "Queen Bed",
        amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Balcony"],
      },
      checkInDate: "2026-04-07",
      checkOutDate: "2026-04-10",
      nights: 3,
      totalAmount: "$1,125",
      paymentStatus: "Pending",
      checkOutStatus: "Pending",
      invoice: {
        invoiceNumber: "INV-2024-002",
        bookingId: "B005",
        customerName: "Sarah Ahmed",
        checkIn: "2026-04-07",
        checkOut: "2026-04-10",
        nights: 3,
        roomCharges: {
          pricePerNight: 375,
          total: 1125,
        },
        additionalServices: [{ name: "Airport Transfer", amount: 80.0 }],
        totalAmount: 1205.0,
        paidAmount: 0,
        paymentStatus: "Pending",
        invoiceDate: "2026-04-10",
      },
    },
    {
      id: "CHKOUT003",
      bookingId: "B006",
      bookingDetails: {
        id: "B006",
        customerName: "Michael Smith",
        email: "michael@example.com",
        phone: "+44 20 7946 0138",
        room: "Standard Room",
        roomNumber: "310",
        checkIn: "2026-04-07",
        checkOut: "2026-04-08",
        guests: 1,
        totalAmount: "$180",
        paymentMethod: "Cash",
        paymentStatus: "Unpaid",
        status: "Confirmed",
        specialRequests: "Early check-in",
        createdAt: "2026-03-28",
      },
      customer: {
        name: "Michael Smith",
        email: "michael@example.com",
        phone: "+44 20 7946 0138",
        idNumber: "M45678901",
        nationality: "British",
        address: "12 Baker Street, London, UK",
        passportImage: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      room: {
        id: "R310",
        number: "310",
        type: "Standard Room",
        floor: 3,
        price: "$180",
        maxGuests: 1,
        beds: "Single Bed",
        amenities: ["Free WiFi", "Air Conditioning", "TV"],
      },
      checkInDate: "2026-04-07",
      checkOutDate: "2026-04-08",
      nights: 1,
      totalAmount: "$180",
      paymentStatus: "Unpaid",
      checkOutStatus: "Confirmed",
      invoice: {
        invoiceNumber: "INV-2024-003",
        bookingId: "B006",
        customerName: "Michael Smith",
        checkIn: "2026-04-07",
        checkOut: "2026-04-08",
        nights: 1,
        roomCharges: {
          pricePerNight: 180,
          total: 180,
        },
        additionalServices: [],
        totalAmount: 180.0,
        paidAmount: 0,
        paymentStatus: "Unpaid",
        invoiceDate: "2026-04-08",
      },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "green";
      case "Rejected":
        return "red";
      case "Pending":
        return "orange";
      default:
        return "gray";
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setCustomerModalOpen(true);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setRoomModalOpen(true);
  };

  const handleConfirm = (checkout) => {
    console.log("Confirmed check-out:", checkout.id);
  };

  const handleReject = (checkout) => {
    console.log("Rejected check-out:", checkout.id);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceModalOpen(true);
  };

  const rows = checkouts.map((checkout) => (
    <Table.Tr key={checkout.id}>
      {/* Check-Out ID */}
      <Table.Td>
        <Text size="sm" fw={500}>
          {checkout.id}
        </Text>
      </Table.Td>

      {/* Booking ID - قابل للنقر */}
      <Table.Td>
        <Text
          size="sm"
          fw={500}
          style={{
            cursor: "pointer",
            color: "var(--mantine-color-primary-6)",
            textDecoration: "underline",
          }}
          onClick={() => {
            setSelectedBooking(checkout.bookingDetails);
            setBookingModalOpen(true);
          }}
        >
          {checkout.bookingId}
        </Text>
      </Table.Td>

      {/* Customer */}
      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" radius="xl" color="primary">
            {checkout.customer.name.charAt(0)}
          </Avatar>
          <div>
            <Text
              size="sm"
              fw={500}
              style={{
                cursor: "pointer",
                color: "var(--mantine-color-primary-6)",
              }}
              onClick={() => handleCustomerClick(checkout.customer)}
            >
              {checkout.customer.name}
            </Text>
            <Text size="xs" c="dimmed">
              {checkout.customer.phone}
            </Text>
          </div>
        </Group>
      </Table.Td>

      {/* Room */}
      <Table.Td>
        <Text
          size="sm"
          style={{ cursor: "pointer", color: "var(--mantine-color-primary-6)" }}
          onClick={() => handleRoomClick(checkout.room)}
        >
          Room {checkout.room.number}
        </Text>
        <Text size="xs" c="dimmed">
          {checkout.room.type}
        </Text>
      </Table.Td>

      {/* Stay Period */}
      <Table.Td>
        <Text size="sm">{checkout.checkInDate}</Text>
        <Text size="xs" c="dimmed">
          → {checkout.checkOutDate}
        </Text>
        <Text size="xs" c="dimmed">
          ({checkout.nights} nights)
        </Text>
      </Table.Td>

      {/* Total / Payment */}
      <Table.Td>
        <Text size="sm" fw={600}>
          {checkout.totalAmount}
        </Text>
        <Badge
          size="xs"
          radius="xl"
          color={
            checkout.paymentStatus === "Paid"
              ? "green"
              : checkout.paymentStatus === "Pending"
                ? "orange"
                : "red"
          }
          variant="light"
        >
          {checkout.paymentStatus}
        </Badge>
      </Table.Td>

      {/* Status */}
      <Table.Td>
        <Badge
          size="md"
          radius="xl"
          color={getStatusColor(checkout.checkOutStatus)}
        >
          {checkout.checkOutStatus}
        </Badge>
      </Table.Td>

      {/* Actions - Confirm / Reject + Invoice */}
      <Table.Td>
        <Group gap="xs">
          {checkout.checkOutStatus === "Pending" ? (
            <>
              <ActionIcon
                size="sm"
                variant="filled"
                color="green"
                onClick={() => handleConfirm(checkout)}
              >
                <IconCheck size={16} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="outline"
                color="red"
                onClick={() => handleReject(checkout)}
              >
                <IconX size={16} />
              </ActionIcon>
            </>
          ) : (
            <>
              <ActionIcon
                size="sm"
                variant="light"
                color="blue"
                onClick={() => handleViewInvoice(checkout.invoice)}
              >
                <IconReceipt size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="light" color="gray">
                <IconEye size={16} />
              </ActionIcon>
            </>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <ScrollArea>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Check-Out ID</Table.Th>
              <Table.Th>Booking ID</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Room</Table.Th>
              <Table.Th>Stay Period</Table.Th>
              <Table.Th>Total / Payment</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th ta="center">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Modals */}
      <CustomerModal
        opened={customerModalOpen}
        close={() => setCustomerModalOpen(false)}
        customer={selectedCustomer}
      />

      <BookingModal
        opened={bookingModalOpen}
        close={() => setBookingModalOpen(false)}
        booking={selectedBooking}
        type="check-out"
      />

      <RoomModal
        opened={roomModalOpen}
        close={() => setRoomModalOpen(false)}
        room={selectedRoom}
      />

      {/* ✅ Invoice Modal */}
      <InvoiceModal
        opened={invoiceModalOpen}
        close={() => setInvoiceModalOpen(false)}
        invoice={selectedInvoice}
      />
    </Box>
  );
};

export default CheckOutTable;
