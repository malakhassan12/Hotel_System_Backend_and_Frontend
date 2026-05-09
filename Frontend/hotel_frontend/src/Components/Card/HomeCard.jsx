import { Card, Text, Box } from "@mantine/core";
const HomeCard = ({ item }) => {
  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="lg"
      style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "var(--mantine-shadow-lg)",
        },
      }}
    >
      <Box
        style={{
          backgroundColor: `var(--mantine-color-${item.color}-0)`,
          borderRadius: "12px",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        {item.icon}{" "}
      </Box>

      <Text fw={700} size="lg" mb="sm">
        {item.title}
      </Text>

      <Text size="sm" c="dimmed" lh={1.5}>
        {item.description}
      </Text>
    </Card>
  );
};

export default HomeCard;
