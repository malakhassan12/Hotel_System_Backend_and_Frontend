import dayjs from "dayjs";
import getStatusConfigBooking from "../../Utils/Booking/getStatusConfigBooking";

//checkINDate/checkOutDate=>string return=>number
export const calculateNights = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return 0;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const diffTime = checkOut - checkIn;

  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 0;
};

export const calculateTotalPrice = (pricePerNight, nights) => {
  return nights > 0 ? nights * pricePerNight : 0;
};

export const mapBookingData = (booking) => {
  if (!booking) return null;

  console.log(booking);

  const getPaymentConfig = (paymentStatus) => {
    // If your API has payment status, use it
    // Otherwise, you can determine based on booking status
    switch (paymentStatus?.toUpperCase()) {
      case "PAID":
        return { label: "Paid", color: "green" };
      case "PENDING":
        return { label: "Pending", color: "orange" };
      case "REFUNDED":
        return { label: "Refunded", color: "red" };
      default:
        return { label: "Not Paid", color: "gray" };
    }
  };

  const statusConfig = getStatusConfigBooking(booking.status);

  const paymentConfig = getPaymentConfig(
    booking.paymentStatus ||
      (booking.status === "CONFIRMED" ? "PAID" : "PENDING"),
  );

  return {
    id: booking?.id || `BK-${booking.bookingId}`,
    bookingId: booking?.id,
    customerId: booking?.userId,
    customer: booking?.customer || `Customer ${booking.userId}`,
    roomId: booking.roomId,
    room: booking?.room || `Room ${booking.roomId}`,
    checkIn: dayjs(booking.check_in_Date).format("YYYY-MM-DD HH:mm:ss"),
    checkOut: dayjs(booking.check_out_Date || booking.checkOutDate).format(
      "YYYY-MM-DD HH:mm:ss",
    ),
    guests: booking.totalGuests || 1,
    total: `${booking?.total || booking.TotalPrice?.toFixed(2) || "0.00"}`,
    payment: paymentConfig.label.toLowerCase(),
    paymentStatus: booking.paymentStatus,
    status: statusConfig.label.toLowerCase(),
    statusColor: statusConfig.color,
    paymentColor: paymentConfig.color,
    phone: booking.phone,
  };
};
