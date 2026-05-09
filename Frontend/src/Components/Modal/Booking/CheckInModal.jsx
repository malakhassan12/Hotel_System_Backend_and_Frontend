import { Modal, TextInput, Button, Stack, Title, Group,Text } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const CheckInModal = ({ opened, onClose, booking, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmCheckIn = async () => {
    if (!cardNumber || !expiry || !cvv) {
      notifications.show({ title: "Missing Info", message: "Please fill all card details", color: "red" });
      return;
    }

    setLoading(true);

  
    await new Promise((resolve) => setTimeout(resolve, 1500));

    notifications.show({
      title: "Check-In Successful",
      message: `You are now checked into ${booking?.room}`,
      color: "green",
    });

    onSuccess?.();
    setLoading(false);
    onClose();
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={`Check-In - ${booking?.room || "Booking"}`} 
      size="md"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Booking ID: <strong>{booking?.id}</strong>
        </Text>

        <TextInput
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <Group grow>
          <TextInput
            label="Expiry (MM/YY)"
            placeholder="12/28"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <TextInput
            label="CVV"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Group>

        <Button 
          onClick={handleConfirmCheckIn} 
          loading={loading}
          fullWidth 
          color="green"
          size="lg"
        >
          Confirm Check-In & Pay
        </Button>
      </Stack>
    </Modal>
  );
};

export default CheckInModal;