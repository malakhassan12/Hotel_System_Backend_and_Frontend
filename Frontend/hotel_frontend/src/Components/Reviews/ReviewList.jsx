import { Stack, Text } from "@mantine/core";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return <Text c="dimmed" ta="center" py="xl">No reviews yet</Text>;
  }

  return (
    <Stack gap="md">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </Stack>
  );
};

export default ReviewList;