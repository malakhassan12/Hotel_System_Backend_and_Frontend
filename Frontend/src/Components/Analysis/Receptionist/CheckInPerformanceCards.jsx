// ******************************** Mantine UI ********************************
import { Grid, Skeleton, Center, Alert, Stack, Text, ActionIcon } from "@mantine/core";
// ******************************** Icons ********************************
import { 
  IconCheck, 
  IconClock, 
  IconUsers,
  IconDoorEnter,
  IconAlertCircle,
  IconRefresh,
  IconX,
  IconDoorExit,
  IconCheckbox,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
// ******************************** Components ********************************
import CheckInPerformanceCard from "../../Card/Receptionist/CheckInPerformanceCard";
import useGetAllBookings from "../../../Hooks/Employee/useGetAllBookings";

const CheckInPerformanceCards = () => {
  const { data: bookings, isLoading, error, refetch } = useGetAllBookings();
  console.log("All bookings:", bookings);

  // Calculate statistics from API data for all statuses
  const calculateStats = () => {
    if (!Array.isArray(bookings) || bookings.length === 0) {
      return {
        total: 0,
        pending: 0,
        accepted: 0,
        checkedIn: 0,
        checkedOut: 0,
        cancelled: 0,
        rejected: 0,
        completed: 0,
        confirmed: 0,
      };
    }

    let total = 0;
    let pending = 0;
    let accepted = 0;
    let checkedIn = 0;
    let checkedOut = 0;
    let cancelled = 0;
    let rejected = 0;
    let completed = 0;
    let confirmed = 0;

    bookings.forEach((booking) => {
      total++;
      
      switch (booking.status?.toUpperCase()) {
        case "PENDING":
          pending++;
          break;
        case "ACCEPTED":
          accepted++;
          break;
        case "CHECKED_IN":
          checkedIn++;
          break;
        case "CHECKED_OUT":
          checkedOut++;
          break;
        case "CANCELLED":
          cancelled++;
          break;
        case "REJECTED":
          rejected++;
          break;
        case "COMPLETED":
          completed++;
          break;
        case "CONFIRMED":
          confirmed++;
          break;
        default:
          break;
      }
    });

    return {
      total,
      pending,
      accepted,
      checkedIn,
      checkedOut,
      cancelled,
      rejected,
      completed,
      confirmed,
      // For check-in dashboard specific metrics
      readyForCheckIn: pending + accepted, // Bookings ready to be checked in
      completedToday: checkedIn + checkedOut + completed, // Completed bookings
    };
  };

  const statsData = calculateStats();

  const stats = [
    {
      title: "Total Bookings",
      value: statsData.total.toString(),
      icon: IconUsers,
      color: "primary",
      bgColor: "primary.0",
      description: "Total bookings",
      trend: statsData.total > 0 ? `+${statsData.total}` : "0",
    },
    {
      title: "Pending",
      value: statsData.pending.toString(),
      icon: IconClock,
      color: "orange",
      bgColor: "orange.0",
      description: "Awaiting approval",
      trend: statsData.pending > 0 ? `+${statsData.pending}` : "0",
    },
    {
      title: "Accepted",
      value: statsData.accepted.toString(),
      icon: IconCircleCheck,
      color: "teal",
      bgColor: "teal.0",
      description: "Ready for check-in",
      trend: statsData.accepted > 0 ? `+${statsData.accepted}` : "0",
    },
    {
      title: "Checked In",
      value: statsData.checkedIn.toString(),
      icon: IconDoorEnter,
      color: "blue",
      bgColor: "blue.0",
      description: "Currently checked in",
      trend: statsData.checkedIn > 0 ? `+${statsData.checkedIn}` : "0",
    },
    {
      title: "Checked Out",
      value: statsData.checkedOut.toString(),
      icon: IconDoorExit,
      color: "gray",
      bgColor: "gray.0",
      description: "Already checked out",
      trend: statsData.checkedOut > 0 ? `+${statsData.checkedOut}` : "0",
    },
    {
      title: "Completed",
      value: statsData.completed.toString(),
      icon: IconCheckbox,
      color: "green",
      bgColor: "green.0",
      description: "Successfully completed",
      trend: statsData.completed > 0 ? `+${statsData.completed}` : "0",
    },
    {
      title: "Cancelled",
      value: statsData.cancelled.toString(),
      icon: IconCircleX,
      color: "red",
      bgColor: "red.0",
      description: "Cancelled bookings",
      trend: statsData.cancelled > 0 ? `-${statsData.cancelled}` : "0",
    },
    {
      title: "Rejected",
      value: statsData.rejected.toString(),
      icon: IconX,
      color: "pink",
      bgColor: "pink.0",
      description: "Rejected bookings",
      trend: statsData.rejected > 0 ? `-${statsData.rejected}` : "0",
    },
  ];

  // Filter stats to show only relevant ones (can adjust based on needs)
  const displayStats = stats; // Show all stats
  // Or show only specific ones:
  // const displayStats = stats.slice(0, 4);

  if (isLoading) {
    return (
      <Grid>
        {[1, 2, 3, 4].map((index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
            <Skeleton height={140} radius="md" animate />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid>
        <Grid.Col span={12}>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error Loading Data"
            color="red"
            variant="filled"
            withCloseButton
          >
            Failed to load booking statistics. Please refresh the page.
          </Alert>
        </Grid.Col>
      </Grid>
    );
  }

  if (statsData.total === 0) {
    return (
      <Grid>
        <Grid.Col span={12}>
          <Center h={200}>
            <Stack align="center" gap="md">
              <IconUsers size={48} color="var(--mantine-color-gray-5)" />
              <div>
                <Text size="lg" fw={500} c="dimmed" ta="center">
                  No Bookings Found
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  There are no bookings in the system.
                </Text>
              </div>
              <ActionIcon variant="light" color="primary" onClick={() => refetch()}>
                <IconRefresh size={16} />
              </ActionIcon>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Grid>
      {displayStats.map((stat, i) => (
        <Grid.Col
          key={i}
          span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="700"
          data-aos-delay={(i % 4) * 100}
        >
          <CheckInPerformanceCard stat={stat} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default CheckInPerformanceCards;