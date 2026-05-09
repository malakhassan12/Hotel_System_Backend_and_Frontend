import React, { useState } from "react";
import {
  Container,
  Paper,
  Button,
  Stack,
  Alert,
  Title,
  Text,
  Group,
  ThemeIcon,
  Divider,
  Box,
  Loader,
  Card,
  SimpleGrid,
  Badge,
} from "@mantine/core";
import {
  IconCreditCard,
  IconLock,
  IconShieldLock,
  IconCircleCheck,
  IconAlertCircle,
  IconWallet,
  IconBuildingBank,
} from "@tabler/icons-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUser from "../../Hooks/User/useGetUser";
import useAuthStore from "../../Store/authStore";
import usePaymentMutations from "../../Hooks/Payement/usePaymentMutations";

const CreatePayment = () => {
  const { user } = useAuthStore();
  const { data: finalUser } = useGetUser(user?.userId);
  const { makeConfirmMutation } = usePaymentMutations();

  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    try {
      if (!stripe || !elements) {
        setError("Payment system is initializing. Please try again.");
        setIsProcessing(false);
        return;
      }

      if (!clientSecret) {
        setError("Missing payment information. Please try again.");
        setIsProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card details not found.");
        setIsProcessing(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        makeConfirmMutation.mutate({
          paymentIntentId: result.paymentIntent.id,
          customerName: finalUser?.username,
          customerEmail: finalUser?.email,
          customerPhone: finalUser?.phone || "01000000000",
        });

        setSuccess(true);

        setTimeout(() => {
          navigate("/customer");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Container size="md" py="xl">
        {/* Header Section */}
        <Stack align="center" mb="xl">
          <ThemeIcon
            size={80}
            radius="xl"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 135 }}
            style={{ boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }}
          >
            <IconCreditCard size={45} stroke={1.5} />
          </ThemeIcon>
          <Title
            order={1}
            ta="center"
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Secure Payment
          </Title>
          <Text size="lg" opacity={0.9} ta="center">
            Complete your booking with secure payment
          </Text>
        </Stack>

        {/* Main Payment Card */}
        <Card
          shadow="xl"
          radius="lg"
          p="xl"
          withBorder
          style={{
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          <Stack gap="lg">
            {/* Security Badges */}
            <Group justify="center" gap="md" mb="xs">
              <Badge
                size="lg"
                variant="light"
                leftSection={<IconLock size={14} />}
              >
                SSL Secure
              </Badge>
              <Badge
                size="lg"
                variant="light"
                leftSection={<IconShieldLock size={14} />}
              >
                PCI Compliant
              </Badge>
            </Group>

            <Divider
              label="Payment Details"
              labelPosition="center"
              size="sm"
              color="gray"
            />

            {/* Card Element */}
            <Paper
              p="md"
              withBorder
              style={{
                borderRadius: "12px",
                border: "1px solid #e9ecef",
              }}
              bg="success.1"
            >
              <Stack gap="xs">
                <Group gap="xs">
                  <IconCreditCard size={18} />
                  <Text size="sm" fw={600} c="dimmed">
                    Card Information
                  </Text>
                </Group>
                <Box style={{ minHeight: "80px" }}>
                  <CardElement />
                </Box>
              </Stack>
            </Paper>

            {/* Payment Methods Icons */}
            <Group justify="center" gap="xs" mt="xs">
              <IconBuildingBank size={24} />
              <IconWallet size={24} />
              <Text size="xs" c="dimmed">
                Visa • Mastercard • Amex
              </Text>
            </Group>

            <Divider />

            {/* Amount Section (if you have amount data) */}
            <SimpleGrid cols={2} spacing="md">
              <Paper p="sm" withBorder radius="md">
                <Text size="xs" c="dimmed" ta="center">
                  Total Amount
                </Text>
                <Text size="xl" fw={800} c="blue.7" ta="center">
                  $299.00
                </Text>
              </Paper>
              <Paper p="sm" withBorder radius="md">
                <Text size="xs" c="dimmed" ta="center">
                  Booking ID
                </Text>
                <Text size="sm" fw={600} ta="center">
                  #{Math.floor(Math.random() * 100000)}
                </Text>
              </Paper>
            </SimpleGrid>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              loading={isProcessing}
              disabled={isProcessing || success}
              size="lg"
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              leftSection={
                !isProcessing ? (
                  <IconLock size={18} />
                ) : (
                  <Loader size="sm" color="white" />
                )
              }
            >
              {isProcessing
                ? "Processing Payment..."
                : success
                  ? "Payment Successful!"
                  : "Pay Now"}
            </Button>

            {/* Success Alert */}
            {success && (
              <Alert
                icon={<IconCircleCheck size={20} />}
                title="Payment Successful!"
                color="green"
                variant="filled"
                radius="md"
                withCloseButton
                onClose={() => setSuccess(false)}
              >
                <Text size="sm">
                  Your payment has been processed successfully. Redirecting to
                  dashboard...
                </Text>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert
                icon={<IconAlertCircle size={20} />}
                title="Payment Failed"
                color="red"
                variant="light"
                radius="md"
                withCloseButton
                onClose={() => setError("")}
              >
                <Text size="sm">{error}</Text>
                <Text size="xs" mt="xs" c="dimmed">
                  Please check your card details and try again.
                </Text>
              </Alert>
            )}

            {/* Security Notice */}
            <Group justify="center" gap="xs" mt="md">
              <IconShieldLock size={16} color="#6c757d" />
              <Text size="xs" c="dimmed" ta="center">
                Your payment information is encrypted and secure. We never store
                your card details.
              </Text>
            </Group>
          </Stack>
        </Card>

        {/* Footer */}
        <Text size="xs" c="white" opacity={0.7} ta="center" mt="xl">
          © 2024 Your Company. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default CreatePayment;
