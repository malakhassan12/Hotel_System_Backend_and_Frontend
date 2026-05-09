import { Badge } from "@mantine/core";

const statusConfig = {
  pending: { color: "yellow", label: "Pending" },
  confirmed: { color: "green", label: "Confirmed" },
  "checked-in": { color: "blue", label: "Checked-In" },
  checkedin: { color: "blue", label: "Checked-In" },
  cancelled: { color: "red", label: "Cancelled" },
};

const BookingStatusBadge = ({ status = "" }) => {
 
  const normalizedStatus = status
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");     

  const config = statusConfig[normalizedStatus] || {
    color: "gray",
    label: status,
  };

  return (
    <Badge
      color={config.color}
      variant="light"
      radius="sm"
      size="md"
      fw={600}
    >
      {config.label}
    </Badge>
  );
};

export default BookingStatusBadge;