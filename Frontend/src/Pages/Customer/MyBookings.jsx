import {
  Container,
  Title,
  Text,
  Stack,
  Alert,
  Center,
  Paper,
  ThemeIcon,
  Group,
  Box,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconCalendarStats,
  IconBookmark,
  IconBookmarkPlus,
} from "@tabler/icons-react";
import { useState } from "react";

import BookingsTabs from "../../Components/Tabs/Customer/BookingsTabs";
import BookingsTable from "../../Components/Table/Customer/BookingsTable";

import useBookingHistory from "../../Hooks/Customer/useBookingHistory";
import Loading from "../../Components/Loader/Loading";
import Error from "../../Components/Loader/Error";
import InitialBox from "../../Components/Box/InitialBox";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Fetch all bookings (this is your base data)
  const {
    data: historyQuery,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useBookingHistory();


  console.log(historyQuery);


   const finalHistoryQuery = Array.isArray(historyQuery) ? historyQuery: []

  // Transform all bookings to table format
  const allBookings = (finalHistoryQuery || [])?.map((b) => ({
    id: b.id,
    room: `Room ${b.roomId}`,
    checkIn: new Date(b.check_in_Date).toLocaleDateString(),
    checkOut: new Date(b.check_out_Date).toLocaleDateString(),
    guests: b.totalGuests || 2,
    total: b.totalPrice,
    phone: b.phone,
    paymentStatus: b.paymentStatus,
    createdAt: b.created_at,
    status: b.status,
    roomId: b.roomId,
  }));

  // Filter bookings based on active tab
  const getFilteredBookings = () => {
    if (activeTab === "all") return allBookings;

    const statusMap = {
      pending: "PENDING",
      confirmed: "ACCEPTED",
      "checked-in": "CHECKED_IN",
    };

    const targetStatus = statusMap[activeTab];
    
    // Filter the already transformed bookings
    return allBookings.filter((booking) => booking.status === targetStatus);
  };

  const filteredBookings = getFilteredBookings();

  // Loading state
  if (isLoadingAll) {
    return <Loading name={"Bookings"} />;
  }

  // Error state
  if (errorAll) {
    return <Error name={"Bookings"} error={errorAll} />;
  }

  // Get counts for tabs
  const getTabCounts = () => {
    const allBookingsCount = finalHistoryQuery || [];
    const pendingCount = allBookingsCount.filter(
      (b) => b.status === "PENDING"
    ).length;
    const confirmedCount = allBookingsCount.filter(
      (b) => b.status === "ACCEPTED"
    ).length;
    const checkedInCount = allBookingsCount.filter(
      (b) => b.status === "CHECKED_IN"
    ).length;

    return {
      all: allBookingsCount.length,
      pending: pendingCount,
      confirmed: confirmedCount,
      "checked-in": checkedInCount,
    };
  };

  const counts = getTabCounts();

  return (
    // ... rest of your JSX remains the same
    <Box
      style={{
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Container size="xl">
        <Stack gap="xl">
          {/* Header Section with Gradient */}
          <Paper
            shadow="lg"
            radius="xl"
            p="xl"
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Group justify="space-between" align="center">
              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon
                    size="xl"
                    variant="light"
                    color="white"
                    radius="xl"
                  >
                    <IconCalendarStats size={28} />
                  </ThemeIcon>
                  <Title order={1} size="h1" fw={800}>
                    My Bookings
                  </Title>
                </Group>
                <Text opacity={0.9} size="lg" ml={50}>
                  View and manage all your room reservations
                </Text>
              </div>
            </Group>

            {/* Decorative circles */}
            <Box
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                pointerEvents: "none",
              }}
            />
            <Box
              style={{
                position: "absolute",
                bottom: -80,
                left: -80,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                pointerEvents: "none",
              }}
            />
          </Paper>

          {/* Tabs Section with Counts */}
          <Paper shadow="sm" radius="lg" p="md" withBorder>
            <BookingsTabs
              tabs={[
                { key: "all", label: `📋 All Bookings`, count: counts.all },
                { key: "pending", label: `⏳ Pending`, count: counts.pending },
                {
                  key: "confirmed",
                  label: `✅ Confirmed`,
                  count: counts.confirmed,
                },
                {
                  key: "checked-in",
                  label: `🏨 Checked-In`,
                  count: counts.checkedIn,
                },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </Paper>

          {/* Bookings Table Section */}
          <Paper shadow="sm" radius="lg" p="xl" withBorder>
            {filteredBookings.length === 0 ? (
              <Center py="xl">
                <Alert
                  color="blue"
                  variant="light"
                  title="No Bookings Found"
                  icon={<IconAlertCircle size={20} />}
                  radius="md"
                >
                  <Text size="sm">
                    {activeTab === "all"
                      ? "You haven't made any bookings yet. Start exploring our rooms!"
                      : `You don't have any ${activeTab} bookings at the moment.`}
                  </Text>
                </Alert>
              </Center>
            ) : (
              <>
                <Group justify="space-between" mb="md">
                  <Text fw={600} size="sm" c="dimmed">
                    Showing {filteredBookings.length} booking
                    {filteredBookings.length !== 1 ? "s" : ""}
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon
                      size="sm"
                      variant="light"
                      color="blue"
                      radius="xl"
                    >
                      <IconBookmarkPlus size={12} />
                    </ThemeIcon>
                    <Text size="xs" c="dimmed">
                      Last updated: {new Date().toLocaleDateString()}
                    </Text>
                  </Group>
                </Group>
                <BookingsTable bookings={filteredBookings} />
              </>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};


export default MyBookings;
