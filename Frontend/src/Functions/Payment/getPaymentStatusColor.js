const getPaymentStatusColor = (data) => {
  if (data.paymentStatus === "Paid") return "green";
  if (data.paymentStatus === "Pending") return "orange";
  return "gray";
};

export default getPaymentStatusColor;
