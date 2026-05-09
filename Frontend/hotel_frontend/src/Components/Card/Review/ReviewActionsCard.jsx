import React, { useState } from "react";
import {
  ActionIcon,
  Tooltip,
  Modal,
  Stack,
  Text,
  Rating,
  Textarea,
  Button,
  Group,
  Title,
  Box,
} from "@mantine/core";
import { IconPencil, IconTrash, IconStar, IconSend } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import useEditReview from "../../../Hooks/Review/useEditReview";
import useDeleteReview from "../../../Hooks/Review/useDeleteReview";

const ReviewActionsCard = ({ review, onUpdateSuccess, onDeleteSuccess }) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment || "");
  const [hoveredRating, setHoveredRating] = useState(0);

  const { mutate: updateReview, isPending: isUpdating } = useEditReview();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const getRatingText = (value) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return texts[value] || "";
  };

  const handleUpdate = () => {
    if (rating === 0) {
      notifications.show({
        title: "Error",
        message: "Please select a rating",
        color: "red",
      });
      return;
    }

    updateReview(
      {
        reviewId: review.id,
        rating: rating,
        comment: comment.trim() || "No comment provided",
      },
      {
        onSuccess: () => {
          setEditModalOpened(false);
          notifications.show({
            title: "Success",
            message: "Review updated successfully!",
            color: "green",
          });
          if (onUpdateSuccess) onUpdateSuccess();
        },
      },
    );
  };

  const handleDelete = () => {
    deleteReview(review.id, {
      onSuccess: () => {
        setDeleteModalOpened(false);
        notifications.show({
          title: "Success",
          message: "Review deleted successfully!",
          color: "green",
        });
        if (onDeleteSuccess) onDeleteSuccess();
      },
    });
  };

  return (
    <>
      {/* Edit and Delete Buttons */}
      <Group gap="xs">
        <Tooltip label="Edit Review">
          <ActionIcon
            variant="light"
            color="blue"
            size="md"
            onClick={() => setEditModalOpened(true)}
          >
            <IconPencil size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete Review">
          <ActionIcon
            variant="light"
            color="red"
            size="md"
            onClick={() => setDeleteModalOpened(true)}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {/* Edit Review Modal */}
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        size="lg"
        padding="xl"
        radius="lg"
        title={
          <Group gap="sm">
            <IconPencil size={24} color="#228be6" />
            <Title order={3}>Edit Your Review</Title>
          </Group>
        }
        centered
      >
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
              />
              {hoveredRating > 0 && (
                <Text size="sm" c="dimmed" fw={500}>
                  {getRatingText(hoveredRating)}
                </Text>
              )}
              {rating > 0 && !hoveredRating && (
                <Text size="sm" c="dimmed" fw={500}>
                  Current: {getRatingText(rating)}
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
              placeholder="Update your review..."
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              minRows={4}
              maxRows={8}
              autosize
            />
            <Text size="xs" c="dimmed" mt={4} ta="right">
              {comment.length} characters
            </Text>
          </Box>

          {/* Action Buttons */}
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setEditModalOpened(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              loading={isUpdating}
              disabled={rating === 0}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              leftSection={<IconSend size={18} />}
            >
              {isUpdating ? "Updating..." : "Update Review"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Review Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        size="md"
        padding="xl"
        radius="lg"
        title={
          <Group gap="sm">
            <IconTrash size={24} color="#fa5252" />
            <Title order={3}>Delete Review</Title>
          </Group>
        }
        centered
      >
        <Stack gap="lg">
          <Text size="sm">
            Are you sure you want to delete your review? This action cannot be
            undone.
          </Text>

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setDeleteModalOpened(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              loading={isDeleting}
              color="red"
              leftSection={<IconTrash size={18} />}
            >
              {isDeleting ? "Deleting..." : "Delete Review"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default ReviewActionsCard;
