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

const getStatusConfigBooking = (status) => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return { 
        label: "Confirmed", 
        color: "green",
        icon: IconCircleCheck 
      };
      
    case "PENDING":
      return { 
        label: "Pending", 
        color: "orange",
        icon: IconClock 
      };
      
    case "CANCELLED":
      return { 
        label: "Cancelled", 
        color: "red",
        icon: IconCircleX 
      };
      
    case "CHECKED_IN":
      return { 
        label: "Checked In", 
        color: "blue",
        icon: IconDoorEnter 
      };
      
    case "CHECKED_OUT":
      return { 
        label: "Checked Out", 
        color: "gray",
        icon: IconDoorExit 
      };
      
    case "ACCEPTED":
      return { 
        label: "Accepted", 
        color: "gray",
        icon: IconCheck 
      };
      
    case "REJECTED":
      return { 
        label: "Rejected", 
        color: "gray",
        icon: IconX 
      };
      
    case "COMPLETED":
      return { 
        label: "Completed", 
        color: "gray",
        icon: IconCheckbox 
      };

    default:
      return { 
        label: status || "Unknown", 
        color: "gray",
        icon: IconExclamationCircle 
      };
  }
};

export default getStatusConfigBooking;