import bookingClient from "../../Client/Booking/Booking.client";

// Malak
export const createBooking = async (data) => {
  console.log(data);
  const res = await bookingClient.post("", data);
  return res?.data;
};

export const getOneBooking = async ({ userId, roomId }) => {
  const res = await bookingClient.get("/GetPendingBookingForUser", {
    params: {
      userId: userId,
      roomID: roomId,
    },
  });
  return res?.data;
};


export const canReview = async ({ userId, roomId }) => {
  const res = await bookingClient.get(`/CanReview`, {
    params: {
      userId: userId,
      roomId: roomId,
    },
  });
  return res?.data;
};





export const viewBookingsHistory = async (userId) => {
  try {
    const res = await bookingClient.get(`/history/${userId}`);
    return res?.data;
  } catch (err) {
    return err;
  }
};
export const getBookingsByStatus = async (userId, status) => {
  try {
    const res = await bookingClient.get(`/GetAllBookingsByStatus`, {
      params: { userId, status },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
