// ******************************** Mantline UI ********************************
import { SimpleGrid, Stack, Loader, Center, Alert } from "@mantine/core";
// ******************************** Components ********************************
import RoomCard from "./RoomCard";
import useAuthStore from "../../../Store/authStore";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";
import { IconAlertCircle } from "@tabler/icons-react";
import Loading from "../../Loader/Loading";
import NoData from "../../Empty/NoData";
import { mapRoomData } from "../../../Functions/Room/RoomFunctions";
import useSearchRoomStore from "../../../Store/useSearchRoomStore";
import Error from "../../Loader/Error"
const RoomCards = () => {
  const { data: response = [], isLoading, error } = useGetAllRooms();
  const { role } = useAuthStore();

  const safeBookings = Array.isArray(response) ? response : [];

  const { searchQuery, availability } = useSearchRoomStore();

  const apiRooms = safeBookings || [];
  const rooms = apiRooms?.map(mapRoomData);

  const filteredRooms = rooms.filter((room) => {
    const searchLower = searchQuery.toLowerCase();

    const roomNumStr = room?.roomNumber?.toString() || "";

    const matchesSearch =
      room?.roomType?.toLowerCase().includes(searchLower) ||
      room?.description?.toLowerCase().includes(searchLower) ||
      roomNumStr.includes(searchQuery);

    const matchesAvailability =
      availability === "all" || room.status === availability;

    return matchesSearch && matchesAvailability;
  });

  if (isLoading) return <Loading />;
  if (error) return <Error name={"Rooms"} error={error} />;

  if (filteredRooms.length === 0) {
    return <NoData name={"Filtered Results"} />;
  }

  return (
    <Stack gap="lg">
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {filteredRooms.map((room, index) => (
          <div key={room.id} data-aos="fade-down" data-aos-delay={index * 100}>
            <RoomCard item={room} role={role} />
          </div>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
export default RoomCards;
