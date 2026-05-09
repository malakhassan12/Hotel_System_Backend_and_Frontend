import { Card, Image, Text, Title, Group, Badge, Stack, ThemeIcon, Divider, SimpleGrid, Box } from "@mantine/core";
import {
  IconBeach,
  IconBed,
  IconDeviceTv,
  IconGlass,
  IconHome,
  IconTree,
  IconUsers,
  IconWifi,
} from "@tabler/icons-react";

const BookingSummaryCard = ({ data , totalPrice }) => {
  
  // Amenities list
  const amenities = [
    { label: "Ocean View", value: data.oceanView, icon: IconBeach },
    { label: "King Bed", value: data.kingBed, icon: IconBed },
    { label: "Balcony", value: data.balcony, icon: IconTree },
    { label: "Mini Bar", value: data.miniBar, icon: IconGlass },
    { label: "WiFi", value: data.wifi, icon: IconWifi },
    { label: "Smart TV", value: data.smartTv, icon: IconDeviceTv },
  ];
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Card.Section withBorder inheritPadding py="xs" >
        <Group justify="space-between">
          <Title order={2} size="h3">
            Room Details
          </Title>
          <Badge
            size="lg"
            color={data.status === "AVAILABLE" ? "green" : "red"}
            variant="filled"
          >
            {data.status}
          </Badge>
        </Group>
      </Card.Section>

      <Stack gap="md" mt="md">
        {/* Room Number and Type */}
        <Group justify="apart">
          <Group gap="xs">
            <ThemeIcon color="blue" variant="light" size="md">
              <IconHome size={16} />
            </ThemeIcon>
            <Text fw={500}>Room Number:</Text>
          </Group>
          <Badge size="lg" variant="outline" color="blue">
            {data.roomNumber}
          </Badge>
        </Group>

        <Group justify="apart">
          <Group gap="xs">
            <ThemeIcon color="green" variant="light" size="md">
              <IconBed size={16} />
            </ThemeIcon>
            <Text fw={500}>Room Type:</Text>
          </Group>
          <Badge size="lg" color="green">
            {data.roomType}
          </Badge>
        </Group>

        <Group justify="apart">
          <Group gap="xs">
            <ThemeIcon color="orange" variant="light" size="md">
              <IconUsers size={16} />
            </ThemeIcon>
            <Text fw={500}>Max Guests:</Text>
          </Group>
          <Text fw={600}>{data.maxNumberOfUsers} people</Text>
        </Group>

        <Divider my="xs" />

        {/* Amenities */}
        {amenities.some((a) => a.value) && (
          <>
            <Text fw={600} size="sm">
              Amenities:
            </Text>
            <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="xs">
              {amenities.map(
                (amenity) =>
                  amenity.value && (
                    <Group key={amenity.label} gap="xs">
                      <ThemeIcon
                        color="teal"
                        variant="light"
                        size="xs"
                        radius="xl"
                      >
                        <amenity.icon size={12} />
                      </ThemeIcon>
                      <Text size="sm">{amenity.label}</Text>
                    </Group>
                  ),
              )}
            </SimpleGrid>
            <Divider my="xs" />
          </>
        )}

        {/* Price */}
        <Group justify="apart">
          <Text fw={600} size="lg">
            Price per Night:
          </Text>
          <Text fw={700} size="xl" c="blue">
            ${data.pricePerNight}
          </Text>
        </Group>

         <Group justify="apart">
          <Text fw={600} size="lg">
            Total:
          </Text>
          <Text fw={700} size="xl" c="blue">
            ${totalPrice}
          </Text>
        </Group>
        

        {/* Description */}
        {data.description && (
          <>
            <Divider my="xs" />
            <Box>
              <Text fw={600} size="sm" mb="xs">
                Description:
              </Text>
              <Text size="sm" c="dimmed" lh={1.5}>
                {data.description}
              </Text>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default BookingSummaryCard;
