import { Box, Text, Title } from "@mantine/core";

const InitialBox = ({ title, text }) => {
  return (
    <Box>
      <Title order={3} fw={"bold"}>
        {title}
      </Title>
      <Text c="dimmed"> {text}</Text>
    </Box>
  );
};

export default InitialBox;
