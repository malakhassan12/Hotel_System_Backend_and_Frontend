// ******************************** Icons ********************************
import {
  IconCheck,
  IconClock,
  IconX,
  IconDoorEnter,
  IconDoorExit,
  IconCheckbox,
  IconExclamationCircle,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";

const getStatusConfigRoom = (status = "") => {
  if (typeof status !== "string") {
    return {
      label: "Unknown",
      color: "gray",
      icon: IconExclamationCircle,
    };
  }
  switch (status?.toUpperCase()) {
    case "AVAILABLE":
      return {
        label: "Available",
        color: "green",
        icon: IconCircleCheck,
      };

    case "BOOKED":
      return {
        label: "Booked",
        color: "orange",
        icon: IconClock,
      };

    case "MAINTENANCE":
      return {
        label: "Maintaince",
        color: "red",
        icon: IconCircleX,
      };

    default:
      return {
        label: status || "Unknown",
        color: "gray",
        icon: IconExclamationCircle,
      };
  }
};

export default getStatusConfigRoom;
