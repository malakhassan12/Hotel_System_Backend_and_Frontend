import {
  Text,
  Badge,
  Group,
  ActionIcon,
  Tooltip,
  Paper,
  Box,
  Stack,
  Pagination,
} from "@mantine/core";
import {
  IconCreditCard,
  IconCalendar,
  IconUsers,
  IconDoor,
  IconId,
} from "@tabler/icons-react";
import BookingStatusBadge from "../../Badge/BookingStatusBadge";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import BookingModal from "../../Modal/Booking/BookingModal";
import usePaymentMutations from "../../../Hooks/Payement/usePaymentMutations";
import { useNavigate } from "react-router-dom";

const BookingsTable = ({ bookings }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  const { createPaymentMutation } = usePaymentMutations();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Changed to 5 for better display, adjust as needed

  const makePayment = async (booking) => {
    const res = await createPaymentMutation.mutateAsync({
      bookingId: booking.id,
      amount: booking.total,
    });

    const clientSecret = res.clientSecret;
    navigate(`/customer/create-payment/${booking?.roomId}`, {
      state: { clientSecret },
    });
  };

  // Pagination - FIXED: Use bookings instead of checkinsReady
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <BookingModal opened={opened} close={close} booking={selectedBooking} />

      <Box
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Stack gap="md" style={{ minWidth: "300px" }}>
          {/* Header - Hidden on mobile */}
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "12px",
              padding: "12px 16px",
              background: "linear-gradient(135deg, #1971c2 0%, #339af0 100%)",
              borderRadius: "8px",
              color: "white",
              fontWeight: 700,
            }}
            className="desktop-header"
          >
            <Text fw={700} size="sm">
              ID
            </Text>
            <Text fw={700} size="sm">
              Room
            </Text>
            <Text fw={700} size="sm">
              Check-In
            </Text>
            <Text fw={700} size="sm">
              Check-Out
            </Text>
            <Text fw={700} size="sm" ta="center">
              Guests
            </Text>
            <Text fw={700} size="sm">
              Total
            </Text>
            <Text fw={700} size="sm">
              Status
            </Text>
            <Text fw={700} size="sm" ta="center">
              Actions
            </Text>
          </Box>

          {/* Booking Rows - Use paginatedBookings instead of bookings */}
          {paginatedBookings.map((booking) => (
            <Paper
              key={booking.id}
              shadow="sm"
              radius="md"
              p="md"
              withBorder
              className="booking-row"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "12px",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedBooking(booking);
                open();
              }}
            >
              {/* ID */}
              <Group gap="xs" wrap="nowrap" className="mobile-label">
                <IconId size={16} className="mobile-icon" />
                <Text fw={600} size="sm">
                  #{booking.id}
                </Text>
              </Group>

              {/* Room */}
              <Box>
                <Group gap="xs" className="mobile-label">
                  <IconDoor size={16} className="mobile-icon" />
                  <Text fw={500} size="sm">
                    {booking.room}
                  </Text>
                </Group>
                <Text size="xs" c="dimmed" className="room-type">
                  Standard
                </Text>
              </Box>

              {/* Check-In */}
              <Box>
                <Group gap="xs" className="mobile-label">
                  <IconCalendar size={16} className="mobile-icon" />
                  <Text size="xs" c="dimmed" className="mobile-label-text">
                    Check-in
                  </Text>
                </Group>
                <Text size="sm">{booking.checkIn}</Text>
              </Box>

              {/* Check-Out */}
              <Box>
                <Group gap="xs" className="mobile-label">
                  <IconCalendar size={16} className="mobile-icon" />
                  <Text size="xs" c="dimmed" className="mobile-label-text">
                    Check-out
                  </Text>
                </Group>
                <Text size="sm">{booking.checkOut}</Text>
              </Box>

              {/* Guests */}
              <Group gap="xs" justify="center" className="mobile-label">
                <IconUsers size={16} className="mobile-icon" />
                <Badge size="sm" variant="light" color="blue">
                  {booking.guests}
                </Badge>
              </Group>

              {/* Total */}
              <Text fw={700} size="lg" c="blue.7">
                ${booking.total?.toLocaleString()}
              </Text>

              {/* Status */}
              <BookingStatusBadge status={booking.status} />

              {/* Actions */}
              <Group gap="xs" justify="center">
                {
                  (!booking?.paymentStatus) && (
                    <Tooltip label="Make Payment">
                      <ActionIcon
                        variant="light"
                        color="green"
                        size="md"
                        onClick={(e) => {
                          e.stopPropagation();
                          makePayment(booking);
                        }}
                      >
                        <IconCreditCard size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}
              </Group>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Pagination - Only show if more than 1 page */}
      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
            color="primary"
            radius="md"
            withEdges
            size="md"
          />
        </Group>
      )}

      {/* Show total records info */}
      <Group justify="center" mt="sm">
        <Text size="xs" c="dimmed">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, bookings.length)} of{" "}
          {bookings.length} bookings
        </Text>
      </Group>

      {/* CSS for responsiveness */}
      <style>{`
        /* Desktop and Tablet styles */
        @media (min-width: 769px) {
          .mobile-icon,
          .mobile-label-text,
          .room-type {
            display: none !important;
          }
          
          .booking-row {
            grid-template-columns: repeat(8, 1fr) !important;
            gap: 12px !important;
          }
          
          .desktop-header {
            display: grid !important;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
          .desktop-header {
            display: none !important;
          }
          
          .booking-row {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
            padding: 16px !important;
          }
          
          .mobile-label {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            margin-bottom: 4px !important;
          }
          
          .mobile-icon {
            display: block !important;
            color: #666;
          }
          
          .mobile-label-text {
            display: inline !important;
          }
          
          .room-type {
            display: block !important;
          }
          
          /* Make each item full width on mobile */
          .booking-row > div,
          .booking-row > .mantine-Group-root {
            width: 100%;
            justify-content: space-between !important;
          }
          
          /* Style for totals on mobile */
          .booking-row .mantine-Text-root:has(> .mantine-Badge-root) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
        }
        
        /* Tablet styles (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .booking-row {
            gap: 8px !important;
          }
          
          .booking-row .mantine-Text-root {
            font-size: 12px !important;
          }
          
          .booking-row .mantine-Badge-root {
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  );
};

export default BookingsTable;