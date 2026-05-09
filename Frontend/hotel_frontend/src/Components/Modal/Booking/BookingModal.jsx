// ******************************** Mantline UI ********************************
import {
  Modal,
  Button,
  Group,
  Badge,
  Text,
  Divider,
  Grid,
  Stack,
  Paper,
} from "@mantine/core";
// ******************************** Icons ********************************
import {
  IconX,
  IconCheck,
  IconUser,
  IconMail,
  IconBed,
  IconUsers,
  IconCalendar,
  IconCreditCard,
  IconCurrencyDollar,
  IconPhone,
  IconDoor,
  IconWifi,
  IconBeach,
  IconGlass,
  IconDeviceTv,
} from "@tabler/icons-react";
// ******************************** Functions ********************************
import { mapBookingData } from "../../../Functions/Booking/bookingFunctions";
import useBookingMutations from "../../../Hooks/Employee/useBookingMutations";

const BookingModal = ({ opened, close, booking, type = "booking" }) => {
  const mappedData = mapBookingData(booking);
  console.log(booking)

  const { acceptBookingMutation, rejectBookingMutation } =
    useBookingMutations();

  const defaultData = {
    id: "N/A",
    status: "Pending",
    statusColor: "orange",
    statusLabel: "Pending",
    customer: null,
    customerName: "N/A",
    customerEmail: "N/A",
    customerPhone: "N/A",
    room: null,
    roomNumber: "N/A",
    roomType: "N/A",
    guests: 0,
    checkIn: "N/A",
    checkOut: "N/A",
    paymentMethod: "Online",
    paymentStatus: "Pending",
    totalAmount: "$0",
    pricePerNight: 0,
    roomFeatures: {},
  };

  const data = mappedData || defaultData;

  // Extract customer and room objects from mapped data
  const customerObj = data.customer || {};
  const roomObj = data.room || {};

  // Get features from room object if it exists
  const roomFeatures = {
    wifi: roomObj.wifi || false,
    smartTv: roomObj.smartTv || false,
    oceanView: roomObj.oceanView || false,
    balcony: roomObj.balcony || false,
    miniBar: roomObj.miniBar || false,
    kingBed: roomObj.kingBed || false,
  };

  const handleConfirmBooking = async (booking) => {
    acceptBookingMutation.mutate(booking?.id);
    close();
  };

  // Handle cancel booking
  const handleCancelBooking = async (booking) => {
    rejectBookingMutation.mutate(booking?.id);
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Group gap="sm">
          <Text size="lg" fw={700}>
            Booking Details
          </Text>
          <Badge size="lg" radius="xl" color={data.statusColor}>
            {data.status}
          </Badge>
        </Group>
      }
      size="lg"
      centered
      transitionProps={{
        transition: "fade",
        duration: 300,
        timingFunction: "ease",
      }}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Complete information about this booking
        </Text>

        <Divider />

        {/* Booking ID and Status */}
        <Group justify="space-between" align="center">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              Booking ID
            </Text>
            <Text size="xl" fw={700}>
              {data.id}
            </Text>
          </div>
          <Badge size="xl" radius="md" color={data.statusColor} variant="light">
            {data.status}
          </Badge>
        </Group>

        <Divider />

        {/* Customer Information */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Customer Information
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconUser size={16} />
                <Text size="sm" c="dimmed">
                  Customer Name
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {customerObj.username || data.customerName || "N/A"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMail size={16} />
                <Text size="sm" c="dimmed">
                  Email
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {customerObj.email || data.customerEmail || "N/A"}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group gap="xs">
                <IconPhone size={16} />
                <Text size="sm" c="dimmed">
                  Phone
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {data.phone || customerObj.phone || data.customerPhone || "N/A"}
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Room & Guests Information */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Room Details
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconDoor size={16} />
                <Text size="sm" c="dimmed">
                  Room Number
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {roomObj.roomNumber || data.roomNumber || "N/A"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconBed size={16} />
                <Text size="sm" c="dimmed">
                  Room Type
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {roomObj.roomType || data.roomType || "N/A"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconUsers size={16} />
                <Text size="sm" c="dimmed">
                  Guests
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {data.guests}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconCurrencyDollar size={16} />
                <Text size="sm" c="dimmed">
                  Price per Night
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                ${roomObj.pricePerNight || data.pricePerNight || "N/A"}
              </Text>
            </Grid.Col>
          </Grid>

          {/* Room Features */}
          {(roomFeatures.wifi ||
            roomFeatures.smartTv ||
            roomFeatures.oceanView ||
            roomFeatures.balcony ||
            roomFeatures.miniBar ||
            roomFeatures.kingBed) && (
            <>
              <Divider my="sm" />
              <Text size="xs" fw={600} mb="xs" c="dimmed">
                Room Features
              </Text>
              <Group gap="sm">
                {roomFeatures.wifi && (
                  <Badge
                    size="sm"
                    variant="light"
                    leftSection={<IconWifi size={12} />}
                  >
                    WiFi
                  </Badge>
                )}
                {roomFeatures.smartTv && (
                  <Badge
                    size="sm"
                    variant="light"
                    leftSection={<IconDeviceTv size={12} />}
                  >
                    Smart TV
                  </Badge>
                )}
                {roomFeatures.oceanView && (
                  <Badge
                    size="sm"
                    variant="light"
                    leftSection={<IconBeach size={12} />}
                  >
                    Ocean View
                  </Badge>
                )}
                {roomFeatures.balcony && (
                  <Badge size="sm" variant="light">
                    Balcony
                  </Badge>
                )}
                {roomFeatures.miniBar && (
                  <Badge
                    size="sm"
                    variant="light"
                    leftSection={<IconGlass size={12} />}
                  >
                    Mini Bar
                  </Badge>
                )}
                {roomFeatures.kingBed && (
                  <Badge size="sm" variant="light">
                    King Bed
                  </Badge>
                )}
              </Group>
            </>
          )}
        </Paper>

        {/* Dates Information */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Stay Period
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconCalendar size={16} />
                <Text size="sm" c="dimmed">
                  Check-In
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {data.checkIn}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconCalendar size={16} />
                <Text size="sm" c="dimmed">
                  Check-Out
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {data.checkOut}
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Payment Information */}
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <Text size="sm" fw={600} mb="md" c="primary">
            Payment Details
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconCreditCard size={16} />
                <Text size="sm" c="dimmed">
                  Payment Method
                </Text>
              </Group>
              <Text size="sm" fw={500}>
                {data.paymentMethod || "Online"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconCurrencyDollar size={16} />
                <Text size="sm" c="dimmed">
                  Payment Status
                </Text>
              </Group>
              <Badge
                size="sm"
                radius="xl"
                color={data.paymentColor || "orange"}
                variant="light"
              >
                {data.payment || data.paymentStatus || "Pending"}
              </Badge>
            </Grid.Col>
          </Grid>
          <Divider my="sm" />
          <Group justify="space-between">
            <Text size="sm" fw={600}>
              Total Amount
            </Text>
            <Text size="xl" fw={700} c="primary">
              {data.total}
            </Text>
          </Group>
        </Paper>

        <Divider />

        {/* Action Buttons - only show for type "booking" */}
        {type === "booking" && booking?.status == "pending" && (
          <Group justify="space-between" mt="md">
            <Button
              variant="outline"
              color="red"
              leftSection={<IconX size={16} />}
              onClick={() => handleCancelBooking(booking)}
              loading={rejectBookingMutation?.isPending}
            >
              Reject
            </Button>
            <Button
              variant="filled"
              color="green"
              leftSection={<IconCheck size={16} />}
              onClick={() => handleConfirmBooking(booking)}
              loading={acceptBookingMutation?.isPending}
            >
              Accept
            </Button>
          </Group>
        )}

        {/* For other types (e.g., "view") */}
        {type !== "booking" && (
          <Group justify="center" mt="md">
            <Button variant="filled" onClick={close}>
              Close
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  );
};

export default BookingModal;
