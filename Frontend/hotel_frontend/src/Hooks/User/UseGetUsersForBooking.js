import { useQueries } from "@tanstack/react-query";
import { getUser } from "../../Api/API/User/User.api";
import { getRoom } from "../../Api/API/Room/Room.api";
import dayjs from "dayjs";

const UseGetUsersForBooking = (bookings = []) => {
    const safeBookings = Array.isArray(bookings) ? bookings : [];
  /* ================= USERS ================= */
  const usersQueries = useQueries({
    queries: safeBookings?.map((booking) => ({
      queryKey: ["user", booking.userId],
      queryFn: () => getUser(booking.userId), 
      enabled: !!booking.userId,
    })),
  });

  /* ================= ROOMS ================= */
  const roomsQueries = useQueries({
    queries: safeBookings?.map((booking) => ({
      queryKey: ["room", booking.roomId],
      queryFn: () => getRoom(booking.roomId), 
      enabled: !!booking.roomId,
    })),
  });

  /* ================= MERGE ================= */
  const mappedData = safeBookings.map((booking, index) => {
    const userData = usersQueries[index]?.data;
    const roomData = roomsQueries[index]?.data;

    return {
      id: booking.id || `BK-${booking.bookingId}`,
      bookingId: booking.id,

      customerId: booking.userId,
      customer: userData || {},

      roomId: booking.roomId,
      room: roomData || {},

      checkIn: dayjs(booking.check_in_Date).format("YYYY-MM-DD HH:mm:ss"),
      checkOut: dayjs(booking.check_out_Date || booking.checkOutDate).format(
        "YYYY-MM-DD HH:mm:ss",
      ),

      guests: booking.totalGuests || 1,

      total: `$${(booking.totalPrice || booking.TotalPrice || 0).toFixed(2)}`,

      status: booking.status?.toLowerCase(),
      paymentStatus: booking.paymentStatus,

      phone: booking.phone,
    };
  });

  return {
    data: mappedData,
    isLoading:
      usersQueries.some((q) => q.isLoading) ||
      roomsQueries.some((q) => q.isLoading),

    isError:
      usersQueries.some((q) => q.isError) ||
      roomsQueries.some((q) => q.isError),
  };
};

export default UseGetUsersForBooking;
