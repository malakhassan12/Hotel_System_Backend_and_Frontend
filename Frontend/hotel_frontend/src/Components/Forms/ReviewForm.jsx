import React, { useState } from "react";
import {
  Paper,
  Stack,
  Text,
  Title,
  Group,
  Rating,
  Button,
  Textarea,
  Card,
  Box,
  ThemeIcon,
  Alert,
} from "@mantine/core";
import { IconStar, IconPencil, IconInfoCircle } from "@tabler/icons-react";
import useAddReview from "../../Hooks/Review/useAddReview";
import { notifications } from "@mantine/notifications";

const ReviewForm = ({ roomId }) => {
  console.log(roomId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const { mutate: addReview, isPending } = useAddReview();

  const handleSubmit = () => {
    if (rating === 0) {
      notifications.show({
        title: "Error",
        message: "Please select a rating before submitting",
        color: "red",
      });
      return;
    }

    addReview(
      {
        rating: rating,
        comment: comment.trim() || "No comment provided",
      },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
        },
      },
    );
  };

  return (
    <Card withBorder radius="lg" p="xl" shadow="sm" mb="xl">
      <Group gap="sm" mb="md">
        <ThemeIcon size="lg" radius="md" color="primary" variant="light">
          <IconPencil size={18} />
        </ThemeIcon>
        <Title order={4}>Write Your Review</Title>
      </Group>

      <Alert
        icon={<IconInfoCircle size={16} />}
        title="Share your experience"
        color="blue"
        variant="light"
        mb="lg"
      >
        Your feedback helps other travelers make better decisions!
      </Alert>

      <Stack gap="lg">
        {/* Rating Section */}
        <Box>
          <Text size="sm" fw={600} mb={8}>
            Your Rating <span style={{ color: "red" }}>*</span>
          </Text>
          <Group gap="sm">
            <Rating
              value={rating}
              onChange={setRating}
              onHover={setHoveredRating}
              size="xl"
              fractions={1}
              emptySymbol={<IconStar size={32} stroke={1.5} />}
              fullSymbol={<IconStar size={32} fill="currentColor" />}
            />
            {hoveredRating > 0 && (
              <Text size="sm" c="dimmed" fw={500}>
                {getRatingText(hoveredRating)}
              </Text>
            )}
            {rating > 0 && !hoveredRating && (
              <Text size="sm" c="dimmed" fw={500}>
                Selected: {getRatingText(rating)}
              </Text>
            )}
          </Group>
        </Box>

        {/* Comment Section */}
        <Box>
          <Text size="sm" fw={600} mb={8}>
            Your Review
          </Text>
          <Textarea
            placeholder="Tell us about your experience... What did you like? What could be improved?"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            minRows={4}
            maxRows={8}
            autosize
            styles={{
              input: {
                fontSize: "14px",
                lineHeight: 1.6,
              },
            }}
          />
          <Text size="xs" c="dimmed" mt={4}>
            {comment.length} characters • Minimum 10 characters recommended
          </Text>
        </Box>

        {/* Submit Button */}
        <Group justify="flex-end">
          <Button
            onClick={handleSubmit}
            loading={isPending}
            disabled={rating === 0}
            variant="gradient"
            gradient={{ from: "primary", to: "cyan", deg: 90 }}
            size="md"
            leftSection={<IconStar size={18} />}
          >
            {isPending ? "Submitting Review..." : "Submit Review"}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

// Helper function to get rating text
const getRatingText = (rating) => {
  const texts = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
  return texts[rating] || "";
};

export default ReviewForm;
