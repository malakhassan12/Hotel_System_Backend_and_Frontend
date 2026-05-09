import { Card, Group, Text, Badge, Avatar, Stack } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const ReviewItem = ({ review }) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group justify="space-between" align="flex-start">
        <Group>
          <Avatar radius="xl" color="blue">
            {review.userName[0]}
          </Avatar>
          <Stack gap={2}>
            <Text fw={600}>{review.userName}</Text>
            <Text size="sm" c="dimmed">{review.date}</Text>
          </Stack>
        </Group>

        <Group gap={2}>
          {Array(5).fill(0).map((_, i) => (
            <IconStar
              key={i}
              size={18}
              fill={i < review.rating ? "#f59e0b" : "none"}
              color="#f59e0b"
            />
          ))}
        </Group>
      </Group>

      <Text mt="md" size="sm" c="dimmed" lineClamp={3}>
        {review.comment}
      </Text>

      {review.roomName && (
        <Badge mt="md" color="gray" variant="light">
          {review.roomName}
        </Badge>
      )}
    </Card>
  );
};

export default ReviewItem;