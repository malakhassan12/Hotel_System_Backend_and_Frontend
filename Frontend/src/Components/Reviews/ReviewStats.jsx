import { Group, Text, Stack, Progress } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const ReviewStats = ({ averageRating, totalReviews, ratingBreakdown }) => {
  return (
    <Stack gap="md">
      <Group align="center">
        <Text size="xl" fw={700}>{averageRating}</Text>
        <Group gap={2}>
          {Array(5).fill(0).map((_, i) => (
            <IconStar key={i} size={22} fill={i < Math.floor(averageRating) ? "#f59e0b" : "none"} color="#f59e0b" />
          ))}
        </Group>
        <Text c="dimmed">({totalReviews} reviews)</Text>
      </Group>

      <Stack gap="xs">
        {ratingBreakdown.map((item) => (
          <Group key={item.stars} align="center" gap="xs">
            <Text size="sm" w={20}>{item.stars}</Text>
            <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
            <Progress value={(item.count / totalReviews) * 100} style={{ flex: 1 }} color="gold" size="sm" />
            <Text size="sm" c="dimmed" w={30}>{item.count}</Text>
          </Group>
        ))}
      </Stack>
    </Stack>
  );
};

export default ReviewStats;