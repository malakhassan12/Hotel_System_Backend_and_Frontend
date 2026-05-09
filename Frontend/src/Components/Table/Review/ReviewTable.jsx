import React, { useState } from "react";
import {
  Table,
  Badge,
  Rating,
  Text,
  Group,
  Paper,
  Stack,
  Flex,
  Card,
  Divider,
  ActionIcon,
  Pagination,
  Space,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import useGetAllRoomsReviews from "../../../Hooks/Review/useGetAllRoomsReviews";
import NoData from "../../Empty/NoData";

const ReviewTable = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data = [] } = useGetAllRoomsReviews();
  const finalData = Array.isArray(data) ? data : [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this to adjust items per page

  const reviewsByRoom = finalData?.reduce((acc, item) => {
    const roomId = item.room.id;
    if (!acc[roomId]) {
      acc[roomId] = {
        room: item.room,
        reviews: [],
      };
    }
    acc[roomId].reviews.push(item.review);
    return acc;
  }, {});

  const roomReviewsArray = Object.values(reviewsByRoom || {});

  // Pagination logic
  const totalPages = Math.ceil(roomReviewsArray.length / itemsPerPage);
  const paginatedRooms = roomReviewsArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle click on review ID
  const handleReviewClick = (roomId, roomReviews) => {
    // Navigate to room reviews page and pass reviews data
    navigate(`/admin/reviews/${roomId}`, {
      state: {
        reviews: roomReviews,
        room: roomReviewsArray.find((r) => r.room.id === roomId)?.room,
      },
    });
  };

  if (roomReviewsArray.length === 0) {
    return <NoData name={"No reviews available"} />;
  }

  // Mobile Card View with Pagination
  if (isMobile) {
    return (
      <Stack gap="md">
        {paginatedRooms.map((item) => (
          <Card
            key={item.room.id}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Card.Section withBorder inheritPadding py="xs" mb="md">
              <Flex justify="space-between" wrap="wrap" gap="xs">
                <Badge
                  size="lg"
                  color="blue"
                  variant="subtle"
                  onClick={() => handleReviewClick(item.room.id, item.reviews)}
                  style={{ cursor: "pointer" }}
                >
                  Room #{item.room.roomNumber}
                </Badge>
                <Badge variant="light">{item.room.roomType}</Badge>
              </Flex>
              <Flex justify="space-between" wrap="wrap" gap="xs" mt="xs">
                <Badge variant="outline">
                  ${item.room.pricePerNight}/night
                </Badge>
                <Flex gap="xs" wrap="wrap">
                  {item.room.oceanView && <Badge size="sm">🌊 Ocean</Badge>}
                  {item.room.kingBed && <Badge size="sm">🛏️ King</Badge>}
                  {item.room.balcony && <Badge size="sm">🌅 Balcony</Badge>}
                  {item.room.wifi && <Badge size="sm">📶 WiFi</Badge>}
                </Flex>
              </Flex>
            </Card.Section>

            <Stack gap="sm">
              {item.reviews.map((review) => (
                <React.Fragment key={review.id}>
                  <Stack gap="xs">
                    <Flex justify="space-between" align="center" wrap="wrap">
                      <Flex gap="xs" align="center">
                        <Rating value={review.rating} readOnly size="sm" />
                        <Text size="sm" fw={500}>
                          {review.rating}/5
                        </Text>
                      </Flex>
                      <Badge variant="outline" size="sm">
                        User #{review.userId}
                      </Badge>
                    </Flex>

                    <Flex justify="space-between" align="center" wrap="wrap">
                      <Text size="xs" c="dimmed">
                        Review #{review.id} • {review.created_at}
                      </Text>
                    </Flex>
                  </Stack>
                  {item.reviews.indexOf(review) !== item.reviews.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Card>
        ))}

        {/* Pagination for Mobile */}
        {totalPages > 1 && (
          <>
            <Space h="md" />
            <Group justify="center">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                color="primary"
                radius="md"
                withEdges
                size="sm"
              />
            </Group>
            <Group justify="center" mt="xs">
              <Text size="xs" c="dimmed">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, roomReviewsArray.length)}{" "}
                of {roomReviewsArray.length} rooms
              </Text>
            </Group>
          </>
        )}
      </Stack>
    );
  }

  // Desktop Table View with Pagination
  return (
    <>
      <Paper shadow="sm" withBorder style={{ overflowX: "auto" }}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Review ID</Table.Th>
              <Table.Th>Room Details</Table.Th>
              <Table.Th>Rating</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedRooms.map((item) => (
              <React.Fragment key={item.room.id}>
                <Table.Tr>
                  <Table.Td colSpan={6}>
                    <Flex
                      direction={{ base: "column", sm: "row" }}
                      justify="space-between"
                      gap="xs"
                    >
                      <Group gap="xs" wrap="wrap">
                        <Badge
                          size="lg"
                          color="blue"
                          c="blue"
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() =>
                            handleReviewClick(item.room.id, item.reviews)
                          }
                        >
                          Room #{item.room.roomNumber}
                        </Badge>
                        <Badge variant="light">{item.room.roomType}</Badge>
                        <Badge variant="outline">
                          ${item.room.pricePerNight}/night
                        </Badge>
                      </Group>
                      <Group gap="xs" wrap="wrap">
                        {item.room.oceanView && (
                          <Badge size="sm">🌊 Ocean View</Badge>
                        )}
                        {item.room.kingBed && (
                          <Badge size="sm">🛏️ King Bed</Badge>
                        )}
                        {item.room.balcony && (
                          <Badge size="sm">🌅 Balcony</Badge>
                        )}
                        {item.room.wifi && <Badge size="sm">📶 WiFi</Badge>}
                      </Group>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
                {item.reviews.map((review) => (
                  <Table.Tr key={review.id}>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Text>Review #{review.id}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        Room #{item.room.roomNumber}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Rating value={review.rating} readOnly size="sm" />
                        <Text size="sm" fw={500}>
                          {review.rating}/5
                        </Text>
                      </Group>
                    </Table.Td>

                    <Table.Td>
                      <Badge variant="outline">ID: {review.userId}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
                        {review.created_at}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </React.Fragment>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Pagination for Desktop */}
      {totalPages > 1 && (
        <>
          <Space h="lg" />
          <Group justify="center">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              color="primary"
              radius="md"
              withEdges
              size="md"
            />
          </Group>
          <Group justify="center" mt="xs">
            <Text size="xs" c="dimmed">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, roomReviewsArray.length)} of{" "}
              {roomReviewsArray.length} rooms
            </Text>
          </Group>
        </>
      )}

      {/* Show total count even without pagination */}
      {roomReviewsArray.length > 0 && totalPages <= 1 && (
        <Group justify="center" mt="md">
          <Text size="xs" c="dimmed">
            Total {roomReviewsArray.length} room{roomReviewsArray.length !== 1 ? "s" : ""} with reviews
          </Text>
        </Group>
      )}
    </>
  );
};

export default ReviewTable;