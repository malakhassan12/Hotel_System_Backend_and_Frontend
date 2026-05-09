import { Card, TextInput, Button, Stack, Title, Text, Group } from "@mantine/core";
import { useState } from "react";

const CheckInPaymentForm = ({ booking, onPaymentSuccess, loading }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) return;

    onPaymentSuccess();
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">Payment Details</Title>
      <Text c="dimmed" mb="lg">Total Amount: ${booking.total}</Text>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <Group grow>
            <TextInput
              label="Expiry Date (MM/YY)"
              placeholder="12/28"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <TextInput
              label="CVV"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </Group>

          <Button 
            type="submit" 
            size="lg" 
            radius="md" 
            fullWidth 
            loading={loading}
            color="green"
          >
            Pay ${booking.total} and Check In
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default CheckInPaymentForm;