import React from "react";
import { Paper, Group, Text, Stack, Center } from "@mantine/core";
import { IconMessages, IconStar } from "@tabler/icons-react";
import useGetStatusForReviews from "../../../Hooks/Review/useGetStatusForReviews";

const ReviewStatus = () => {
  const { data } = useGetStatusForReviews();
  const { totalReviews = 0, avgRating = 0 } = data || {};

 

  return (
    <Paper withBorder p="md" radius="md">
      <Group grow align="center">
        <Center>
          <Stack align="center" gap={5}>
            <IconMessages size={32} color="blue" />
            <Text size="sm" c="dimmed">Total Reviews</Text>
            <Text size="xxl" fw={700}>{totalReviews}</Text>
          </Stack>
        </Center>

        <Center>
          <Stack align="center" gap={5}>
            <IconStar size={32} color="gold" />
            <Text size="sm" c="dimmed">Average Rating</Text>
            <Group gap={5} align="center">
              <Text size="xxl" fw={700}>{avgRating}</Text>
              <Text size="sm">/5</Text>
            </Group>
          </Stack>
        </Center>
      </Group>
    </Paper>
  );
};

export default ReviewStatus;