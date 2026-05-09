import { useForm } from "@mantine/form";

export const defaultRoom = {
  id: null,
  roomNumber: "",
  description: "",
  roomType: "",
  pricePerNight: 0,
  maxNumberOfUsers: 1,
  status: "AVAILABLE",
  oceanView: false,
  kingBed: false,
  balcony: false,
  miniBar: false,
  wifi: false,
  smartTv: false,
  images: [],
};

export const useRoomForm = () => {
  return useForm({
    initialValues: defaultRoom,
    validate: {
      description: (v) => (v?.length < 3 ? "Too short" : null),
      roomNumber: (v) => (!v ? "Required" : null),
      roomType: (v) => (!v ? "Required" : null),
      pricePerNight: (v) => (v <= 0 ? "Invalid price" : null),
      maxNumberOfUsers: (v) => (v <= 0 ? "Invalid guests" : null),
    },
  });
};