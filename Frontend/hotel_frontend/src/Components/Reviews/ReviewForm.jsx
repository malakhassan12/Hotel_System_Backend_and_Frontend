import { Button, Stack, Textarea, Group, Title } from "@mantine/core";
import { useState } from "react";
import { IconStar } from "@tabler/icons-react";
const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

   onSubmit({ rating, comment });
   setRating(5);
   setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <Title order={4}>Write a Review</Title>

        <Group>
          {[1,2,3,4,5].map((star) => (
            <Button
              key={star}
              variant={rating >= star ? "filled" : "light"}
              color="gold"
              onClick={() => setRating(star)}
              size="sm"
            >
              <IconStar />
            </Button>
          ))}
        </Group>

        <Textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minRows={4}
          required
        />

        <Button type="submit" color="gold" fullWidth>
          Submit Review
        </Button>
      </Stack>
    </form>
  );
};

export default ReviewForm;