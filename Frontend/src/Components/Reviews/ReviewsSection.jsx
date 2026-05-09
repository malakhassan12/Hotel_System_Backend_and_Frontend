import { Container, Title, Text, Stack, Group, Button } from "@mantine/core";
import { useState } from "react";

import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import ReviewStats from "./ReviewStats";

const ReviewsSection = ({
  title = "Reviews",
  subtitle = "What our guests say",
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  ratingBreakdown = [],
  isAdmin = false,
  roomName = null,
  onSubmitReview = null,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <Stack gap={2}>
            <Title order={1}>{title}</Title>
            <Text c="dimmed">{subtitle}</Text>
          </Stack>

          {!isAdmin && onSubmitReview && (
            <Button onClick={() => setShowForm(!showForm)} color="gold">
              {showForm ? "Cancel" : "Write a Review"}
            </Button>
          )}
        </Group>

        <ReviewStats 
          averageRating={averageRating} 
          totalReviews={totalReviews}
          ratingBreakdown={ratingBreakdown}
        />

        {showForm && onSubmitReview && (
          <ReviewForm 
            roomName={roomName} 
            onSubmit={(data) => {
              onSubmitReview(data);
              setShowForm(false);
            }} 
          />
        )}

        <ReviewList reviews={reviews} />
      </Stack>
    </Container>
  );
};

export default ReviewsSection;