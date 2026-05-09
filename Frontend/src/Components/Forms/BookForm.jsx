import {
  TextInput,
  Button,
  Stack,
  Title,
  Divider,
  Text,
  Group,
  Badge,
  ThemeIcon,
  Card,
  Grid,
  Alert,
} from "@mantine/core";

import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import {
  IconCalendar,
  IconCurrencyDollar,
  IconPhone,
  IconCreditCard,
  IconClock,
} from "@tabler/icons-react";
import useGetRoom from "../../Hooks/Room/useGetRoom";
import BookingSummaryCard from "../Card/Booking/BookingSummaryCard";
import { useForm } from "@mantine/form";
import useCreateBookingMutation from "../../Hooks/Customer/useCreateBookingMutations";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SendPaymentIntentBtn from "../Buttons/SendPaymentIntentBtn";
import useBookingHistory from "../../Hooks/Customer/useBookingHistory";
const BookForm = ({ roomId }) => {
  const { data = {} } = useGetRoom(roomId);

  const [showBTN, setShowBTN] = useState(false);
  const navigate = useNavigate();

  // Form with validation
  const form = useForm({
    validateInputOnChange: true,

    initialValues: {
      checkInDate: null,
      checkOutDate: null,
      phone: "",
    },
    validate: {
      checkInDate: (value) => {
        if (!value) return "Check-in date is required";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (value < today) return "Check-in date cannot be in the past";
        return null;
      },
      checkOutDate: (value, values) => {
        if (!value) return "Check-out date is required";
        if (values.checkInDate && value <= values.checkInDate) {
          return "Check-out date must be after check-in date";
        }
        return null;
      },
      phone: (value) => {
        if (!value) return "Phone number is required";
        if (!/^01[0-9]{9}$/.test(value)) {
          return "Enter a valid Egyptian phone (e.g., 01012345678)";
        }
        return null;
      },
    },
  });

  // Calculate total price and days
  const calculateTotal = () => {
    const { checkInDate, checkOutDate } = form.values;

    if (!checkInDate || !checkOutDate || !data?.pricePerNight) {
      return { days: 0, total: 0 };
    }

    const start = new Date(checkInDate).getTime();
    const end = new Date(checkOutDate).getTime();

    const diffTime = end - start;

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const total = days > 0 ? days * data.pricePerNight : 0;

    return { days, total };
  };
  const { mutate, isLoading } = useCreateBookingMutation();

  const { total: totalPrice } = calculateTotal();

  const handleSubmit = form.onSubmit((values) => {
    const finalData = {
      check_in_Date: values?.checkInDate,
      check_out_Date: values?.checkOutDate,
      roomId: roomId,
      phone: values.phone,
    };
    console.log("Booking Data:", finalData);
    // Add your API call here
    mutate(finalData, {
      onSuccess: () => {
        console.log("Booking created successfully!");
        form.reset();
        setShowBTN(true);
        navigate("/customer");
      },
      onError: (error) => {
        console.error("Booking failed:", error);
      },
    });
  });

  const { data: historyQuery } = useBookingHistory();

  console.log(historyQuery);

  const finalBookings = Array?.isArray(historyQuery) ? historyQuery : [];

  const Booking = finalBookings.find((e) => e.roomId === Number(roomId));
  console.log(Booking);

  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 7 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
          }}
        >
          <Card shadow="lg" padding="xl" radius="lg" withBorder>
            <Card.Section withBorder inheritPadding py="md">
              <Group justify="space-between" align="center">
                <Title order={2} size="h3">
                  Book This Room
                </Title>
                <ThemeIcon size="lg" variant="light" color="white" radius="xl">
                  <IconCreditCard size={20} />
                </ThemeIcon>
              </Group>
            </Card.Section>

            <Stack gap="lg" mt="xl">
              {/* Check-in Date */}
              <DateInput
                label={
                  <Group gap="xs" mb={4}>
                    <IconCalendar size={16} stroke={1.5} />
                    <Text fw={500} size="sm">
                      Check-in Date
                    </Text>
                    <Text c="red" size="sm">
                      *
                    </Text>
                  </Group>
                }
                placeholder="Select check-in date"
                {...form.getInputProps("checkInDate")}
                minDate={new Date()}
                valueFormat="YYYY-MM-DD"
                clearable={false}
                size="md"
                radius="md"
                styles={{
                  input: {
                    transition: "all 0.2s ease",
                    "&:focus": {
                      transform: "scale(1.02)",
                      borderColor: "#339af0",
                    },
                  },
                  day: {
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#e7f5ff",
                    },
                  },
                  selected: {
                    backgroundColor: "#1971c2 !important",
                  },
                }}
              />

              {/* Check-out Date */}
              <DateInput
                label={
                  <Group gap="xs" mb={4}>
                    <IconCalendar size={16} stroke={1.5} />
                    <Text fw={500} size="sm">
                      Check-out Date
                    </Text>
                    <Text c="red" size="sm">
                      *
                    </Text>
                  </Group>
                }
                placeholder="Select check-out date"
                {...form.getInputProps("checkOutDate")}
                minDate={form.values.checkInDate || new Date()}
                valueFormat="YYYY-MM-DD"
                clearable={false}
                size="md"
                radius="md"
                disabled={!form.values.checkInDate}
                styles={{
                  input: {
                    transition: "all 0.2s ease",
                    "&:focus": {
                      transform: "scale(1.02)",
                      borderColor: "#339af0",
                    },
                  },
                  day: {
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#e7f5ff",
                    },
                  },
                  selected: {
                    backgroundColor: "#1971c2 !important",
                  },
                }}
              />

              {/* Phone Number */}
              <TextInput
                label={
                  <Group gap="xs" mb={4}>
                    <IconPhone size={16} stroke={1.5} />
                    <Text fw={500} size="sm">
                      Phone Number
                    </Text>
                    <Text c="red" size="sm">
                      *
                    </Text>
                  </Group>
                }
                placeholder="010XXXXXXXX"
                {...form.getInputProps("phone")}
                description="Enter a valid Egyptian phone number (11 digits)"
                size="md"
                radius="md"
                styles={{
                  input: {
                    transition: "all 0.2s ease",
                    "&:focus": {
                      transform: "scale(1.02)",
                      borderColor: "#339af0",
                    },
                  },
                }}
              />

              {!showBTN && (
                <Button
                  fullWidth
                  size="lg"
                  type="submit"
                  mt="md"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 135 }}
                  radius="md"
                  leftSection={<IconCreditCard size={20} />}
                  loading={isLoading}
                  disabled={
                    Booking?.status == "ACCEPTED" ||
                    Booking?.status == "REJECTED"
                  }
                >
                  Confirm Booking
                </Button>
              )}

              {showBTN && <SendPaymentIntentBtn roomId={roomId} />}
            </Stack>
          </Card>
        </form>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 5 }}>
        <BookingSummaryCard data={data} totalPrice={totalPrice} />
      </Grid.Col>
    </Grid>
  );
};

export default BookForm;
