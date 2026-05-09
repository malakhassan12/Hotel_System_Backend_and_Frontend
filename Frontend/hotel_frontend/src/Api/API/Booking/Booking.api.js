import bookingClient from "../../Client/Booking/Booking.client";

const getAllBookings = async () => {
  const res = await bookingClient.get("/AllBookings");
  return res?.data;
};

const acceptBooking = async (bookingId) => {
  const res = await bookingClient.post(`/${bookingId}/accept`);
  return res?.data;
};

const rejectBooking = async (bookingId) => {
  const res = await bookingClient.post(`/${bookingId}/reject`);
  return res?.data;
};

const getPendingBookings = async () => {
  const res = await bookingClient.get(`/pending/count`);
  return res?.data;
};

const getConfirmedBookings = async () => {
  const res = await bookingClient.get(`/confirmed/count`);
  return res?.data;
};

const getRevenueBookings = async () => {
  const res = await bookingClient.get(`/revenue/total`);
  console.log("getRevenueBookings", res);
  return res?.data;
};

const checkIn = async (bookingId) => {
  const res = await bookingClient.post(`/${bookingId}/checkin`);
  return res?.data;
};

const checkOut = async (bookingId) => {
  const res = await bookingClient.post(`/${bookingId}/checkout`);
  return res?.data;
};

const getRevenueByMonth = async () => {
  const res = await bookingClient.get(`/monthly-revenue`);
  return res?.data;
};


export {
  getAllBookings,
  acceptBooking,
  rejectBooking,
  getPendingBookings,
  getConfirmedBookings,
  getRevenueBookings,
  checkIn,
  checkOut,
  getRevenueByMonth,
  
};
