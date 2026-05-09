import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  Stack, Flex, Rating, Text, Badge, Divider, Paper, Title, 
  Group, Button, SimpleGrid, RingProgress, Center, Progress 
} from '@mantine/core';
import { IconArrowLeft, IconStar, IconMessageCircle, IconUsers } from '@tabler/icons-react';
import useGetAllStatusReviewsForRoom from '../../Hooks/Review/useGetAllStatusReviewsForRoom';

const ReviewsPerRoom = () => {
  const { roomId } = useParams();
  const location = useLocation();
  
  // Get reviews from navigation state or from API
  const reviewsFromState = location.state?.reviews;
  const roomFromState = location.state?.room;
  
  // If no reviews in state, fetch from API
  const { data: apiData } = useGetAllStatusReviewsForRoom(roomId);
  
  // Use state data if available, otherwise use API data
  const reviews = reviewsFromState || (apiData?.recent_reviews || []);
  const room = roomFromState || apiData?.room;
  
  // Extract analysis data
  const totalReviews = apiData?.total_reviews || reviews.length || 0;
  const averageRating = apiData?.average_rating || 0;
  const ratingDistribution = apiData?.rating_distribution || {};
  
  // Calculate rating percentages for progress bars
  const getRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return (ratingDistribution[rating] || 0) / totalReviews * 100;
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Paper p="xl" withBorder>
        <Stack align="center" gap="md">
          <IconMessageCircle size={48} stroke={1.5} color="gray" />
          <Text ta="center" size="lg" c="dimmed">No reviews available for this room</Text>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack gap="md">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => window.history.back()}
        style={{ width: 'fit-content' }}
      >
        Back to Reviews
      </Button>

      {/* Room Information Header */}
      <Paper withBorder p="xl" radius="md" bg="gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
        <Title order={2} mb="md">
          Room #{room?.roomNumber || roomId} Reviews
        </Title>
        
        {room && (
          <Group mt="md" mb="lg" wrap="wrap">
            <Badge size="lg" color="blue" variant="filled">{room.roomType}</Badge>
            <Badge size="lg" variant="outline">${room.pricePerNight}/night</Badge>
            {room.oceanView && <Badge size="md" color="cyan">🌊 Ocean View</Badge>}
            {room.kingBed && <Badge size="md" color="grape">🛏️ King Bed</Badge>}
            {room.balcony && <Badge size="md" color="orange">🌅 Balcony</Badge>}
            {room.wifi && <Badge size="md" color="green">📶 WiFi</Badge>}
          </Group>
        )}
      </Paper>

      {/* Statistics Section */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        {/* Total Reviews Card */}
        <Paper withBorder p="md" radius="md">
          <Group align="flex-start">
            <IconMessageCircle size={32} color="#228be6" />
            <Stack gap={0} flex={1}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Reviews</Text>
              <Text size="xl" fw={700}>{totalReviews}</Text>
            </Stack>
          </Group>
        </Paper>

        {/* Average Rating Card */}
        <Paper withBorder p="md" radius="md">
          <Group align="flex-start">
            <IconStar size={32} color="#fab005" />
            <Stack gap={0} flex={1}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Average Rating</Text>
              <Group gap="xs" align="center">
                <Text size="xl" fw={700}>{averageRating.toFixed(1)}</Text>
                <Text size="sm" c="dimmed">/ 5</Text>
                <Rating value={averageRating} readOnly size="sm" />
              </Group>
            </Stack>
          </Group>
        </Paper>

        {/* Ring Progress Card */}
        <Paper withBorder p="md" radius="md">
          <Group align="center" justify="center">
            <RingProgress
              size={80}
              thickness={8}
              roundCaps
              sections={[{ value: (averageRating / 5) * 100, color: 'yellow' }]}
              label={
                <Center>
                  <Text size="xl" fw={700}>{averageRating.toFixed(1)}</Text>
                </Center>
              }
            />
            <Stack gap={0}>
              <Text size="xs" c="dimmed" fw={700}>Overall Rating</Text>
              <Text size="sm">out of 5 stars</Text>
            </Stack>
          </Group>
        </Paper>
      </SimpleGrid>

      {/* Rating Distribution Section */}
      {totalReviews > 0 && (
        <Paper withBorder p="xl" radius="md">
          <Title order={3} size="h4" mb="md">Rating Distribution</Title>
          <Stack gap="sm">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage = getRatingPercentage(rating);
              return (
                <Group key={rating} gap="sm" wrap="nowrap">
                  <Group gap="xs" style={{ width: 60 }}>
                    <Text size="sm" fw={500}>{rating}</Text>
                    <IconStar size={14} fill="#fab005" color="#fab005" />
                  </Group>
                  <div style={{ flex: 1 }}>
                    <Progress
                      value={percentage}
                      color={rating >= 4 ? "green" : rating === 3 ? "yellow" : "red"}
                      size="lg"
                      radius="xl"
                    />
                  </div>
                  <Text size="sm" c="dimmed" style={{ width: 50 }}>
                    ({count})
                  </Text>
                </Group>
              );
            })}
          </Stack>
        </Paper>
      )}

      {/* Reviews List Section */}
      <Paper withBorder p="xl" radius="md">
        <Group justify="space-between" mb="lg" wrap="wrap">
          <Title order={3} size="h4">All Reviews ({totalReviews})</Title>
          <Badge size="lg" variant="light" color="blue">
            {totalReviews} Review{totalReviews !== 1 ? 's' : ''}
          </Badge>
        </Group>

        <Divider mb="lg" />

        <Stack gap="md">
          {reviews.map((review, index) => (
            <React.Fragment key={review.id}>
              {index > 0 && <Divider my="sm" />}
              <Paper withBorder p="md" radius="md" shadow="sm">
                <Stack gap="xs">
                  <Flex justify="space-between" align="center" wrap="wrap">
                    <Flex gap="xs" align="center">
                      <Rating value={review.rating} readOnly size="sm" />
                      <Text size="sm" fw={700}>{review.rating}/5</Text>
                    </Flex>
                    <Badge variant="outline" size="sm" leftSection={<IconUsers size={12} />}>
                      User #{review.userId}
                    </Badge>
                  </Flex>
                  
                  <Text size="md" fw={500}>{review.comment}</Text>
                  
                  <Flex justify="space-between" align="center" wrap="wrap">
                    <Text size="xs" c="dimmed">
                      <IconMessageCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                      Review #{review.id}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Stack>
              </Paper>
            </React.Fragment>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ReviewsPerRoom;