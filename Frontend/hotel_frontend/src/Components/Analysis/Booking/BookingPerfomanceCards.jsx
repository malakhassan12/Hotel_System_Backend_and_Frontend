// ******************************** Mantline UI ********************************
import { Grid } from "@mantine/core";
// ******************************** Icons ********************************
import {
  IconCalendarClock,
  IconCheck,
  IconCurrencyDollar,
} from "@tabler/icons-react";
// ******************************** Components ********************************
import BookingCard from "../../Card/Booking/BookingCard";
import useGetPendingBookings from "../../../Hooks/Card/useGetPendingBookings";
import useGetConfirmedBookings from "../../../Hooks/Card/useGetConfirmedBookings";
import useGetRevenueBookings from "../../../Hooks/Card/useGetRevenueBookings";
import useGetAllBookings from "../../../Hooks/Employee/useGetAllBookings";

const BookingPerformanceCards = () => {
  const { data: pendingBookings } = useGetPendingBookings();
  const { data: confirmedBookings } = useGetConfirmedBookings();
  const { data: revenueBookings } = useGetRevenueBookings();
  const { data: allBookings = [] } = useGetAllBookings();

  // Extract ONLY the numbers from API responses
  const pendingCount = pendingBookings || 0;
  const confirmedCount = confirmedBookings || 0;
  const totalRevenue = revenueBookings || 0;
  
  // Calculate total bookings count
  const totalBookings = allBookings?.length || 0;

  // Calculate trends (percentages)
  const pendingTrend = totalBookings > 0 ? (pendingCount / totalBookings) * 100 : 0;
  const confirmedTrend = totalBookings > 0 ? (confirmedCount / totalBookings) * 100 : 0;
  const revenueTrend = totalBookings > 0 ? (totalRevenue / totalBookings) : 0;

  const cardsData = [
    {
      title: "Pending Requests",
      value: pendingCount, 
      icon: IconCalendarClock,
      color: "orange",
      trend: Math.round(pendingTrend), // Round to integer
    },
    {
      title: "Confirmed Today",
      value: confirmedCount, 
      icon: IconCheck,
      color: "green",
      trend: Math.round(confirmedTrend), // Round to integer
    },
    {
      title: "Total Revenue",
      value: totalRevenue, 
      icon: IconCurrencyDollar,
      color: "primary",
      trend: Math.round(revenueTrend), // Round to integer
    },
  ];

  console.log("Values only:", {
    pending: pendingCount,
    confirmed: confirmedCount,
    revenue: totalRevenue,
    totalBookings: totalBookings,
    trends: {
      pending: Math.round(pendingTrend) + "%",
      confirmed: Math.round(confirmedTrend) + "%",
      revenue: "$" + Math.round(revenueTrend)
    }
  });

  return (
    <Grid>
      {cardsData.map((item, index) => (
        <Grid.Col
          key={index}
          span={{ base: 12, sm: 6, lg: 4 }}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="700"
          data-aos-delay={index * 100}
        >
          <BookingCard item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default BookingPerformanceCards;