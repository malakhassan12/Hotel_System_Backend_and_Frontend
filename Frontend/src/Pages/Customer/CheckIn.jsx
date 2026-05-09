import {
  Container,
  Card,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import useBookingStore from "../../Store/bookingStore";
import useCreditForm from "../../hooks/useCreditForm";
import { validatePayment } from "../../validators/paymentValidator";

const CheckIn = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { myBookings, updateBookingStatus } = useBookingStore();

  const booking = myBookings.find(
    (item) =>
      String(item.id) === String(bookingId) ||
      String(item.bookingId) === String(bookingId)
  );

  const {
    cardNumber,
    holderName,
    expiryDate,
    cvv,
    setHolderName,
    handleCardNumber,
    handleExpiry,
    handleCVV,
  } = useCreditForm();

  if (!booking) {
    return (
      <Container py="xl">
        <Text>Booking not found</Text>
      </Container>
    );
  }

  const handleConfirm = () => {
    const error = validatePayment({
      cardNumber,
      holderName,
      expiryDate,
      cvv,
    });

    if (error) {
      alert(error);
      return;
    }

    updateBookingStatus(booking.id, "checked-in");
    navigate("/customer/my-bookings");
  };

  return (
    <Container size="sm" py="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={2}>Check In</Title>

          <Text fw={500}>
            Booking ID: {booking.bookingId || booking.id}
          </Text>

          <Text>
            Check-In: {booking.checkIn}
          </Text>

          <Text>
            Check-Out: {booking.checkOut}
          </Text>

          <Text fw={600}>
            Total: ${booking.total}
          </Text>

          <Title order={4} mt="sm">
            Payment Details
          </Title>

          <TextInput
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) =>
              handleCardNumber(e.target.value)
            }
          />

          <TextInput
            label="Card Holder Name"
            placeholder="John Doe"
            value={holderName}
            onChange={(e) =>
              setHolderName(e.target.value)
            }
          />

          <Group grow>
            <TextInput
              label="Expiry Date"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) =>
                handleExpiry(e.target.value)
              }
            />

            <TextInput
              label="CVV"
              placeholder="123"
              value={cvv}
              onChange={(e) =>
                handleCVV(e.target.value)
              }
            />
          </Group>

          <Group justify="flex-end" mt="md">
            <Button onClick={handleConfirm}>
              Confirm Check In
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};

export default CheckIn;