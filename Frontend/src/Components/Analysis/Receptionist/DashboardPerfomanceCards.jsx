// ******************************** Mantline UI ********************************
import { Grid, Skeleton, Center, Alert, Stack, Text, ActionIcon } from "@mantine/core";

// ******************************** Components ********************************
import ReceptionistCard from "../../Card/Receptionist/ReceptionistCard";
// ******************************** ICons ********************************
import {
  IconCalendarClock,
  IconHotelService,
  IconCreditCardPay,
  IconTool,
  IconAlertCircle,
  IconRefresh,
} from "@tabler/icons-react";
import useGetPendingPayments from "../../../Hooks/Payement/useGetPendingPayments";
import useGetMantenanceRooms from "../../../Hooks/Card/useGetMantenanceRooms";
import useGetAvailableRooms from "../../../Hooks/Card/useGetAvailableRooms";
import useGetPendingBookings from "../../../Hooks/Card/useGetPendingBookings";

const DashboardPerfomanceCards = () => {
  const { data: pendingPayment, isLoading: paymentLoading, error: paymentError } = useGetPendingPayments();
  const { data: maintenanceRooms, isLoading: maintenanceLoading, error: maintenanceError } = useGetMantenanceRooms();
  const { data: availableRooms, isLoading: availableLoading, error: availableError } = useGetAvailableRooms();
  const { data: pendingBookings, isLoading: bookingsLoading, error: bookingsError } = useGetPendingBookings();

  console.log(
    "API Data:",
    { 
      pendingPayment: typeof pendingPayment, 
      value: pendingPayment,
      maintenanceRooms: typeof maintenanceRooms,
      availableRooms: typeof availableRooms,
      pendingBookings: typeof pendingBookings,
    }
  );

  // Get integer values from API
  const pendingBookingsValue = typeof pendingBookings === 'number' ? pendingBookings : (pendingBookings?.length || pendingBookings?.count || 0);
  const availableRoomsValue = typeof availableRooms === 'number' ? availableRooms : (availableRooms?.length || availableRooms?.count || 0);
  const pendingPaymentsValue = typeof pendingPayment === 'number' ? pendingPayment : (pendingPayment?.length || pendingPayment?.count || 0);
  const maintenanceRoomsValue = typeof maintenanceRooms === 'number' ? maintenanceRooms : (maintenanceRooms?.length || maintenanceRooms?.count || 0);

  // Calculate trends (all integers)
  const calculateTrend = (current, previous = 0) => {
    if (!previous || previous === 0) return "+0";
    const change = ((current - previous) / previous) * 100;
    if (change > 0) return `+${Math.round(change)}`;
    if (change < 0) return `${Math.round(change)}`;
    return "0";
  };

  // Check if any data is loading
  const isLoading = paymentLoading || maintenanceLoading || availableLoading || bookingsLoading;
  
  // Check if any error occurred
  const hasError = paymentError || maintenanceError || availableError || bookingsError;

  const data = [
    {
      label: "Pending Bookings",
      value: pendingBookingsValue, // Integer
      icon: IconCalendarClock,
      color: "orange",
      bg: "orange.1",
      trend: calculateTrend(pendingBookingsValue, 0),
      trendColor: pendingBookingsValue > 0 ? "green" : "gray",
      description: "Awaiting confirmation",
    },
    {
      label: "Available Rooms",
      value: availableRoomsValue, // Integer
      icon: IconHotelService,
      color: "green",
      bg: "green.1",
      trend: calculateTrend(availableRoomsValue, 0),
      trendColor: availableRoomsValue > 0 ? "green" : "gray",
      description: "Ready for booking",
    },
    {
      label: "Pending Payments",
      value: pendingPaymentsValue, // Integer
      icon: IconCreditCardPay,
      color: "red",
      bg: "red.1",
      trend: calculateTrend(pendingPaymentsValue, 0),
      trendColor: pendingPaymentsValue > 0 ? "orange" : "gray",
      description: "Awaiting payment",
    },
    {
      label: "Maintenance",
      value: maintenanceRoomsValue, // Integer
      icon: IconTool,
      color: "blue",
      bg: "blue.1",
      trend: calculateTrend(maintenanceRoomsValue, 0),
      trendColor: maintenanceRoomsValue > 0 ? "red" : "gray",
      description: "Under repair",
    },
  ];

  if (isLoading) {
    return (
      <Grid>
        {[1, 2, 3, 4].map((index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
            <Skeleton height={130} radius="md" animate />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (hasError) {
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
            Failed to load dashboard statistics. Please refresh the page.
          </Alert>
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Grid>
      {data.map((item, i) => (
        <Grid.Col
          key={i}
          span={{ base: 12, sm: 6, lg: 3 }}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="700"
          data-aos-delay={i * 100}
        >
          <ReceptionistCard item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default DashboardPerfomanceCards;