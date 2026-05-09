import React from "react";
import useGetReviewByRoom from "../../../Hooks/Review/useGetReviewByRoom";
import {
  Paper,
  Stack,
  Text,
  Title,
  Group,
  Rating,
  Avatar,
  Divider,
  Box,
  SimpleGrid,
  ThemeIcon,
  Skeleton,
  Center,
  Badge,
  ScrollArea,
  Container,
  Card,
  Progress,
  Space,
} from "@mantine/core";
import {
  IconStar,
  IconStarFilled,
  IconUser,
  IconCalendar,
  IconMessageCircle,
  IconStarHalf,
  IconQuote,
  IconThumbUp,
  IconChartBar,
} from "@tabler/icons-react";
import NoData from "../../Empty/NoData";
import Loading from "../../Loader/Loading";
import useGetAVGReviewsByRoom from "../../../Hooks/Review/useGetAVGReviewsByRoom";
import dayjs from "dayjs";
import getRatingLabel from "../../../Utils/Review/getStatusConfigReview";
import useCanReview from "../../../Hooks/Customer/useCanReview";
import ReviewForm from "../../Forms/ReviewForm";
import ReviewActionsCard from "./ReviewActionsCard"; // Import the new component
import useAuthStore from "../../../Store/authStore";

const ReviewCard = ({ roomId }) => {
  const { data, isLoading, error, refetch } = useGetReviewByRoom(roomId);
  const { data: avg } = useGetAVGReviewsByRoom(roomId);
  const { data: canReview } = useCanReview(roomId);
  const { user } = useAuthStore(); // Get current user

  console.log(canReview);
  console.log(avg);
  
  // Handle different API response structures
  const reviews =
    data?.reviews || (Array.isArray(data) ? data : data ? [data] : []);

  console.log(reviews);
  const totalReviews = data?.total_reviews || reviews.length;
  const averageRating =
    avg ||
    data?.average_rating ||
    (reviews.length > 0
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        reviews.length
      : 0);

  // Count rating distribution
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const handleReviewUpdate = () => {
    refetch(); // Refresh reviews after update/delete
  };

  if (isLoading) {
    return <Loading name={"Reviews"} />;
  }

  if (error) {
    return <Error name={"Reviews"} error={error} />;
  }

 
  return (
    <>
      {/* Show Review Form if user can review */}
      {canReview && <ReviewForm roomId={roomId} onSuccess={handleReviewUpdate} />}

      {reviews.length === 0 ? (
        <NoData name={"Reviews"} />
      ) : (
        <>
          {/* Header Section */}
          <Group justify="space-between" align="center" mb="xl" wrap="wrap">
            <Group gap="sm">
              <ThemeIcon size="lg" radius="md" color="primary" variant="light">
                <IconStar size={18} />
              </ThemeIcon>
              <Title order={3}>Guest Reviews</Title>
            </Group>
            <Badge size="lg" radius="xl" color="primary" variant="filled">
              {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
            </Badge>
          </Group>

          {/* Rating Summary Card */}
          <Card withBorder radius="lg" p="xl" mb="xl" shadow="sm">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {/* Left: Average Rating */}
              <Stack
                align="center"
                justify="center"
                gap="xs"
                style={{ textAlign: "center" }}
              >
                <Text
                  size="xs"
                  c="dimmed"
                  tt="uppercase"
                  fw={600}
                  letterSpacing={1}
                >
                  Overall Rating
                </Text>
                <Group gap={4} align="baseline">
                  <Text size="3.5rem" fw={800} c="primary">
                    {averageRating.toFixed(1)}
                  </Text>
                  <Text size="sm" c="dimmed">
                    / 5
                  </Text>
                </Group>
                <Rating value={averageRating} fractions={2} readOnly size="lg" />
                <Group gap={4} mt="xs">
                  <IconThumbUp size={14} color="var(--mantine-color-green-6)" />
                  <Text size="xs" c="dimmed">
                    Based on {totalReviews} guest reviews
                  </Text>
                </Group>
              </Stack>

              {/* Right: Rating Distribution */}
              <Stack gap="sm">
                <Text size="sm" fw={600} c="dimmed" tt="uppercase">
                  Rating Distribution
                </Text>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingCounts[star];
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <Group key={star} gap="sm" wrap="nowrap">
                      <Group gap={4} style={{ width: 55 }}>
                        <Text size="sm" fw={600}>
                          {star}
                        </Text>
                        <IconStar size={14} color="#fab005" fill="#fab005" />
                      </Group>
                      <div style={{ flex: 1 }}>
                        <Progress
                          value={percentage}
                          size="md"
                          radius="xl"
                          color={
                            star >= 4
                              ? "green"
                              : star === 3
                              ? "yellow"
                              : "orange"
                          }
                          striped={star <= 2}
                          animated={star === 5}
                        />
                      </div>
                      <Text size="xs" fw={500} style={{ width: 45 }} ta="right">
                        {count}
                      </Text>
                    </Group>
                  );
                })}
              </Stack>
            </SimpleGrid>
          </Card>
        </>
      )}

      {/* Reviews List with Scroll Area */}
      <Card withBorder radius="lg" p={0} shadow="sm">
        <Group
          p="md"
          style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
        >
          <IconMessageCircle size={18} />
          <Text fw={600}>All Reviews ({totalReviews})</Text>
        </Group>

        <ScrollArea.Autosize mah={500} type="scroll" offsetScrollbars>
          <Stack gap={0}>
            {reviews.map((review, index) => {
              const ratingLabel = getRatingLabel(review.rating);
              const isCurrentUserReview = review.userId === user?.userId;
              
              return (
                <Box
                  key={review.id || index}
                  p="xl"
                  style={{
                    borderBottom:
                      index < reviews.length - 1
                        ? "1px solid var(--mantine-color-gray-2)"
                        : "none",
                    transition: "all 0.2s ease",
                    backgroundColor:
                      index % 2 === 0
                        ? "var(--mantine-color-body)"
                        : "var(--mantine-color-pink-1)",
                  }}
                >
                  {/* Review Header */}
                  <Group
                    justify="space-between"
                    align="flex-start"
                    mb="md"
                    wrap="wrap"
                  >
                    <Group gap="md">
                      <Avatar
                        size={48}
                        radius="xl"
                        color="primary"
                        variant="light"
                      >
                        <IconUser size={24} />
                      </Avatar>
                      <div>
                        <Group gap={8} mb={4} wrap="wrap">
                          <Badge
                            size="md"
                            radius="xl"
                            color={ratingLabel.color}
                            variant="light"
                          >
                            {ratingLabel.text}
                          </Badge>
                          <Group gap={4}>
                            <Rating value={review.rating} readOnly size="sm" />
                            <Text size="sm" fw={600}>
                              {review.rating}.0
                            </Text>
                          </Group>
                        </Group>
                        <Group gap={6}>
                          <IconCalendar
                            size={12}
                            color="var(--mantine-color-dimmed)"
                          />
                          <Text size="xs" c="dimmed">
                            Reviewed on{" "}
                            {dayjs(review.created_at).format("MMMM DD, YYYY")}
                          </Text>
                        </Group>
                      </div>
                    </Group>

                    <Group gap="xs">
                      {review.rating === 5 && (
                        <ThemeIcon
                          size="lg"
                          radius="xl"
                          color="green"
                          variant="light"
                        >
                          <IconThumbUp size={16} />
                        </ThemeIcon>
                      )}
                      
                      {/* Show Edit/Delete buttons only for current user's review */}
                      {isCurrentUserReview && (
                        <ReviewActionsCard 
                          review={review} 
                          onUpdateSuccess={handleReviewUpdate}
                          onDeleteSuccess={handleReviewUpdate}
                        />
                      )}
                    </Group>
                  </Group>

                  {/* Review Comment with Quote Icon */}
                  <Box pl={{ base: 0, sm: 60 }}>
                    <Group align="flex-start" gap="sm" wrap="nowrap">
                      <IconQuote
                        size={24}
                        color="var(--mantine-color-gray-4)"
                        style={{ flexShrink: 0 }}
                      />
                      <Text size="md" c="dimmed" lh={1.7} italic>
                        "{review.comment || "No comment provided"}"
                      </Text>
                    </Group>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </ScrollArea.Autosize>

        {/* Footer with scroll indicator */}
        {totalReviews > 3 && (
          <Group
            justify="center"
            p="md"
            bg="var(--mantine-color-gray-0)"
            style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
          >
            <IconChartBar size={14} />
            <Text size="xs" c="dimmed">
              Scroll to see all {totalReviews} reviews
            </Text>
          </Group>
        )}
      </Card>
    </>
  );
};

export default ReviewCard;