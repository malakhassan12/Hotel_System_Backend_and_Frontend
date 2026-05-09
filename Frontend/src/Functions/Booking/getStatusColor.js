const getStatusColor = (data) => {
  if (data.status === "Confirmed") return "green";
  if (data.status === "Pending") return "orange";
  if (data.status === "Cancelled") return "red";
  return "gray";
};

export default getStatusColor;
