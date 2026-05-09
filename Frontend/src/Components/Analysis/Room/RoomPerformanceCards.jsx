// ******************************** Mantline UI ********************************
import { Grid, Skeleton, Center, Alert } from "@mantine/core";
import { IconBed, IconBedOff, IconTools, IconAlertCircle } from "@tabler/icons-react";
// ******************************** Components ********************************
import PerformanceRoomCard from "../../Card/Room/PerformanceRoomCard";
import useGetAllRooms from "../../../Hooks/Room/useGetAllRooms";
import Error from "../../Loader/Error";

const RoomPerformanceCards = () => {
  const { data: rooms, isLoading, error } = useGetAllRooms();

  console.log("Raw rooms data:", rooms);

  // Calculate room counts based on status
  const calculateRoomCounts = () => {
    if (!rooms || !Array.isArray(rooms)) {
      return { available: 0, booked: 0, maintenance: 0 };
    }

    const counts = {
      available: 0,
      booked: 0,
      maintenance: 0,
    };

    rooms.forEach((room) => {
      const status = room.status?.toLowerCase();
      if (status === "available") {
        counts.available++;
      } else if (status === "booked") {
        counts.booked++;
      } else if (status === "maintenance") {
        counts.maintenance++;
      }
    });

    return counts;
  };

  const roomCounts = calculateRoomCounts();

  // Prepare cards data with real API values
  const roomsData = [
    {
      title: "Available Rooms",
      value: roomCounts.available.toString(),
      icon: IconBed,
      color: "green",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=200&fit=crop",
      status: "Ready for Booking",
      trend: roomCounts.available > 0 ? "+" + roomCounts.available : 0,
    },
    {
      title: "Booked Rooms",
      value: roomCounts.booked.toString(),
      icon: IconBedOff,
      color: "primary",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop",
      status: "Currently Occupied",
      trend: roomCounts.booked > 0 ? "+" + roomCounts.booked : 0,
    },
    {
      title: "Maintenance",
      value: roomCounts.maintenance.toString(),
      icon: IconTools,
      color: "red",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=200&fit=crop",
      status: "Under Repair",
      trend: roomCounts.maintenance > 0 ? "+" + roomCounts.maintenance : 0,
    },
  ];

  if (isLoading) {
    return (
      <Grid>
        {[1, 2, 3].map((index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
            <Skeleton height={200} radius="md" animate />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
     <Error name={"Room un available"} error={error}/>
    );
  }

  console.log("Room counts:", roomCounts);

  return (
    <Grid>
      {roomsData.map((item, index) => (
        <Grid.Col
          key={index}
          span={{ base: 12, sm: 6, lg: 4 }}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="700"
          data-aos-delay={index * 100}
        >
          <PerformanceRoomCard item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default RoomPerformanceCards;